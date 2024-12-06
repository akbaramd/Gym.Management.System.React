import { IRolesData } from './rolesSlice';

export const RolesData: IRolesData[] = [
  {
    id: "admin",
    title: "مدیری سیستم",
    description: "نقش مدیر سیستم با دسترسی کامل"
  },
  {
    id: "user",
    title: "کاربر عادی",
    description: "نقش کاربر با دسترسی محدود"
  },
  {
    id: "moderator",
    title: "ناظر",
    description: "نقش ناظر با دسترسی متوسط"
  }
]; 