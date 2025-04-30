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
    {
        "x": 269,
        "y": 127,
        "key": "bidNo1"
    },
    {
        "x": 262,
        "y": 180,
        "key": "bidNo2"
    },
    {
        "x": 259,
        "y": 230,
        "key": "email1"
    },
    {
        "x": 238,
        "y": 337,
        "key": "MobileNo1"
    },
    {
        "x": 240,
        "y": 302,
        "key": "MobileNo2"
    },
    {
        "x": 221,
        "y": 495,
        "key": "ApplicationNo1"
    },
    {
        "x": 214,
        "y": 410,
        "key": "ApplicationNo2"
    },
    {
        "x": 216,
        "y": 371,
        "key": "ApplicationNo3"
    }
  ];

  const data = {
    bidNo1: 'BID001',
    bidNo2: 'BID002',
    email1: 'example@mail.com',
    MobileNo1: '9876543210',
    ApplicationNo1: 'APP001',
    ApplicationNo2: 'APP002',
    ApplicationNo3: 'APP003',
    MobileNo2: '1234567890'
  };

  for (const { x, y, key } of coordinates) {
    console.log(`Writing ${key} at (${x}, ${y})`);
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
    fs.writeFileSync(outputPath, pdfBytes);
    console.log('PDF successfully written to:', outputPath);
  } catch (err) {
    console.error('Failed to write PDF. Is it open somewhere?', err);
  }
}

modifyPdf().catch(console.error);