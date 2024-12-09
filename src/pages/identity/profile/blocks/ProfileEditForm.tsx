import { useAuthContext } from '@/auth';
import React, { useState } from 'react';
import { toast } from 'sonner';

const ProfileEditForm = () => {
  const { currentUser, updateProfile, verify } = useAuthContext();
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);

      // Update profile information
      await updateProfile(firstName, lastName);

      // Refresh current user profile
      await verify();

      // Show success toast
      toast('پروفایل با موفقیت به‌روزرسانی شد!', {
        description: 'تغییرات شما ذخیره شدند.',
        position: 'bottom-left',
      });
    } catch (error) {
      // Show error toast
      toast('خطا در به‌روزرسانی پروفایل', {
        description: 'لطفاً دوباره تلاش کنید.',
        position: 'bottom-left',
        action: {
          label: 'تلاش مجدد',
          onClick: handleProfileUpdate,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card pb-2.5 bg-white " id="profile-edit-form">
      <div className="card-header border-b pb-2">
        <h3 className="card-title text-lg font-bold text-gray-800">ویرایش پروفایل</h3>
        <p className="text-sm text-gray-500">اطلاعات خود را به‌روزرسانی کنید</p>
      </div>
      <div className="card-body grid gap-5 p-4">
        {/* First Name */}
        <div className="w-full">
          <label className="form-label text-sm font-medium text-gray-700">نام</label>
          <input
            type="text"
            className="input w-full border rounded-md px-3 py-2 mt-1 text-gray-800"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="نام خود را وارد کنید"
          />
        </div>

        {/* Last Name */}
        <div className="w-full">
          <label className="form-label text-sm font-medium text-gray-700">نام خانوادگی</label>
          <input
            type="text"
            className="input w-full border rounded-md px-3 py-2 mt-1 text-gray-800"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="نام خانوادگی خود را وارد کنید"
          />
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <button
            className={`btn btn-primary px-4 py-2 rounded-md text-white ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleProfileUpdate}
            disabled={loading}
          >
            {loading ? 'در حال ذخیره‌سازی...' : 'ذخیره تغییرات'}
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProfileEditForm };
