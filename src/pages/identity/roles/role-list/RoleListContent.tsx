import { MiscFaq, MiscHelp2 } from '@/partials/misc';
import { Roles } from '../blocks/roles/Roles';

interface RoleListContentProps {
  onSelectionChange: (selectedIds: string[]) => void;
}

const RoleListContent = ({ onSelectionChange }: RoleListContentProps) => {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <Roles onSelectionChange={onSelectionChange} />
    </div>
  );
};

export { RoleListContent };
