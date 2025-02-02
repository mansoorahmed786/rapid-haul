from datetime import timedelta

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _

from backend.constants import (CompanyStatus, DriverStatus, SelectionStatus,
                               UserRole)
from backend.managers import BestUserManager


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model.
    """

    date_joined = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(
        verbose_name="email address",
        unique=True,
    )
    first_name = models.CharField(max_length=255, blank=False, null=False)
    last_name = models.CharField(max_length=255, blank=False, null=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(
        max_length=20, choices=UserRole.choices(), null=True, blank=True
    )

    objects = BestUserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"


class DriverProfile(models.Model):
    """
    Stores additional information for users with the Driver role.
    """

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="driver_profile"
    )

    profile_picture = models.ImageField(
        upload_to="profile_pictures/", null=True, blank=True
    )
    is_payment_enabled = models.BooleanField(default=False)
    has_paid = models.BooleanField(default=False)

    one_time_code = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(
        max_length=20, choices=DriverStatus.choices(), default="Pending"
    )
    expiry_time = models.IntegerField(default=72)
    availability_expires_at = models.DateTimeField(null=True, blank=True)

    rating = models.FloatField(default=0.0)
    selected_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="selected_drivers",
        null=True,
        blank=True,
    )

    # Description
    phone_number = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    about = models.TextField(blank=True, null=True)

    # Driver License Information
    license_type = models.CharField(max_length=100, blank=True, null=True)
    endorsement = models.CharField(max_length=100, blank=True, null=True)
    license_number = models.CharField(max_length=100, blank=True, null=True)
    # Experience
    language = models.CharField(max_length=100, blank=True, null=True)
    vehicle_name = models.CharField(max_length=100, blank=True, null=True)
    experience = models.CharField(max_length=100, blank=True, null=True)
    trailer_type = models.CharField(max_length=100, blank=True, null=True)
    experience_otr = models.CharField(max_length=100, blank=True, null=True)
    # Proficient in working with log books
    logbook_type = models.CharField(max_length=100, blank=True, null=True)
    dot_medical_card = models.CharField(max_length=100, blank=True, null=True)
    # Additional Skills
    special_skills = models.CharField(max_length=100, blank=True, null=True)
    skills = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.user.email

    def set_available(self):
        self.status = "Available"
        self.availability_expires_at = now() + timedelta(hours=self.expiry_time)
        self.save()


class CompanyProfile(models.Model):
    """
    Stores additional information for users with the Company role.
    """

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="company_profile"
    )
    profile_picture = models.ImageField(
        upload_to="profile_pictures/", null=True, blank=True
    )
    is_payment_enabled = models.BooleanField(default=False)
    has_paid = models.BooleanField(default=False)
    status = models.CharField(
        max_length=20, choices=CompanyStatus.choices(), default="Pending"
    )
    expiry_time = models.IntegerField(default=72)
    availability_expires_at = models.DateTimeField(null=True, blank=True)

    phone_number = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    contact = models.CharField(max_length=100, null=True, blank=True)
    company_name = models.CharField(max_length=100, null=True, blank=True)

    # Information
    insurance_provider = models.CharField(max_length=100, blank=True, null=True)
    policy_number = models.CharField(max_length=100, blank=True, null=True)
    dot_number = models.CharField(max_length=100, blank=True, null=True)
    tax_id_number = models.CharField(max_length=100, blank=True, null=True)
    load_type = models.CharField(max_length=100, blank=True, null=True)
    payment_type = models.CharField(max_length=100, blank=True, null=True)
    special_notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.email

    def set_available(self):
        self.status = "Available"
        self.availability_expires_at = now() + timedelta(hours=self.expiry_time)
        self.save()


class AdminNotifications(models.Model):
    """
    Stores notifications sent to the admin.
    """

    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message


class DriverSelection(models.Model):
    """
    Tracks when a company selects a driver.
    """

    company = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE)
    driver = models.ForeignKey(DriverProfile, on_delete=models.CASCADE)
    offer_details = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=SelectionStatus.choices(),
        default=SelectionStatus.PENDING,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company.user.email} selected {self.driver.user.email}"


class Rating(models.Model):
    """
    Stores ratings given by companies and drivers to each other.
    """

    rater = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="given_ratings"
    )
    recipient = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="received_ratings"
    )
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Subscription(models.Model):
    """
    Manages subscription periods and extensions.
    """

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="subscription"
    )
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    extended = models.BooleanField(default=False)

    def extend_subscription(self, additional_hours):
        """
        Extends the subscription period.
        """
        self.end_date += timedelta(hours=additional_hours)
        self.extended = True
        self.save()
