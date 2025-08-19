import React, { useEffect } from "react";
import { Workbook } from "@fortune-sheet/react";
import "@fortune-sheet/react/dist/index.css";
import { exportToolBarItem, importToolBarItem } from "@corbe30/fortune-excel";
import { ImportHelper } from "@corbe30/fortune-excel";
import { transformExcelToFortuneJson } from '../common/Transform'
 
export const Page = () => {
  const [key, setKey] = React.useState(0);
  const [sheets, setSheets] = React.useState([{ name: "Sheet1" }]);
  const sheetRef = React.useRef(null);

  const test = async () => {
    const response = await fetch('https://d243puytshjl14.cloudfront.net/test-case-2/ExALLEN1607-06.xlsx');
    const buffer = await response.arrayBuffer();
    const fts = await transformExcelToFortuneJson(buffer);
    console.log('fts', fts);
    // setSheets(fts.sheets);
    // setKey((k: number) => k + 1);
  }

  useEffect(() => { 
    test();
    // const fts = transformExcelToFortuneJson();
  }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
      }}
    >
      <ImportHelper setKey={setKey} setSheets={setSheets} sheetRef={sheetRef} />
      <Workbook
        key={key}
        data={sheets}
        ref={sheetRef}
        customToolbarItems={[importToolBarItem(), exportToolBarItem(sheetRef)]}
      />
    </div>
  );
};
