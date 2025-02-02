from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)


class BestUserManager(BaseUserManager):
    def create_user(
        self, email, password=None, is_active=True, first_name=None, last_name=None
    ):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            is_active=is_active,
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            is_active=True,
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user
