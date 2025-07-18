import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('images') as File[];

    if (!files.length) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const jpgImage = await pdfDoc.embedJpg(buffer);
      const page = pdfDoc.addPage([jpgImage.width, jpgImage.height]);

      page.drawImage(jpgImage, {
        x: 0,
        y: 0,
        width: jpgImage.width,
        height: jpgImage.height,
      });
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=converted.pdf',
      },
    });
  } catch (err) {
    console.error('Error while generating PDF:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
