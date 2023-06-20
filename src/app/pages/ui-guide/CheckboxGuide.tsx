import { Checkbox } from 'primereact';
import * as React from 'react';
import { BasePage } from '../../shared/components/base/BasePage';
import ClipboardCopy from '../../shared/components/clipboard-copy/ClipboardCopy';
import './ui-guide.css';

const CheckboxGuide: React.FC = () => {

    const categories = [
        {name: 'Accounting', key: 'A'}, 
        {name: 'Marketing', key: 'M'}, 
        {name: 'Production', key: 'P'}, 
        {name: 'Disabled', key: 'R'}];
    const [checked, setChecked] = React.useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = React.useState<any>(categories.slice(1,3));

    const onCategoryChange = (e: { value: any, checked: boolean }) => {
        let _selectedCategories = [...selectedCategories];

        if (e.checked) {
            _selectedCategories.push(e.value);
        }
        else {
            for (let i = 0; i < _selectedCategories.length; i++) {
                const selectedCategory = _selectedCategories[i];

                if (selectedCategory.key === e.value.key) {
                    _selectedCategories.splice(i, 1);
                    break;
                }
            }
        }

        setSelectedCategories(_selectedCategories);
    }

    return(
    <BasePage>
        <div className='previewBox'>
            <h3>Basic</h3>
            <div className='field-checkbox'>
                <Checkbox inputId='binary' checked={checked} onChange={e => setChecked(e.checked)} />
                <label htmlFor='binary'>Remember Me</label>
            </div>

            <div className='field-checkbox'>
                <Checkbox inputId='binary' checked={checked} disabled />
                <label htmlFor='binary'>disabled</label>
            </div>

            <br/>
            {
                categories.map((category) => {
                    return (
                        <div key={category.key} className='field-checkbox'>
                            <Checkbox inputId={category.key} name='category' value={category} onChange={onCategoryChange} 
                            checked={selectedCategories.some((item:any) => item.key === category.key)} disabled={category.key === 'R'} />
                            <label htmlFor={category.key}>{category.name}</label>
                        </div>
                    )
                })
            }
        </div>
        <ClipboardCopy rows={63} copyText={`
import * as React from 'react';
import { Checkbox } from 'primereact';
import { BasePage } from '../../shared/components/base/BasePage';

const CheckboxGuide: React.FC = () => {

    const categories = [
        {name: 'Accounting', key: 'A'}, 
        {name: 'Marketing', key: 'M'}, 
        {name: 'Production', key: 'P'}, 
        {name: 'Disabled', key: 'R'}];
    const [checked, setChecked] = React.useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = React.useState<any>(categories.slice(1,3));

    const onCategoryChange = (e: { value: any, checked: boolean }) => {
        let _selectedCategories = [...selectedCategories];

        if (e.checked) {
            _selectedCategories.push(e.value);
        }
        else {
            for (let i = 0; i < _selectedCategories.length; i++) {
                const selectedCategory = _selectedCategories[i];

                if (selectedCategory.key === e.value.key) {
                    _selectedCategories.splice(i, 1);
                    break;
                }
            }
        }

        setSelectedCategories(_selectedCategories);
    }

    return(
    <BasePage>
        <h3>Basic</h3>
        <div className='field-checkbox'>
            <Checkbox inputId='binary' checked={checked} onChange={e => setChecked(e.checked)} />
            <label htmlFor='binary'>Remember Me</label>
        </div>

        <div className='field-checkbox'>
            <Checkbox inputId='binary' checked={checked} disabled />
            <label htmlFor='binary'>disabled</label>
        </div>

        {
            categories.map((category) => {
                return (
                    <div key={category.key} className='field-checkbox'>
                        <Checkbox inputId={category.key} name='category' value={category} onChange={onCategoryChange} 
                        checked={selectedCategories.some((item:any) => item.key === category.key)} disabled={category.key === 'R'} />
                        <label htmlFor={category.key}>{category.name}</label>
                    </div>
                )
            })
        }
    </BasePage>)
}
export default CheckboxGuide;`}/>
    </BasePage>)
}
export default CheckboxGuide;