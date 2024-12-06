import { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody } from '@/components/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IRolesData } from '@/store/slices/roles/rolesSlice';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateRole } from '@/store/slices/roles/actions';
import { useAppDispatch } from '@/store';
import { fetchRoles } from '@/store/slices/roles/actions';

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: IRolesData | null;
  onEdit: (updatedRole: IRolesData) => void;
}

const EditRoleModal = ({ isOpen, onClose, role, onEdit }: EditRoleModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (role) {
      setFormData({
        title: role.title,
        description: role.description || ''
      });
      setError(null); // پاک کردن خطای قبلی
    }
  }, [role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;

    if (!formData.title.trim()) {
      setError('عنوان نقش نمی‌تواند خالی باشد');
      return;
    }

    try {
      const updatedRole = {
        ...role,
        title: formData.title.trim(),
        description: formData.description.trim()
      };

      const resultAction = await dispatch(updateRole(updatedRole));
      
      if (updateRole.fulfilled.match(resultAction)) {
        await dispatch(fetchRoles());
        onClose();
        setError(null);
      } else if (updateRole.rejected.match(resultAction)) {
        setError(resultAction.payload as string);
      }
    } catch (error: any) {
      setError(error.message || 'خطا در بروزرسانی نقش');
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalContent className="w-[500px]">
        <ModalHeader className="p-6 border-b">
          <ModalTitle className="text-xl font-bold">ویرایش نقش</ModalTitle>
        </ModalHeader>
        <ModalBody className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">شناسه</label>
              <Input
                value={role?.id || ''}
                disabled
                className="bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                عنوان <span className="text-red-500">*</span>
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, title: e.target.value }));
                  setError(null); // پاک کردن خطا هنگام تایپ
                }}
                placeholder="عنوان نقش را وارد کنید"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">توضیحات</label>
              <Input
                name="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="توضیحات نقش را وارد کنید"
              />
            </div>
            <div className="flex justify-start gap-3">
              <Button type="submit" variant="default" size="sm">
                ذخیره
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  onClose();
                  setError(null);
                }}
              >
                انصراف
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { EditRoleModal }; 