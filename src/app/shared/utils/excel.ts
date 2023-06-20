import * as XLSX from 'xlsx';
import { CommonUtils } from './commonUtils';
import {JSON2SheetOpts} from 'xlsx';
import FileSaver from 'file-saver';

type AOA = any[][];

export class ExcelService {

    public excelToData(file: File, callback: any) {

        const reader = new FileReader();
        let jsonData = [];
        let rABS = !!reader.readAsBinaryString;
        let aoaData: AOA;

        reader.onload = (e) => {
            let data = e.target.result as any;
            if (!rABS) data = new Uint8Array(data);

            try {
                const wb: XLSX.WorkBook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});

                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];

                /* save data */
                aoaData =  (XLSX.utils.sheet_to_json(ws, {header: 1 } ) );
                const columns = aoaData[1];
                for (let i = 3; i < aoaData.length; i++) {
                    const item = aoaData[i];
                    const obj = {};
                    for (let j = 0; j < columns.length; j++) {
                        obj[columns[j]] = item[j];
                    }
                    jsonData.push(obj);
                }

                const result = jsonData.slice();
                jsonData = [];
                return callback(result, null);
            } catch (e) {
                return callback([], null);
            }
        };

        reader.onerror = (e) => {
            return callback(null, e);
        };

        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    }

    public exportExcel(data: unknown[], fileName: string, header?: string[] ): void {

        if (CommonUtils.isEmpty(data)) {
            throw new Error('다운로드 할 데이터를 찾을 수 없습니다.');
        }
        /* generate worksheet */
        let options: JSON2SheetOpts = {};
        if (!CommonUtils.isEmpty(header)) {
            options = {
                header
            };
        }

        data.forEach(item => {
            Object.keys(item).forEach(key => {
                item[key] = typeof item[key] === 'string' ? "'" + item[key].replace(/^[+=@-]*/, "") : "'" + item[key]
            })
        })

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, options);


        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob, fileName);


    }

    public exportExcelBySheets(data: unknown[][], fileName: string, sheetNames: string[] ): void {
        if (CommonUtils.isEmpty(data)) {
            throw new Error('다운로드 할 데이터를 찾을 수 없습니다.');
        }
        /* generate worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        data.forEach((sht, idx) => {
            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sht, {});
            XLSX.utils.book_append_sheet(wb, ws, sheetNames[idx]);
        });

        const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob, fileName);

    }
}

