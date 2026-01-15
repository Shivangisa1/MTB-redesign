import XLSX from "xlsx";
import path from "path";

export function readExcel(fileName: string) {
    const filePath = path.join(process.cwd(), "tests", "test-data", fileName);


    // Load the workbook
    const workbook = XLSX.readFile(filePath);

    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const data = XLSX.utils.sheet_to_json(sheet);

    return XLSX.utils.sheet_to_json(sheet, { raw: false });



}

