import { MiscFaq, MiscHelp2 } from '@/partials/misc';
import { Users } from './blocks/users';

const UserListContent = () => {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <Users />
    </div>
  );
};

export { UserListContent };
