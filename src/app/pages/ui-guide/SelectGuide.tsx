import * as React from 'react';
import { Dropdown, MultiSelect } from 'primereact';
import { BasePage } from '../../shared/components/base/BasePage';
import './ui-guide.css';
import ClipboardCopy from '../../shared/components/clipboard-copy/ClipboardCopy';

const Select: React.FC = () => {

    const [select, setSelect] = React.useState<any>(null);
    const [selectedGroupedCities, setSelectedGroupedCities] = React.useState(null);

    const options = [
        { name: '공지사항', code: 'NY' },
        { name: '웹툰', code: 'RM' },
    ];

    const handleChange = (e: { value: any}) => {
        setSelect(e.value);
    }
    const groupedCities = [
        {
            label: 'Germany', code: 'DE',
            items: [
                { label: 'Berlin', value: 'Berlin' },
                { label: 'Frankfurt', value: 'Frankfurt' },
            ]
        },
        {
            label: 'USA', code: 'US',
            items: [
                { label: 'Chicago', value: 'Chicago' },
                { label: 'Los Angeles', value: 'Los Angeles' },
            ]
        },
    ];

    return(
    <BasePage>
        <div className='previewBox'>
            <h3>Basic</h3>
            <Dropdown value={select} options={options} onChange={handleChange} optionLabel='name' placeholder='전체' />
            
            <br/>
            <br/>
            <Dropdown disabled value={select} optionLabel='name' placeholder='Disabled' />

            <h3>Multi Select</h3>
            <MultiSelect 
                style={{width:150}}
                filter
                value={selectedGroupedCities} 
                options={groupedCities} 
                onChange={(e) => setSelectedGroupedCities(e.value)} 
                optionLabel='label' optionGroupLabel='label' optionGroupChildren='items'
                placeholder='Select Cities' />

            <br/>
            <br/>
            <MultiSelect 
                disabled
                style={{width:150}}
                filter
                optionLabel='label' optionGroupLabel='label' optionGroupChildren='items'
                placeholder='Disabled' />
        </div>
        
        <ClipboardCopy rows={62} copyText={`
import * as React from 'react';
import { Dropdown, MultiSelect } from 'primereact';
import { BasePage } from '../../shared/components/base/BasePage';

const Select: React.FC = () => {

    const [select, setSelect] = React.useState<any>(null);
    const [selectedGroupedCities, setSelectedGroupedCities] = React.useState(null);

    const options = [
        { name: '공지사항', code: 'NY' },
        { name: '웹툰', code: 'RM' },
    ];

    const handleChange = (e: { value: any}) => {
        setSelect(e.value);
    }
    const groupedCities = [
        {
            label: 'Germany', code: 'DE',
            items: [
                { label: 'Berlin', value: 'Berlin' },ibk@1234

                { label: 'Frankfurt', value: 'Frankfurt' },
            ]
        },
        {
            label: 'USA', code: 'US',
            items: [
                { label: 'Chicago', value: 'Chicago' },
                { label: 'Los Angeles', value: 'Los Angeles' },
            ]
        },
    ];

    return(
    <BasePage>
        <h3>Basic</h3>
        <Dropdown value={select} options={options} onChange={handleChange} optionLabel='name' placeholder='전체' />
        <Dropdown disabled value={select} optionLabel='name' placeholder='Disabled' />

        <h3>Multi Select</h3>
        <MultiSelect 
            style={{width:150}}
            filter
            value={selectedGroupedCities} 
            options={groupedCities} 
            onChange={(e) => setSelectedGroupedCities(e.value)} 
            optionLabel='label' optionGroupLabel='label' optionGroupChildren='items'
            placeholder='Select Cities' />

        <MultiSelect 
            disabled
            style={{width:150}}
            filter
            optionLabel='label' optionGroupLabel='label' optionGroupChildren='items'
            placeholder='Disabled' />
    </BasePage>)
}
export default Select;`} />
    </BasePage>)
}
export default Select;