import { IRolesData } from '@/store/slices/roles/rolesSlice';

// دیتای اولیه
let rolesData: IRolesData[] = [
  {
    id: "admin",
    title: "مدیر سیستم",
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

// تاخیر مصنوعی برای شبیه‌سازی API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// سرویس‌های مجازی
export const RolesAPI = {
  // دریافت لیست نقش‌ها
  fetchRoles: async (): Promise<IRolesData[]> => {
    await delay(500); // تاخیر 500ms
    return [...rolesData];
  },

  // ایجاد نقش جدید
  createRole: async (role: Omit<IRolesData, 'id'>): Promise<IRolesData> => {
    await delay(500);
    const newRole: IRolesData = {
      ...role,
      id: Date.now().toString()
    };
    rolesData = [...rolesData, newRole];
    return newRole;
  },

  // بروزرسانی نقش
  updateRole: async (role: IRolesData): Promise<IRolesData> => {
    await delay(500);
    const index = rolesData.findIndex(r => r.id === role.id);
    if (index === -1) {
      throw new Error('نقش مورد نظر یافت نشد');
    }
    rolesData = rolesData.map(r => r.id === role.id ? role : r);
    return role;
  },

  // حذف نقش
  deleteRole: async (id: string): Promise<void> => {

    console.log(id);
    console.log(rolesData);

    await delay(500);
    
    const index = rolesData.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('نقش مورد نظر یافت نشد');
    }
    rolesData = rolesData.filter(r => r.id !== id);


  }
}; 