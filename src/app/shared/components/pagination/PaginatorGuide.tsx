import * as React from "react";
import { Ripple } from "primereact";
import { Paginator } from "primereact/paginator";
import { classNames } from 'primereact/utils';


const PaginatorGuide: React.FC = () => {
    const [first, setFirst] = React.useState(0);
    const [rows, setRows] = React.useState(10);
    const [currentPage, setCurrentPage] = React.useState(1);

    //paginator
    const template:any = {
        layout: 'PrevPageLink PageLinks NextPageLink',
        'PrevPageLink': (options) => {
            return (
                <button type='button' className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className='p-3'><i className='pi pi-arrow-left'></i> 이전</span>
                    <Ripple />
                </button>
            )
        },
        'NextPageLink': (options) => {
            return (
                <button type='button' className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className='p-3'>다음 <i className='pi pi-arrow-right'></i></span>
                    <Ripple />
                </button>
            )
        },
        'PageLinks': (options) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                const className = classNames(options.className, { 'p-disabled': true });
    
                return <span className={className} style={{ userSelect: 'none' }}>...</span>;
            }
    
            return (
                <button type='button' className={options.className} onClick={options.onClick}>
                    {options.page + 1}
                    <Ripple />
                </button>
            )
        },
    }
    
    const onPageChange = (e) => {
        console.log(currentPage);
        setFirst(e.first);
        setRows(e.rows);
        setCurrentPage(e.page + 1);
    }

    return (
        <Paginator className="pa0" template={template} first={first} rows={rows} totalRecords={120} onPageChange={onPageChange}/>
    )

}

export default PaginatorGuide;
