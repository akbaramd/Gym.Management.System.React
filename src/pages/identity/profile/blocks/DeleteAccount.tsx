import React, { useState } from 'react';
import { useAuthContext } from '@/auth';
import { toast } from 'sonner';

const LogoutForm = () => {
  const { logout } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      // Perform logout
      await logout();

      // Show success toast
      toast('شما با موفقیت از حساب کاربری خارج شدید.', {
        description: 'امیدواریم دوباره شما را ببینیم!',
      });
    } catch (error) {
      // Show error toast
      toast('خطا در خروج از حساب کاربری.', {
        description: 'لطفاً دوباره تلاش کنید.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header text-center">
        <h3 className="card-title text-lg font-bold text-gray-800">خروج از حساب کاربری</h3>
      </div>
      <div className="card-body text-center py-5">
        <p className="text-gray-600 text-sm">
          آیا می‌خواهید از حساب کاربری خود خارج شوید؟
        </p>
        <div className="mt-5">
          <button
            className={`btn btn-danger px-4 py-2 rounded-md text-white ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
            }`}
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? 'در حال خروج...' : 'خروج از حساب کاربری'}
          </button>
        </div>
      </div>
    </div>
  );
};

export { LogoutForm };
