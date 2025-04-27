export const ROLES = {
  ADMIN: "admin",
  INSTRUCTOR: "instructor",
  STUDENT: "student",
};

export const PERMISSIONS = {
  [ROLES.ADMIN]: {
    canManageUsers: true,
    canManageClasses: true,
    canViewAllData: true,
    canEditAllData: true,
  },
  [ROLES.INSTRUCTOR]: {
    canManageUsers: false,
    canManageClasses: true,
    canViewAllData: true,
    canEditAllData: false,
  },
  [ROLES.STUDENT]: {
    canManageUsers: false,
    canManageClasses: false,
    canViewAllData: false,
    canEditAllData: false,
  },
};
