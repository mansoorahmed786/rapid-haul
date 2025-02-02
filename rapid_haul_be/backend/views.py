from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from backend.constants import DriverStatus, UserRole
from backend.models import (AdminNotifications, CompanyProfile, DriverProfile,
                            DriverSelection)
from backend.permissions import IsCompanyUser, IsDriverUser
from backend.serializers import (CompanyProfileSerializer, CompanySerializer,
                                 DriverProfileSerializer, DriverSerializer,
                                 NotificationSerializer, UserRoleSerializer,
                                 UserSignupSerializer)

# Create your views here.

User = get_user_model()


class UserSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"message": "User created successfully", "user_id": user.id},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserRoleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserRoleSerializer(
            data=request.data, context={"user": request.user}
        )
        if serializer.is_valid():
            serializer.save()
            AdminNotifications.objects.create(
                message=f"User {request.user.email} registered for the role {serializer.validated_data['role']}"
            )
            return Response(
                {"message": f"Role updated to {serializer.validated_data['role']}"},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get_profile_completion_status(self, user):
        """
        Returns the profile completion status of the user.
        """
        if user.role == UserRole.DRIVER.value:
            driver_profile = user.driver_profile
            return all(
                [
                    driver_profile.phone_number,
                    driver_profile.profile_picture,
                    driver_profile.address,
                    driver_profile.license_type,
                    driver_profile.endorsement,
                    driver_profile.license_number,
                    driver_profile.language,
                    driver_profile.vehicle_name,
                    driver_profile.experience,
                    driver_profile.trailer_type,
                    driver_profile.experience_otr,
                    driver_profile.logbook_type,
                    driver_profile.dot_medical_card,
                ]
            )
        if user.role == UserRole.COMPANY.value:
            company_profile = user.company_profile
            return all(
                [
                    company_profile.phone_number,
                    company_profile.address,
                    company_profile.profile_picture,
                    company_profile.insurance_provider,
                    company_profile.dot_number,
                    company_profile.tax_id_number,
                    company_profile.policy_number,
                ]
            )
        return False

    def get_user_type_and_profile_status(self, user):
        """
        Returns the user type, profile completion status, payment enabled, and paid status.
        """
        if user.is_staff or user.is_superuser:
            return "admin", True, True, True

        if user.role not in [UserRole.DRIVER.value, UserRole.COMPANY.value]:
            return None, False, False, False

        if user.role in [UserRole.DRIVER.value, UserRole.COMPANY.value]:
            profile = (
                user.driver_profile
                if user.role == UserRole.DRIVER.value
                else user.company_profile
            )
            is_payment_enabled = getattr(profile, "is_payment_enabled", False)
            is_paid = getattr(profile, "has_paid", False)
            is_profile_complete = self.get_profile_completion_status(user)
            return user.role, is_profile_complete, is_payment_enabled, is_paid

        return None, False, False, False

    def get(self, request):
        user = request.user

        # Get user type and profile details
        (
            user_type,
            is_profile_complete,
            is_payment_enabled,
            is_paid,
        ) = self.get_user_type_and_profile_status(user)

        # Prepare response data
        data = {
            "name": f"{user.first_name} {user.last_name}",
            "email": user.email,
            "user_type": user_type,
            "is_profile_complete": is_profile_complete,
            "is_payment_enabled": is_payment_enabled,
            "is_paid": is_paid,
        }

        return Response(data, status=status.HTTP_200_OK)


class AdminUserViewSet(ModelViewSet):
    queryset = DriverProfile.objects.all()
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "patch"]

    @action(detail=False, methods=["get"], permission_classes=[AllowAny])
    def list_drivers(self, request):
        queryset = self.get_queryset().filter(user__role=UserRole.DRIVER.value)
        serializer = DriverSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], permission_classes=[AllowAny])
    def list_companies(self, request):
        queryset = CompanyProfile.objects.filter(user__role=UserRole.COMPANY.value)
        serializer = CompanySerializer(
            queryset, many=True, context={"request": request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["patch"], url_path="update-driver")
    def update_driver(self, request, pk=None):
        driver = get_object_or_404(DriverProfile, id=pk)
        data = request.data
        driver.is_payment_enabled = data["is_payment_enabled"]
        driver.expiry_time = data["expiry_time"]
        driver.save()

        return Response(
            {"message": f"Driver {driver.user.email} updated successfully"},
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["get"], url_path="list-notifications")
    def list_notifications(self, request, pk=None):
        notifications = AdminNotifications.objects.all()
        return Response(
            NotificationSerializer(notifications, many=True).data,
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["patch"], url_path="mark-read")
    def mark_read(self, request, pk=None):
        AdminNotifications.objects.filter(id=pk).update(is_read=True)
        return Response(
            {"message": "Notification marked as read", "id": pk},
            status=status.HTTP_200_OK,
        )


class DriverProfileViewSet(ModelViewSet):
    queryset = DriverProfile.objects.all()
    serializer_class = DriverSerializer
    permission_classes = [IsDriverUser]
    http_method_names = ["get", "patch"]

    @action(detail=False, methods=["get"], url_path="my-profile")
    def get_my_profile(self, request):
        try:
            driver = get_object_or_404(DriverProfile, user=request.user)

            if driver.user.role != UserRole.DRIVER.value:
                return Response(
                    {"error": "User is not a driver"}, status=status.HTTP_403_FORBIDDEN
                )

            serializer = DriverProfileSerializer(driver, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)

        except DriverProfile.DoesNotExist:
            return Response(
                {"error": "Driver profile not found"}, status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=["patch"], url_path="update-profile")
    def update_profile(self, request):
        user = request.user
        driver = user.driver_profile
        data = request.data
        serializer = DriverProfileSerializer(data=data, instance=driver, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Driver profile updated successfully"},
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["patch"], url_path="update-profile-picture")
    def update_profile_picture(self, request, pk=None):
        try:
            file = request.FILES["file"]
            user = request.user
            driver = user.driver_profile
            driver.profile_picture = file
            driver.save()
            return Response(
                {"message": "Profile picture updated successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["patch"], url_path="update-payment")
    def update_payment_status(self, request, pk=None):
        try:
            user = request.user
            driver = user.driver_profile

            # Validate user is a driver
            if driver.user.role != UserRole.DRIVER.value:
                return Response(
                    {"error": "User is not a driver"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Check if payment is enabled
            if not driver.is_payment_enabled:
                return Response(
                    {"error": "Payment not enabled for the driver"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            driver.has_paid = True
            driver.set_available()
            AdminNotifications.objects.create(
                message=f"Driver {driver.user.email} has paid and is now available for 72 hours"
            )

            return Response(
                {"message": "Payment status updated successfully"},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CompanyProfileViewSet(ModelViewSet):
    queryset = CompanyProfile.objects.filter(user__role=UserRole.COMPANY.value)
    serializer_class = CompanySerializer
    permission_classes = [IsCompanyUser]
    http_method_names = ["get", "patch"]

    @action(detail=False, methods=["get"], url_path="my-profile")
    def get_my_profile(self, request):
        try:
            company = get_object_or_404(CompanyProfile, user=request.user)

            if company.user.role != UserRole.COMPANY.value:
                return Response(
                    {"error": "User is not a company"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            serializer = CompanyProfileSerializer(company, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)

        except CompanyProfile.DoesNotExist:
            return Response(
                {"error": "Company profile not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(detail=False, methods=["patch"], url_path="update-profile")
    def update_profile(self, request):
        user = request.user
        company = user.company_profile
        data = request.data
        serializer = CompanyProfileSerializer(data=data, instance=company, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Company profile updated successfully"},
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["patch"], url_path="update-profile-picture")
    def update_profile_picture(self, request, pk=None):
        try:
            file = request.FILES["file"]
            user = request.user
            company = user.company_profile
            company.profile_picture = file
            company.save()
            return Response(
                {"message": "Profile picture updated successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["patch"], url_path="update-payment")
    def update_payment_status(self, request, pk=None):
        try:
            user = request.user
            company = user.company_profile

            # Validate user is a company
            if company.user.role != UserRole.COMPANY.value:
                return Response(
                    {"error": "User is not a company"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Check if payment is enabled
            if not company.is_payment_enabled:
                return Response(
                    {"error": "Payment not enabled for the company"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            company.has_paid = True
            company.set_available()
            AdminNotifications.objects.create(
                message=f"Company {company.user.email} has paid"
            )

            return Response(
                {"message": "Payment status updated successfully"},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["get"], url_path="search-driver")
    def search_driver(self, request):
        drivers = DriverProfile.objects.filter(
            user__role=UserRole.DRIVER.value, status=DriverStatus.AVAILABLE.value
        )
        serializer = DriverSerializer(drivers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["patch"], url_path="select-driver")
    def select_driver(self, request, pk=None):
        driver = get_object_or_404(DriverProfile, pk=pk)
        driver.status = DriverStatus.OCCUPIED.value
        driver.selected_by = request.user
        driver.save()
        DriverSelection.objects.create(
            company=request.user.company_profile, driver=driver
        )
        AdminNotifications.objects.create(
            message=f"Driver {driver.user.email} has been selected by {request.user.email}"
        )
        return Response(
            {"message": f"Driver {driver.user.email} selected"},
            status=status.HTTP_200_OK,
        )
