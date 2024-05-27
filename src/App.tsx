import Footer from './components/Footer';
import Header from './components/Header';
import { ReceiptProvider } from './context/ReceiptContext';
import ReceiptList from './components/ReceiptList';

const App: React.FC = () => {
  return (
    <ReceiptProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <ReceiptList />
        </main>
        <Footer />
      </div>
    </ReceiptProvider>
  );
};

export default App;
