import { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody } from '@/components/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useAppDispatch } from '@/store';
import { createRole } from '@/store/slices/roles/actions';
import { fetchRoles } from '@/store/slices/roles/actions';

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddRoleModal = ({ isOpen, onClose }: AddRoleModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createRole(formData)).unwrap();
      dispatch(fetchRoles()); // بروزرسانی لیست پس از ایجاد
      setFormData({ title: '', description: '' }); // پاک کردن فرم
      onClose();
    } catch (error) {
      console.error('خطا در ایجاد نقش:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalContent className="w-[500px]">
        <ModalHeader className="p-6 border-b">
          <ModalTitle className="text-xl font-bold">افزودن نقش جدید</ModalTitle>
        </ModalHeader>
        <ModalBody className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">عنوان</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="عنوان نقش را وارد کنید"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">توضیحات</label>
              <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="توضیحات نقش را وارد کنید"
              />
            </div>
            <div className="flex justify-start gap-3">
              <Button type="submit" variant="default" size="sm">
                ذخیره
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                انصراف
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { AddRoleModal }; 