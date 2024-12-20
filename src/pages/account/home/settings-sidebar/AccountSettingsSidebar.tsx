import { IScrollspyMenuItems, ScrollspyMenu } from '@/partials/menu';

const AccountSettingsSidebar = () => {
  const items: IScrollspyMenuItems = [
    {
      title: 'حساب کاربری',
      target: 'basic_settings',
      active: true
    },
    {
      title: 'خروج از حساب کاربری',
      target: 'delete_account'
    }
  ];

  return <ScrollspyMenu items={items} />;
};

export { AccountSettingsSidebar };
