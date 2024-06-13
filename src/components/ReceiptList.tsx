import FormModal from './FormModal';
import FormInput from './FormInput';
import { useReceipt } from '../context/ReceiptContext';
import Receipt from '../models/Receipt';
import { useState } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { formatDate } from '../utils';

const ReceiptList: React.FC = () => {
  const { t } = useTranslation();
  const { receipts, deleteReceipt } = useReceipt();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentReceipt, setCurrentReceipt] = useState<Receipt | null>(null);

  const openModal = (receipt?: Receipt) => {
    setCurrentReceipt(receipt || null);
    setIsModalOpen(true);
    (document.getElementById('form_modal') as HTMLDialogElement)?.showModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    (document.getElementById('form_modal') as HTMLDialogElement)?.close();
  };

  const handleDelete = (id: number) => {
    deleteReceipt(id);
  };

  return (
    <React.Fragment>
      <h2 className="text-xl font-semibold mb-2">{t('savedReceipts')}</h2>
      <ul className="list-disc pl-5">
        {receipts.map((receipt) => (
          <li
            key={receipt.id}
            className="mb-4 p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex-grow">
              <p className="font-semibold">
                {t('numberOfReceipt')}: {receipt.num}
              </p>
              <p>
                {t('location')}: {receipt.loc}
              </p>
              <p>
                {t('emissionDate')}: {formatDate(receipt.date)}
              </p>
              <p>
                {t('expirationDate')}:{' '}
                {typeof receipt.expiration === 'string' ? t('atSight') : formatDate(receipt.expiration)}
              </p>
            </div>
            <div className="flex space-x-2 mt-2 md:mt-0">
              <button className="btn btn-accent btn-xs" onClick={() => openModal(receipt)}>
                <FaEdit />
              </button>
              <button className="btn btn-error btn-xs" onClick={() => handleDelete(receipt.id)}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="btn btn-secondary mt-4" onClick={() => openModal()}>
        {t('newReceipt')}
      </button>
      <FormModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        title={currentReceipt ? t('editReceipt') : t('newReceipt')}
      >
        <FormInput initialReceipt={currentReceipt || undefined} closeModal={closeModal} />
      </FormModal>
    </React.Fragment>
  );
};

export default ReceiptList;
