import Receipt from '../models/Receipt';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatDate } from '../utils';

const generatePDF = (receipt: Receipt, filename: string) => {
  const doc = new jsPDF();

  const { num, loc, date, expiration, home, concepts, payer, collector } = receipt;

  // Styles
  const TITLE_STYLE = { FONT_SIZE: 12, FONT_STYLE: 'bold' };
  const TEXT_STYLE = { FONT_SIZE: 10 };

  // Header
  doc.setFontSize(16);
  doc.text('Recibo', 105, 10, { align: 'center' });

  doc.setFontSize(TITLE_STYLE.FONT_SIZE);
  doc.setFont('Helvetica', TITLE_STYLE.FONT_STYLE);
  doc.text('Numero', 10, 30);
  doc.text(`Localidad`, 70, 30);
  doc.text(`Importe`, 140, 30);

  doc.setFontSize(TEXT_STYLE.FONT_SIZE);
  doc.setFont('Helvetica', 'normal');
  doc.text(num || '', 10, 35);
  doc.text(loc || '', 70, 35);
  doc.text(`${concepts.reduce((total, item) => total + Number(item.amount), 0)} €`, 140, 35);

  doc.setFontSize(TITLE_STYLE.FONT_SIZE);
  doc.setFont('Helvetica', TITLE_STYLE.FONT_STYLE);
  doc.text(`Fecha de emisión`, 10, 45);
  doc.text(`Vencimiento`, 70, 45);

  doc.setFontSize(TEXT_STYLE.FONT_SIZE);
  doc.setFont('Helvetica', 'normal');
  doc.text(formatDate(date), 10, 50);
  doc.text(typeof expiration === 'string' ? expiration : formatDate(expiration), 70, 50);

  // Concepts table
  autoTable(doc, {
    startY: 60,
    head: [['Concepto', 'Importe']],
    body: concepts.map((concept) => [concept.name, `${concept.amount} €`]),
    theme: 'striped',
    styles: { fontSize: TEXT_STYLE.FONT_SIZE },
    headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableEndY = (doc as any).autoTable.previous.finalY;

  // Home address
  doc.setFontSize(TITLE_STYLE.FONT_SIZE);
  doc.setFont('Helvetica', TITLE_STYLE.FONT_STYLE);
  doc.text(`Domicilio`, 10, tableEndY + 10);

  doc.setFontSize(TEXT_STYLE.FONT_SIZE);
  doc.setFont('Helvetica', TITLE_STYLE.FONT_STYLE);
  doc.text(home, 10, tableEndY + 15);

  // Payer information
  doc.setFontSize(TITLE_STYLE.FONT_SIZE);
  doc.setFont('Helvetica', TITLE_STYLE.FONT_STYLE);
  doc.text(`Pagador`, 10, tableEndY + 25);

  doc.setFontSize(TEXT_STYLE.FONT_SIZE);
  doc.setFont('Helvetica', TITLE_STYLE.FONT_STYLE);
  doc.text(`Nombre: ${payer.name}`, 20, tableEndY + 30);
  doc.text(`Dirección: ${payer.address}`, 20, tableEndY + 35);

  // Collector information
  doc.setFontSize(TITLE_STYLE.FONT_SIZE);
  doc.setFont('Helvetica', TITLE_STYLE.FONT_STYLE);
  doc.text(`Cobrador`, 10, tableEndY + 45);

  doc.setFontSize(TEXT_STYLE.FONT_SIZE);
  doc.setFont('Helvetica', TITLE_STYLE.FONT_STYLE);
  doc.text(`Nombre: ${collector.name}`, 20, tableEndY + 50);
  doc.text(`Dirección: ${collector.address}`, 20, tableEndY + 55);

  // Leave space for signature
  doc.text('_____________________________', 20, tableEndY + 65);

  // Save PDF
  doc.save(`${filename}.pdf`);
};

export default generatePDF;
