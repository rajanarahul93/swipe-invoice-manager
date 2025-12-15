import * as XLSX from "xlsx";

export async function parseFile(file: File): Promise<string> {
  const fileType = file.type;

  if (fileType.includes("pdf")) {
    return await parsePDF(file);
  } else if (fileType.includes("image")) {
    return await parseImage(file);
  } else if (fileType.includes("sheet") || fileType.includes("excel")) {
    return await parseExcel(file);
  }

  throw new Error(`Unsupported file type: ${fileType}`);
}

async function parsePDF(file: File): Promise<string> {
  return `[PDF File: ${file.name}]
Size: ${(file.size / 1024).toFixed(2)} KB

Note: PDF parsing is currently limited in browser environment.
For production use, implement server-side PDF parsing with libraries like pdf-parse or use OCR services.

Sample invoice structure expected:
- Invoice Number
- Date
- Customer Name
- Items/Products
- Quantities
- Prices
- Tax
- Total Amount

Please extract data manually or use Excel format for best results.`;
}

async function parseImage(file: File): Promise<string> {
  return `[Image: ${file.name}]\nBase64 data available for OCR processing.\nSize: ${file.size} bytes`;
}

async function parseExcel(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  let content = `[Excel File: ${file.name}]\n\n`;

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    content += `Sheet: ${sheetName}\n`;
    content += JSON.stringify(jsonData, null, 2);
    content += "\n\n";
  });

  return content;
}
