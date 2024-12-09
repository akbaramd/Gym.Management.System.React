import { IScrollspyMenuItems, ScrollspyMenu } from '@/partials/menu';

const AccountSettingsSidebar = () => {
  const items: IScrollspyMenuItems = [
    {
      title: 'ویرایش پروفایل',
      target: 'profile-edit-form',
      active: true
    },
    {
      title: 'خروج حساب کاربری',
      target: 'delete_account'
    }
  ];

  return <ScrollspyMenu items={items} />;
};

export { AccountSettingsSidebar };
