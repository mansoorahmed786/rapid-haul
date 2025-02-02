from rest_framework.permissions import BasePermission

from backend.constants import UserRole


class IsDriverUser(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.role == UserRole.DRIVER.value

    def has_object_permission(self, request, view, obj):
        user = request.user
        return user.is_authenticated and user.role == UserRole.DRIVER.value


class IsCompanyUser(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.role == UserRole.COMPANY.value

    def has_object_permission(self, request, view, obj):
        user = request.user
        return user.is_authenticated and user.role == UserRole.COMPANY.value
