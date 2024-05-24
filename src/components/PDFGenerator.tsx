import Receipt from '../models/Receipt';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';

const PDFGenerator = ({
    filename,
    receipt,
    saveReceipt
}: {
    filename: string;
    receipt: Receipt;
    saveReceipt: (receipt: Receipt) => void;
}) => {
  
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt'
        });
        receipt.amount = receipt.concepts.reduce(
            (total: number, item: { amount: number }) => total + item.amount,
        0)
        doc.text('Factura del alquiler', 40, 40);

        const firstRow = ['Numero', 'Localidad', 'Importe'];
        autoTable(doc, {
            head: [firstRow],
            body: [
                [
                    receipt.num,
                    receipt.loc,
                    receipt.amount,
                ],
            ],
        });

        const secondRow = ['Fecha', 'Vencimiento'];
        autoTable(doc, {
            head: [secondRow],
            body: [
                [
                    receipt.date.toLocaleDateString(),
                    receipt.expiration.toLocaleDateString(),
                ],
            ],
        })

        const concepts = receipt.concepts;
        const total = concepts.reduce(
            (total: number, item: { amount: number }) => total + item.amount,
        0);
        const conceptBody: RowInput[] = [
            ...concepts.map(el => [el.name, el.amount + ' €']),
            [{
                content: 'TOTAL',
                styles: {
                    fillColor: [55, 275, 255],
                }
            }, {
                content: total + ' €',
                styles: {
                    fillColor: [55, 275, 255],
                }
            }]
        ];

        autoTable(doc, {
            body: conceptBody,
            columns: [
                { header: 'Concepto', dataKey: 'name' },
                { header: 'Importe', dataKey: 'amount' },
            ]
        });

        autoTable(doc, {
            head: [['Domicilio']],
            body: [[receipt.home]],
        });

        autoTable(doc, {
            head: [['Pagador', 'Cobrador']],
            body: [[receipt.payer, receipt.collector]],
        });

        saveReceipt(receipt);
        doc.save(`${filename}.pdf`);
    };

  return (
    <button className="btn btn-secondary mt-4" onClick={generatePDF}>
      Exportar PDF
    </button>
  );
};

export default PDFGenerator;
