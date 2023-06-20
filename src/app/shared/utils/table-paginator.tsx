import { classNames, Dropdown, Ripple } from "primereact";

export const paginator:any = {
    layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown',
    'PrevPageLink': (options:any) => {
        return (
            <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                <i className='pi pi-arrow-left'></i><span className="pl5">이전</span>
                <Ripple />
            </button>
        )
    },
    'NextPageLink': (options:any) => {
        return (
            <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                <span className="pr5">다음</span><i className='pi pi-arrow-right'></i>
                <Ripple />
            </button>
        )
    },
    'PageLinks': (options:any) => {
        if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
            const className = classNames(options.className, { 'p-disabled': true });

            return <span className={className} style={{ userSelect: 'none' }}>...</span>;
        }

        return (
            <button type="button" className={options.className} onClick={options.onClick}>
                {options.page + 1}
                <Ripple />
            </button>
        )
    },
    'RowsPerPageDropdown': (options:any) => {
        const dropdownOptions = [
            { label: 5, value: 5 },
            { label: 10, value: 10 },
            { label: 20, value: 20 },
            { label: 50, value: 50 },
            { label: 'All', value: options.totalRecords }
        ];

        return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />;
    },
};