const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb } = require('pdf-lib');

async function modifyPdf() {
  const pdfPath = path.resolve(__dirname, './pdf/ATHER-form.pdf');
  const outputPath = path.resolve(__dirname, './pdf/output.pdf');

  const existingPdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const firstPage = pdfDoc.getPages()[0];

  const coordinates = [
    { x: 429, y: 703, key: 'bidNo1' },
    { x: 435, y: 235, key: 'bidNo2' },
    { x: 428, y: 624, key: 'email1' },
    { x: 405, y: 611, key: 'MobileNo1' }
  ];

  const data = {
    bidNo1: 'BID001',
    bidNo2: 'BID002',
    email1: 'example@mail.com',
    MobileNo1: '9876543210'
  };

  for (const { x, y, key } of coordinates) {
    const text = data[key] || '';
    firstPage.drawText(text, {
      x,
      y,
      size: 12,
      color: rgb(0, 0, 0)
    });
  }

  const pdfBytes = await pdfDoc.save();

  try {
    fs.writeFileSync(outputPath, pdfBytes); // safer than unlinking first
    console.log('PDF successfully written to:', outputPath);
  } catch (err) {
    console.error('Failed to write PDF. Is it open somewhere?', err);
  }
}

modifyPdf().catch(console.error);
