import * as React from 'react';
import { BasePage } from '../../shared/components/base/BasePage';
import './ui-guide.css';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';
import NoData from '../../shared/components/ui/NoData';
import ClipboardCopy from '../../shared/components/clipboard-copy/ClipboardCopy';

const demoData = [
    {'id': '1000','code': 'f230fh0g3','name': 'Bamboo Watch','description': 'Product Description','image': 'bamboo-watch.jpg','price': 65,'category': 'Accessories','quantity': 24,'inventoryStatus': 'INSTOCK','rating': 5},
    {'id': '1001','code': 'nvklal433','name': 'Black Watch','description': 'Product Description','image': 'black-watch.jpg','price': 72,'category': 'Accessories','quantity': 61,'inventoryStatus': 'INSTOCK','rating': 4},
    {'id': '1002','code': 'zz21cz3c1','name': 'Blue Band','description': 'Product Description','image': 'blue-band.jpg','price': 79,'category': 'Fitness','quantity': 2,'inventoryStatus': 'LOWSTOCK','rating': 3},
    {'id': '1003','code': '244wgerg2','name': 'Blue T-Shirt','description': 'Product Description','image': 'blue-t-shirt.jpg','price': 29,'category': 'Clothing','quantity': 25,'inventoryStatus': 'INSTOCK','rating': 5},
    {'id': '1004','code': 'h456wer53','name': 'Bracelet','description': 'Product Description','image': 'bracelet.jpg','price': 15,'category': 'Accessories','quantity': 73,'inventoryStatus': 'INSTOCK','rating': 4},
    {'id': '1005','code': 'av2231fwg','name': 'Brown Purse','description': 'Product Description','image': 'brown-purse.jpg','price': 120,'category': 'Accessories','quantity': 0,'inventoryStatus': 'OUTOFSTOCK','rating': 4},
    {'id': '1006','code': 'bib36pfvm','name': 'Chakra Bracelet','description': 'Product Description','image': 'chakra-bracelet.jpg','price': 32,'category': 'Accessories','quantity': 5,'inventoryStatus': 'LOWSTOCK','rating': 3},
    {'id': '1007','code': 'mbvjkgip5','name': 'Galaxy Earrings','description': 'Product Description','image': 'galaxy-earrings.jpg','price': 34,'category': 'Accessories','quantity': 23,'inventoryStatus': 'INSTOCK','rating': 5},
    {'id': '1008','code': 'vbb124btr','name': 'Game Controller','description': 'Product Description','image': 'game-controller.jpg','price': 99,'category': 'Electronics','quantity': 2,'inventoryStatus': 'LOWSTOCK','rating': 4},
    {'id': '1009','code': 'cm230f032','name': 'Gaming Set','description': 'Product Description','image': 'gaming-set.jpg','price': 299,'category': 'Electronics','quantity': 63,'inventoryStatus': 'INSTOCK','rating': 3}
]

const ExcelGuide: React.FC = () => {

    const [products, setProducts] = React.useState<any>([]);
    const [importedData, setImportedData] = React.useState([]);
    const [importedCols, setImportedCols] = React.useState([{ field: '', header: 'Header' }]);
    const dt = React.useRef<any>(null);

    const cols = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'quantity', header: 'Quantity' }
    ];

    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));

    React.useEffect(() => {
        setProducts(demoData)
    }, []);

    const importCSV = (e:any) => {
        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = (e:any) => {
            const csv = e.target.result;
            const data = csv.split('\n');

            // Prepare DataTable
            const cols = data[0].replace(/['']+/g, '').split(',');
            data.shift();

            let _importedCols = cols.map((col:any) => ({ field: col, header: toCapitalize(col.replace(/['']+/g, '')) }));
            let _importedData = data.map((d:any) => {
                d = d.split(',');
                return cols.reduce((obj:any, c:any, i:any) => {
                    obj[c] = d[i].replace(/['']+/g, '');
                    return obj;
                }, {});
            });

            setImportedCols(_importedCols);
            setImportedData(_importedData);
        };

        reader.readAsText(file, 'UTF-8');
    }

    const importExcel = (e:any) => {
        console.log('importExcel', e)
        const file = e.files[0];

        import('xlsx').then(xlsx => {
            const reader = new FileReader();
            reader.onload = (e:any) => {
                const wb = xlsx.read(e.target.result, { type: 'array' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

                // Prepare DataTable
                const cols:any = data[0];
                data.shift();

                let _importedCols:any = cols.map((col:any) => ({ field: col, header: toCapitalize(col) }));
                let _importedData:any = data.map((d:any) => {
                    return cols.reduce((obj:any, c:any, i:any) => {
                        obj[c] = d[i];
                        return obj;
                    }, {});
                });

                setImportedCols(_importedCols);
                setImportedData(_importedData);
            };

            reader.readAsArrayBuffer(file);
        });
    }

    const exportCSV = (selectionOnly:any) => {
        dt?.current?.exportCSV({ selectionOnly });
    }

    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(products);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'products');
        });
    }

    const saveAsExcelFile = (buffer:any, fileName:any) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    }

    const toCapitalize = (s:any) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    const clear = () => {
        setImportedData([]);
        setImportedCols([{ field: '', header: 'Header' }]);
    }

    return(
    <BasePage>
        <div className='previewBox'>
            <div className='card'>
                <h3>Import (작업중입니다)</h3>

                <div className='d-flex-default export-buttons mb10'>
                    <FileUpload chooseOptions={{ label: 'CSV', icon: 'pi pi-file' }} mode='basic' name='demo[]' auto url='./upload.php' accept='.csv' className='mr5 d-inline-block' onUpload={importCSV} />
                    <FileUpload chooseOptions={{ label: 'Excel', icon: 'pi pi-file-excel', className: 'p-button-success' }} mode='basic' name='demo[]' auto url='./upload.php'
                        accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' className='mr5 d-inline-block' onUpload={importExcel} />
                    <Button type='button' label='Clear' icon='pi pi-times' onClick={clear} className='outline ml-auto mr0' />
                </div>

                <DataTable value={importedData} emptyMessage={<NoData message='데이터가 없습니다' />} paginator rows={10} alwaysShowPaginator={false} responsiveLayout='scroll'>
                    {
                        importedCols.map((col:any, index:number) => <Column key={index} field={col.field} header={col.header} />)
                    }
                </DataTable>
            </div>

            <div className='card'>
                <h3 className='mt60'>Export</h3>

                <Tooltip target='.export-buttons>button' position='bottom' />

                <div className='d-flex-default export-buttons mb10'>
                    <Button type='button' icon='pi pi-file' label='CSV' onClick={() => exportCSV(false)} className='ml-auto mr0' data-pr-tooltip='CSV' />
                    <Button type='button' icon='pi pi-file-excel' label='Excel' onClick={exportExcel} className='p-button-success ml10 mr0' data-pr-tooltip='XLS' />
                </div>

                <DataTable ref={dt} value={products} dataKey='id' responsiveLayout='scroll'>
                    {
                        cols.map((col:any, index:number) => <Column key={index} field={col.field} header={col.header} />)
                    }
                </DataTable>
            </div>
        </div>

        <ClipboardCopy rows={195} copyText={`
import * as React from 'react';
import { BasePage } from '../../shared/components/base/BasePage';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';
import NoData from '../../shared/components/ui/NoData';

const demoData = [
    {'id': '1000','code': 'f230fh0g3','name': 'Bamboo Watch','description': 'Product Description','image': 'bamboo-watch.jpg','price': 65,'category': 'Accessories','quantity': 24,'inventoryStatus': 'INSTOCK','rating': 5},
    {'id': '1001','code': 'nvklal433','name': 'Black Watch','description': 'Product Description','image': 'black-watch.jpg','price': 72,'category': 'Accessories','quantity': 61,'inventoryStatus': 'INSTOCK','rating': 4},
    {'id': '1002','code': 'zz21cz3c1','name': 'Blue Band','description': 'Product Description','image': 'blue-band.jpg','price': 79,'category': 'Fitness','quantity': 2,'inventoryStatus': 'LOWSTOCK','rating': 3},
    {'id': '1003','code': '244wgerg2','name': 'Blue T-Shirt','description': 'Product Description','image': 'blue-t-shirt.jpg','price': 29,'category': 'Clothing','quantity': 25,'inventoryStatus': 'INSTOCK','rating': 5},
    {'id': '1004','code': 'h456wer53','name': 'Bracelet','description': 'Product Description','image': 'bracelet.jpg','price': 15,'category': 'Accessories','quantity': 73,'inventoryStatus': 'INSTOCK','rating': 4},
    {'id': '1005','code': 'av2231fwg','name': 'Brown Purse','description': 'Product Description','image': 'brown-purse.jpg','price': 120,'category': 'Accessories','quantity': 0,'inventoryStatus': 'OUTOFSTOCK','rating': 4},
    {'id': '1006','code': 'bib36pfvm','name': 'Chakra Bracelet','description': 'Product Description','image': 'chakra-bracelet.jpg','price': 32,'category': 'Accessories','quantity': 5,'inventoryStatus': 'LOWSTOCK','rating': 3},
    {'id': '1007','code': 'mbvjkgip5','name': 'Galaxy Earrings','description': 'Product Description','image': 'galaxy-earrings.jpg','price': 34,'category': 'Accessories','quantity': 23,'inventoryStatus': 'INSTOCK','rating': 5},
    {'id': '1008','code': 'vbb124btr','name': 'Game Controller','description': 'Product Description','image': 'game-controller.jpg','price': 99,'category': 'Electronics','quantity': 2,'inventoryStatus': 'LOWSTOCK','rating': 4},
    {'id': '1009','code': 'cm230f032','name': 'Gaming Set','description': 'Product Description','image': 'gaming-set.jpg','price': 299,'category': 'Electronics','quantity': 63,'inventoryStatus': 'INSTOCK','rating': 3}
]

const ExcelGuide: React.FC = () => {

    const [products, setProducts] = React.useState<any>([]);
    const [importedData, setImportedData] = React.useState([]);
    const [importedCols, setImportedCols] = React.useState([{ field: '', header: 'Header' }]);
    const dt = React.useRef<any>(null);

    const cols = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'quantity', header: 'Quantity' }
    ];

    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));

    React.useEffect(() => {
        setProducts(demoData)
    }, []);

    const importCSV = (e:any) => {
        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = (e:any) => {
            const csv = e.target.result;
            const data = csv.split('\n');

            // Prepare DataTable
            const cols = data[0].replace(/['']+/g, '').split(',');
            data.shift();

            let _importedCols = cols.map((col:any) => ({ field: col, header: toCapitalize(col.replace(/['']+/g, '')) }));
            let _importedData = data.map((d:any) => {
                d = d.split(',');
                return cols.reduce((obj:any, c:any, i:any) => {
                    obj[c] = d[i].replace(/['']+/g, '');
                    return obj;
                }, {});
            });

            setImportedCols(_importedCols);
            setImportedData(_importedData)
        };

        reader.readAsText(file, 'UTF-8');
    }

    const importExcel = (e:any) => {
        console.log('importExcel', e)
        const file = e.files[0];

        import('xlsx').then(xlsx => {
            const reader = new FileReader();
            reader.onload = (e:any) => {
                const wb = xlsx.read(e.target.result, { type: 'array' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

                // Prepare DataTable
                const cols:any = d   ata[0];
                data.shift();

                let _importedCols:any = cols.map((col:any) => ({ field: col, header: toCapitalize(col) }));
                let _importedData:any = data.map((d:any) => {
                    return cols.reduce((obj:any, c:any, i:any) => {
                        obj[c] = d[i];
                        return obj;
                    }, {});
                });

                setImportedCols(_importedCols);
                setImportedData(_importedData);
            };

            reader.readAsArrayBuffer(file);
        });
    }

    const exportCSV = (selectionOnly:any) => {
        dt?.current?.exportCSV({ selectionOnly });
    }

    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(products);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'products');
        });
    }

    const saveAsExcelFile = (buffer:any, fileName:any) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    }

    const toCapitalize = (s:any) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    const clear = () => {
        setImportedData([]);
        setImportedCols([{ field: '', header: 'Header' }]);
    }

    return(
    <BasePage>
        <div className='card'>
            <h3>Import (작업중입니다)</h3>

            <div className='d-flex-default export-buttons mb10'>
                <FileUpload chooseOptions={{ label: 'CSV', icon: 'pi pi-file' }} mode='basic' name='demo[]' auto url='./upload.php' accept='.csv' className='mr5 d-inline-block' onUpload={importCSV} />
                <FileUpload chooseOptions={{ label: 'Excel', icon: 'pi pi-file-excel', className: 'p-button-success' }} mode='basic' name='demo[]' auto url='./upload.php'
                    accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' className='mr5 d-inline-block' onUpload={importExcel} />
                <Button type='button' label='Clear' icon='pi pi-times' onClick={clear} className='outline ml-auto mr0' />
            </div>

            <DataTable value={importedData} emptyMessage={<NoData message='데이터가 없습니다' />} paginator rows={10} alwaysShowPaginator={false} responsiveLayout='scroll'>
                {
                    importedCols.map((col:any, index:number) => <Column key={index} field={col.field} header={col.header} />)
                }
            </DataTable>
        </div>

        <div className='card'>
            <h3 className='mt60'>Export</h3>

            <Tooltip target='.export-buttons>button' position='bottom' />

            <div className='d-flex-default export-buttons mb10'>
                <Button type='button' icon='pi pi-file' label='CSV' onClick={() => exportCSV(false)} className='ml-auto mr0' data-pr-tooltip='CSV' />
                <Button type='button' icon='pi pi-file-excel' label='Excel' onClick={exportExcel} className='p-button-success ml10 mr0' data-pr-tooltip='XLS' />
            </div>

            <DataTable ref={dt} value={products} dataKey='id' responsiveLayout='scroll'>
                {
                    cols.map((col:any, index:number) => <Column key={index} field={col.field} header={col.header} />)
                }
            </DataTable>
        </div>
    </BasePage>)
}
export default ExcelGuide
        `} />
    </BasePage>)
}
export default ExcelGuide