import { useEffect, useState } from 'react';
import Footer from './components/Footer'
import Header from './components/Header'
import PDFGenerator from './components/PDFGenerator'
import Receipt from './models/Receipt';
import FormInput from './components/FormInput';

const App = () => {
  const [filename, setFilename] = useState<string>('');
  const [receipt, setReceipt] = useState<Receipt>({
    id: 0,
    num: '',
    loc: '',
    amount: 0,
    date: new Date(),
    expiration: new Date(),
    home: '',
    concepts: [
        {
            name: '',
            amount: 0
        }
    ],
    payer: '',
    collector: '',
    notes: '',
  });

  useEffect(() => {
    const storedReceipt = localStorage.getItem('receipt');
    if (storedReceipt) {
      setReceipt(JSON.parse(storedReceipt));
    }
  }, []);

  const saveReceipt = () => {
    if (!receipt) return;
    localStorage.setItem('receipt', JSON.stringify(receipt));
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Receipts
        </h1>
        <FormInput
          receipt={receipt}
          setReceipt={setReceipt}
          filename={filename}
          setFilename={setFilename}
        />
        <PDFGenerator
          filename={filename}
          receipt={receipt}
          saveReceipt={saveReceipt}
        />
        <a
          className="btn btn-primary ml-3 cursor-pointer"
          href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(receipt))}`}
          download="data.json"
          >
            Guardar JSON
          </a>
      </main>
      <Footer />
    </div>
  )
}

export default App
