
import { FortuneFile } from "../ToFortuneSheet/FortuneFile";
import { HandleZip } from "../ToFortuneSheet/HandleZip";
import { exportSheetExcel } from "../ToExcel/ExcelFile";

export const transformExcelToFortune = async (
    e: any,
    setSheets: any,
    setKey: any,
    sheetRef: any
) => {
    const excelFile = await e.target.files[0].arrayBuffer();
    const files = await new HandleZip(excelFile).unzipFile();
    const fortuneFile = new FortuneFile(files, excelFile.name);
    fortuneFile.Parse();

    const lsh = fortuneFile.serialize();    

    setSheets(lsh.sheets);
    setKey((k: number) => k + 1);

    setTimeout(() => {
        for (let sheet of lsh.sheets) {
            let config = sheet.config;
            sheetRef.current?.setColumnWidth(config?.columnlen || {}, { id: sheet.id });
            sheetRef.current?.setRowHeight(config?.rowlen || {}, { id: sheet.id });
        }
    }, 1);
};


export const transformExcelToFortuneJson = async (excelFileBuffer: any) => {
    const files = await new HandleZip(excelFileBuffer).unzipFile();
    const fortuneFile = new FortuneFile(files, excelFileBuffer.name);
    fortuneFile.Parse();

    return fortuneFile.serialize(); 
}

export const transformFortuneToExcel = async (
    luckysheetRef: any
) => {
    await exportSheetExcel(luckysheetRef);
};
