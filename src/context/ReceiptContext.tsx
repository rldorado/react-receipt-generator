import { createContext, useContext, useState } from 'react';
import Receipt from '../models/Receipt';

interface ReceiptContextType {
  receipts: Receipt[];
  addReceipt: (receipt: Receipt) => void;
  updateReceipt: (id: number, updatedReceipt: Receipt) => void;
  deleteReceipt: (id: number) => void;
}

const ReceiptContext = createContext<ReceiptContextType | undefined>(undefined);

export const useReceipt = (): ReceiptContextType => {
  const context = useContext(ReceiptContext);
  if (!context) {
    throw new Error('useReceipt must be used within a ReceiptProvider');
  }
  return context;
};

interface ReceiptProviderProps {
  children: React.ReactNode;
}

export const ReceiptProvider: React.FC<ReceiptProviderProps> = ({ children }) => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  const addReceipt = (receipt: Receipt) => {
    setReceipts((prevReceipts) => [...prevReceipts, receipt]);
  };

  const updateReceipt = (id: number, updatedReceipt: Receipt) => {
    setReceipts((prevReceipts: Receipt[]) =>
      prevReceipts.map((receipt) => (receipt.id === id ? updatedReceipt : receipt))
    );
  };

  const deleteReceipt = (id: number) => {
    setReceipts((prevReceipts) => prevReceipts.filter((receipt) => receipt.id !== id));
  };

  return (
    <ReceiptContext.Provider value={{ receipts, addReceipt, updateReceipt, deleteReceipt }}>
      {children}
    </ReceiptContext.Provider>
  );
};
