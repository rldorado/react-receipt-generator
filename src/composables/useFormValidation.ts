import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Receipt from '../models/Receipt';

export const useFormValidation = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (receipt: Receipt) => {
    const tempErrors: { [key: string]: string } = {};

    if (!receipt.num) tempErrors.num = t('required');
    if (!receipt.loc) tempErrors.loc = t('required');
    if (!receipt.date) tempErrors.date = t('required');
    if (!receipt.expiration) tempErrors.expiration = t('required');
    if (!receipt.home) tempErrors.home = t('required');
    if (receipt.concepts.some((concept) => !concept.name || !concept.amount)) {
      tempErrors.concepts = t('conceptsRequired');
    }
    if (!receipt.payer.name) tempErrors.payerName = t('required');
    if (!receipt.payer.address) tempErrors.payerAddress = t('required');
    if (!receipt.collector.name) tempErrors.collectorName = t('required');
    if (!receipt.collector.address) tempErrors.collectorAddress = t('required');

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return {
    errors,
    validate,
  };
};
