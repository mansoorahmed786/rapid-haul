from rest_framework import serializers

from backend.constants import UserRole
from backend.models import (AdminNotifications, CompanyProfile, DriverProfile,
                            User)


class UserSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ["email", "password", "password2", "first_name", "last_name"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        if User.objects.filter(email=data["email"]).exists():
            raise serializers.ValidationError("User with this email already exists")

        if data["password"] != data["password2"]:
            raise serializers.ValidationError("Passwords must match")

        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            password=validated_data["password"],
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        return user


class UserRoleSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=UserRole.choices())

    class Meta:
        model = User
        fields = ["role"]

    def validate_role(self, value):
        user = self.context.get("user")
        if user.role:
            raise serializers.ValidationError("User role already set")
        if not value:
            raise serializers.ValidationError("Role is required")
        if value not in [role[0] for role in UserRole.choices()]:
            raise serializers.ValidationError("Invalid role")

        return value

    def create(self, validated_data):
        user = self.context.get("user")
        role = validated_data.get("role")

        if role == UserRole.DRIVER.value:
            user.role = validated_data.get("role")
            user.save()
            DriverProfile.objects.create(user=user)

        if role == UserRole.COMPANY.value:
            user.role = validated_data.get("role")
            user.save()
            CompanyProfile.objects.create(user=user)
        return user


class DriverSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    role = serializers.BooleanField(source="user.role")
    profile_picture = serializers.SerializerMethodField()

    def get_profile_picture(self, obj):
        request = self.context.get("request")
        if obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url)
        return None

    class Meta:
        model = DriverProfile
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "profile_picture",
            "address",
            "role",
            "rating",
            "is_payment_enabled",
            "has_paid",
            "status",
            "expiry_time",
            "availability_expires_at",
        ]


class DriverProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    name = serializers.CharField(source="user.name", read_only=True)
    role = serializers.BooleanField(source="user.role", read_only=True)
    profile_picture = serializers.SerializerMethodField()

    def get_profile_picture(self, obj):
        request = self.context.get("request")  # Access the request object
        if obj.profile_picture:
            return request.build_absolute_uri(
                obj.profile_picture.url
            )  # Generate full URL
        return None

    class Meta:
        model = DriverProfile
        fields = "__all__"


class CompanySerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    name = serializers.CharField(source="user.name")
    role = serializers.BooleanField(source="user.role")
    profile_picture = serializers.SerializerMethodField()

    def get_profile_picture(self, obj):
        request = self.context.get("request")
        if obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url)
        return None

    class Meta:
        model = CompanyProfile
        fields = [
            "id",
            "email",
            "name",
            "first_name",
            "last_name",
            "address",
            "phone_number",
            "profile_picture",
            "role",
            "is_payment_enabled",
            "has_paid",
            "status",
        ]


class CompanyProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    name = serializers.CharField(source="user.name", read_only=True)
    role = serializers.BooleanField(source="user.role", read_only=True)
    profile_picture = serializers.SerializerMethodField()

    def get_profile_picture(self, obj):
        request = self.context.get("request")
        if obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url)
        return None

    class Meta:
        model = CompanyProfile
        fields = "__all__"


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminNotifications
        fields = "__all__"
