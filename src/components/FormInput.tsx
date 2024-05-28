import { ChangeEvent, useEffect, useState } from 'react';
import Receipt from '../models/Receipt';
import { INITIAL_RECEIPT, formatDate } from '../utils';
import { useReceipt } from '../context/ReceiptContext';
import generatePDF from '../plugins/PDFGenerator';
import { useTranslation } from 'react-i18next';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useConcepts } from '../composables/useConcepts';
import { useFormValidation } from '../composables/useFormValidation';

interface FormInputProps {
  initialReceipt?: Receipt;
  closeModal: () => void;
}

const FormInput: React.FC<FormInputProps> = ({ initialReceipt, closeModal }) => {
  const { t } = useTranslation();
  const { addReceipt, updateReceipt } = useReceipt();
  const [receipt, setReceipt] = useState<Receipt>(initialReceipt || INITIAL_RECEIPT);
  const [isDueAtSight, setIsDueAtSight] = useState<boolean>(false);
  const { concepts, handleConceptChange, addConcept, deleteConcept } = useConcepts(receipt.concepts);
  const { errors, validate } = useFormValidation();

  useEffect(() => {
    setReceipt((prevReceipt) => ({ ...prevReceipt, concepts }));
  }, [concepts]);

  useEffect(() => {
    if (initialReceipt) {
      setReceipt(initialReceipt);
      setIsDueAtSight(typeof initialReceipt.expiration === 'string' && initialReceipt.expiration === t('atSight'));
    }
  }, [initialReceipt, t]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReceipt({ ...receipt, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate(receipt)) {
      if (initialReceipt) {
        updateReceipt(receipt.id, receipt);
      } else {
        addReceipt(receipt);
      }
      generatePDF(receipt, receipt.num);
      resetForm();
      closeModal();
    }
  };

  const resetForm = () => {
    setReceipt(INITIAL_RECEIPT);
  };

  const handleDueAtSighChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDueAtSight(e.target.checked);
    if (e.target.checked) {
      setReceipt({ ...receipt, expiration: t('dueAtSight') });
    } else {
      setReceipt({ ...receipt, expiration: formatDate(new Date()) });
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-bold">{t('total')}</label>
          <input
            className="input input-bordered font-semibold"
            type="text"
            id="amount"
            value={`${concepts.reduce((total, item) => total + Number(item.amount), 0)} €`}
            disabled
          />
        </div>
        <div className="mb-4 w-full md:grid md:grid-cols-2 md:gap-2">
          <div>
            <label className="block mb-2 mt-2 md:mt-0">{t('numberOfReceipt')}</label>
            <input
              className="input input-bordered w-full"
              type="text"
              id="num"
              name="num"
              value={receipt.num}
              onChange={handleChange}
            />
            {errors.num && <span className="text-red-500 text-sm">{errors.num}</span>}
          </div>
          <div>
            <label className="block mb-2 mt-2 md:mt-0">{t('location')}</label>
            <input
              className="input input-bordered w-full"
              type="text"
              id="location"
              name="loc"
              value={receipt.loc}
              onChange={handleChange}
            />
            {errors.loc && <span className="text-red-500 text-sm">{errors.loc}</span>}
          </div>
        </div>
        <div className="w-full md:grid md:grid-cols-2 md:gap-2">
          <div className="mb-4">
            <label className="block mb-2">{t('emissionDate')}</label>
            <input
              className="input input-bordered w-full"
              type="date"
              id="date"
              name="date"
              value={formatDate(receipt.date)}
              onChange={handleChange}
            />
            {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">{t('expirationDate')}</label>
            <input
              className="input input-bordered w-full"
              type="date"
              id="exp"
              name="expiration"
              value={typeof receipt.expiration === 'string' ? '' : receipt.expiration.toISOString().split('T')[0]}
              onChange={handleChange}
              disabled={isDueAtSight}
            />
            <label className="ml-2 flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isDueAtSight}
                onChange={handleDueAtSighChange}
              />
              <span className="ml-2 italic">{t('atSight')}</span>
            </label>
            {errors.expiration && <span className="text-red-500 text-sm">{errors.expiration}</span>}
          </div>
        </div>
        <div>
          <label className="block mb-2">{t('concepts')}</label>
          <ul className="list-disc">
            {receipt.concepts.map((concept, index) => (
              <li key={index} className="mb-2 flex flex-col md:flex-row md:items-center md:gap-2">
                <input
                  className="input input-bordered w-full md:w-auto flex-grow"
                  type="text"
                  name="name"
                  placeholder={t('concept')}
                  value={concept.name}
                  onChange={(e) => handleConceptChange(index, e)}
                />
                <input
                  className="input input-bordered w-full md:w-auto flex-grow"
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  value={concept.amount}
                  onChange={(e) => handleConceptChange(index, e)}
                />
                €
                <button className="btn btn-error btn-xs" onClick={() => deleteConcept(index)}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          {errors.concepts && <span className="text-red-500 text-sm block">{errors.concepts}</span>}
          <button className="btn btn-primary my-2 flex items-center" onClick={addConcept}>
            <FaPlus className="mr-2" /> {t('addConcept')}
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-2">{t('homeAddress')}</label>
          <input
            className="input input-bordered w-full"
            type="text"
            id="home"
            name="home"
            placeholder={t('writeHere')}
            value={receipt.home}
            onChange={handleChange}
          />
          {errors.home && <span className="text-red-500 text-sm">{errors.home}</span>}
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-2">
          <div className="mb-4">
            <label className="block mb-2">{t('payerName')}</label>
            <input
              className="input input-bordered w-full"
              type="text"
              id="payerName"
              name="payer.name"
              placeholder={t('payerName')}
              value={receipt.payer.name}
              onChange={(e) => setReceipt({ ...receipt, payer: { ...receipt.payer, name: e.target.value } })}
            />
            {errors.payerName && <span className="text-red-500 text-sm">{errors.payerName}</span>}
            <label className="block my-2">{t('payerAddress')}</label>
            <input
              className="input input-bordered w-full"
              type="text"
              id="payerAddress"
              name="payer.address"
              placeholder={t('payerAddress')}
              value={receipt.payer.address}
              onChange={(e) => setReceipt({ ...receipt, payer: { ...receipt.payer, address: e.target.value } })}
            />
            {errors.payerAddress && <span className="text-red-500 text-sm">{errors.payerAddress}</span>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Collector Name</label>
            <input
              className="input input-bordered w-full"
              type="text"
              id="collectorName"
              name="collector.name"
              placeholder={t('collectorName')}
              value={receipt.collector.name}
              onChange={(e) => setReceipt({ ...receipt, collector: { ...receipt.collector, name: e.target.value } })}
            />
            {errors.collectorName && <span className="text-red-500 text-sm">{errors.collectorName}</span>}
            <label className="block my-2">{t('collectorAddress')}</label>
            <input
              className="input input-bordered w-full"
              type="text"
              id="collectorAddress"
              name="collector.address"
              placeholder={t('collectorAddress')}
              value={receipt.collector.address}
              onChange={(e) => setReceipt({ ...receipt, collector: { ...receipt.collector, address: e.target.value } })}
            />
            {errors.collectorAddress && <span className="text-red-500 text-sm">{errors.collectorAddress}</span>}
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button className="btn btn-error" onClick={resetForm} type="button">
            {t('reset')}
          </button>
          <button className="btn btn-primary" type="submit">
            {t('submit')}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormInput;
