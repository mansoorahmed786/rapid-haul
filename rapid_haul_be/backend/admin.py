from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

from backend.forms import UserChangeForm, UserCreationForm
from backend.models import AdminNotifications, CompanyProfile, DriverProfile

# Register your models here.

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    readonly_fields = ["date_joined"]
    list_display = [
        "email",
        "first_name",
        "last_name",
        "is_active",
        "is_staff",
        "is_superuser",
    ]
    search_fields = ["email", "first_name"]
    ordering = ("first_name", "last_name")
    fieldsets = [
        (None, {"fields": ["email", "password", "role"]}),
        ("Personal info", {"fields": ("first_name", "last_name")}),
        ("Permissions", {"fields": ["is_active", "is_staff", "is_superuser"]}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    ]
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )


@admin.register(DriverProfile)
class DriverProfileAdmin(admin.ModelAdmin):
    list_display = ["user", "status", "is_payment_enabled", "has_paid"]
    search_fields = ["user__email", "user__first_name", "user__last_name"]
    list_filter = ["status", "is_payment_enabled", "has_paid"]


@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    list_display = ["user", "is_payment_enabled", "has_paid"]
    search_fields = [
        "user__email",
        "user__first_name",
        "user__last_name",
    ]


@admin.register(AdminNotifications)
class AdminNotificationsAdmin(admin.ModelAdmin):
    list_display = ["message", "created_at"]
    search_fields = ["message"]
    list_filter = ["created_at"]
