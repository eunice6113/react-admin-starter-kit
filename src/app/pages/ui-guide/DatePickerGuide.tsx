import * as React from 'react';
import { Calendar } from 'primereact';
import { SearchParams } from '../../core/models/search-params';
import { BasePage } from '../../shared/components/base/BasePage';
import ClipboardCopy from '../../shared/components/clipboard-copy/ClipboardCopy';
import './ui-guide.css';

const DatePickerGuide: React.FC = () => {

    //검색 조건
    const [values, setValues] = React.useState<SearchParams>({
        fromDate: undefined,
        toDate: undefined,
    });

    const handleChange = (prop: keyof SearchParams, value:any) => {
        setValues({ ...values, [prop]: value });
    };

    return(
    <BasePage>
        <div className='previewBox'>
            <h3>Basic</h3>
            <Calendar dateFormat='yy.mm.dd' value={values.fromDate} onChange={(e) => handleChange('fromDate', e.value)} showIcon />
            <span className='mt5 mr10'>~</span>
            <Calendar dateFormat='yy.mm.dd' value={values.toDate} onChange={(e) => handleChange('toDate', e.value)} showIcon />
        </div>
    
        <ClipboardCopy rows={28} copyText={`
import * as React from 'react';
import { Calendar } from 'primereact';
import { SearchParams } from '../../core/models/search-params';
import { BasePage } from '../../shared/components/base/BasePage';

const DatePickerGuide: React.FC = () => {

    //검색 조건
    const [values, setValues] = React.useState<SearchParams>({
        fromDate: undefined,
        toDate: undefined,
    });

    const handleChange = (prop: keyof SearchParams, value:any) => {
        setValues({ ...values, [prop]: value });
    };

    return(
    <BasePage>
        <h3>Basic</h3>
        <Calendar dateFormat='yy.mm.dd' value={values.fromDate} onChange={(e) => handleChange('fromDate', e.value)} showIcon />
        <span className='mt5 mr10'>~</span>
        <Calendar dateFormat='yy.mm.dd' value={values.toDate} onChange={(e) => handleChange('toDate', e.value)} showIcon />
    </BasePage>)
}
export default DatePickerGuide;`} />
    </BasePage>)
}
export default DatePickerGuide;