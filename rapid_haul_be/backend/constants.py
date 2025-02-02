from enum import Enum


class UserRole(str, Enum):
    DRIVER = "Driver"
    COMPANY = "Company"

    @classmethod
    def choices(cls):
        return [(role.value, role.value) for role in cls]


class DriverStatus(str, Enum):
    AVAILABLE = "Available"
    OCCUPIED = "Occupied"
    PENDING = "Pending"

    @classmethod
    def choices(cls):
        return [(status.value, status.value) for status in cls]


class CompanyStatus(str, Enum):
    AVAILABLE = "Available"
    OCCUPIED = "Occupied"
    PENDING = "Pending"

    @classmethod
    def choices(cls):
        return [(status.value, status.value) for status in cls]


class SelectionStatus(str, Enum):
    PENDING = "Pending"
    ACCEPTED = "Accepted"
    REJECTED = "Rejected"

    @classmethod
    def choices(cls):
        return [(status.value, status.value) for status in cls]
