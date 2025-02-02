from django.urls import include, path
from rest_framework.routers import DefaultRouter

from backend.views import (AdminUserViewSet, CompanyProfileViewSet,
                           DriverProfileViewSet, UpdateUserRoleView,
                           UserInfoView)

router = DefaultRouter()
router.register(r"admin-users", AdminUserViewSet, basename="admin-user")
router.register(r"drivers", DriverProfileViewSet, basename="driver-profile")
router.register(r"companies", CompanyProfileViewSet, basename="company-profile")

urlpatterns = [
    path("update-role/", UpdateUserRoleView.as_view(), name="update-role"),
    path("me/", UserInfoView.as_view(), name="user-info"),
    path("", include(router.urls)),
]
