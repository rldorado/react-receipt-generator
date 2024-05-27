import Receipt from '../models/Receipt';
import jsPDF from 'jspdf';
import { formatDate } from '../utils';

const DEFAULT_PDF_STYLES = {
  TEXT_SIZE: 12,
  LINE_HEIGHT: 12,
  MARGIN_X: 40,
  MARGIN_Y: 40,
  BOX_PADDING: 10,
};

const generatePDF = (receipt: Receipt, filename: string) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
  });

  const { TEXT_SIZE, LINE_HEIGHT, MARGIN_X, MARGIN_Y, BOX_PADDING } = DEFAULT_PDF_STYLES;

  doc.setFontSize(TEXT_SIZE);

  // Background
  doc.setFillColor(173, 216, 230);
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

  // Header
  doc.setFillColor(255, 255, 255);
  doc.rect(MARGIN_X, MARGIN_Y, 500, 60, 'F');

  doc.text('Numero', MARGIN_X + BOX_PADDING, MARGIN_Y + BOX_PADDING + LINE_HEIGHT);
  doc.text(`${receipt.num}`, MARGIN_X + BOX_PADDING, MARGIN_Y + BOX_PADDING + LINE_HEIGHT * 2);

  doc.text('Localidad', MARGIN_X + 200 + BOX_PADDING, MARGIN_Y + BOX_PADDING + LINE_HEIGHT);
  doc.text(`${receipt.loc}`, MARGIN_X + 200 + BOX_PADDING, MARGIN_Y + BOX_PADDING + LINE_HEIGHT * 2);

  doc.text('Importe', MARGIN_X + 400 + BOX_PADDING, MARGIN_Y + BOX_PADDING + LINE_HEIGHT);
  doc.text(`${receipt.amount} €`, MARGIN_X + 400 + BOX_PADDING, MARGIN_Y + BOX_PADDING + LINE_HEIGHT * 2);

  // Date
  doc.setFillColor(255, 255, 255);
  doc.rect(MARGIN_X, MARGIN_Y + 80, 500, 40, 'F');

  doc.text('Fecha de emisión', MARGIN_X + BOX_PADDING, MARGIN_Y + BOX_PADDING + 80 + LINE_HEIGHT);
  doc.text(`${formatDate(receipt.date)}`, MARGIN_X + BOX_PADDING, MARGIN_Y + BOX_PADDING + 80 + LINE_HEIGHT * 2);

  // Expiration
  doc.text('Vencimiento', MARGIN_X + 200 + BOX_PADDING, MARGIN_Y + BOX_PADDING + 80 + LINE_HEIGHT);
  doc.text(
    `${formatDate(receipt.expiration)}`,
    MARGIN_X + 200 + BOX_PADDING,
    MARGIN_Y + BOX_PADDING + 80 + LINE_HEIGHT * 2
  );

  // Concepts
  doc.setFillColor(255, 255, 255);
  doc.rect(MARGIN_X, MARGIN_Y + 140, 500, 200, 'F');

  let currentMarginY = MARGIN_Y + 140 + BOX_PADDING + LINE_HEIGHT;
  receipt.concepts.forEach((concept) => {
    doc.text(concept.name, MARGIN_X + BOX_PADDING, currentMarginY);
    doc.text(`${concept.amount} €`, MARGIN_X + 200 + BOX_PADDING, currentMarginY);
    currentMarginY += 12 + BOX_PADDING;
  });

  // Address
  doc.setFillColor(255, 255, 255);
  doc.rect(MARGIN_X, currentMarginY + 20, 500, 40, 'F');

  doc.text('Domicilio', MARGIN_X + BOX_PADDING, currentMarginY + 20 + BOX_PADDING + LINE_HEIGHT);
  doc.text(`${receipt.home}`, MARGIN_X + BOX_PADDING, currentMarginY + 20 + BOX_PADDING + LINE_HEIGHT * 2);

  // Payer
  currentMarginY += 80;
  doc.setFillColor(255, 255, 255);
  doc.rect(MARGIN_X, currentMarginY, 500, 60, 'F');

  doc.text('Pagador', MARGIN_X + BOX_PADDING, currentMarginY + BOX_PADDING + LINE_HEIGHT);
  doc.text(`Nombre: ${receipt.payer.name}`, MARGIN_X + BOX_PADDING, currentMarginY + BOX_PADDING + LINE_HEIGHT * 2);
  doc.text(
    `Dirección: ${receipt.payer.address}`,
    MARGIN_X + BOX_PADDING,
    currentMarginY + BOX_PADDING + LINE_HEIGHT * 3
  );

  // Collector
  currentMarginY += 80;
  doc.setFillColor(255, 255, 255);
  doc.rect(MARGIN_X, currentMarginY, 500, 60, 'F');

  doc.text('Cobrador', MARGIN_X + BOX_PADDING, currentMarginY + BOX_PADDING + LINE_HEIGHT);
  doc.text(`Nombre: ${receipt.collector.name}`, MARGIN_X + BOX_PADDING, currentMarginY + BOX_PADDING + LINE_HEIGHT * 2);
  doc.text(
    `Dirección: ${receipt.collector.address}`,
    MARGIN_X + BOX_PADDING,
    currentMarginY + BOX_PADDING + LINE_HEIGHT * 3
  );

  doc.save(`${filename}.pdf`);
};

export default generatePDF;
