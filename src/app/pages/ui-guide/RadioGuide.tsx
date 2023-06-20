import * as React from 'react';
import { RadioButton } from 'primereact';
import { BasePage } from '../../shared/components/base/BasePage';
import ClipboardCopy from '../../shared/components/clipboard-copy/ClipboardCopy';
import './ui-guide.css';

const RadioGuide: React.FC = () => {

    const [city, setCity] = React.useState(null);
    const categories = [
        {name: '노출', key: 'Y'}, 
        {name: '비노출', key: 'N'}];
    const [selectedCategory, setSelectedCategory] = React.useState(categories[1]);

    return(
    <BasePage>
        <div className='previewBox'>
            <h3>Basic</h3>
            <div className='field-radiobutton'>
                <RadioButton inputId='city1' name='city' value='Chicago' onChange={(e) => setCity(e.value)} checked={city === 'Chicago'} />
                <label htmlFor='city1'>Chicago</label>
            </div>
            <div className='field-radiobutton'>
                <RadioButton inputId='city2' name='city' value='Chicago' 
                onChange={(e) => setCity(e.value)} checked={city === 'Chicago'} disabled />
                <label htmlFor='city2'>Chicago</label>
            </div>

            <h3>Horizontal</h3>
            {
                categories.map((category) => (
                    <span key={category.key} className='field-radiobutton mr20'>
                        <RadioButton inputId={category.key} name='category' value={category} onChange={(e) => setSelectedCategory(e.value)} checked={selectedCategory.key === category.key} disabled={category.key === 'R'} />
                        <label htmlFor={category.key}>{category.name}</label>
                    </span>
                ))
            }
        </div>

        <ClipboardCopy rows={40} copyText={`
import * as React from 'react';
import { RadioButton } from 'primereact';
import { BasePage } from '../../shared/components/base/BasePage';

const RadioGuide: React.FC = () => {

    const [city, setCity] = React.useState(null);
    const categories = [
        {name: '노출', key: 'Y'}, 
        {name: '비노출', key: 'N'}];
    const [selectedCategory, setSelectedCategory] = React.useState(categories[1]);

    return(
    <BasePage>
        <h3>Basic</h3>
        <div className='field-radiobutton'>
            <RadioButton inputId='city1' name='city' value='Chicago' onChange={(e) => setCity(e.value)} checked={city === 'Chicago'} />
            <label htmlFor='city1'>Chicago</label>
        </div>
        <div className='field-radiobutton'>
            <RadioButton inputId='city2' name='city' value='Chicago' 
            onChange={(e) => setCity(e.value)} checked={city === 'Chicago'} disabled />
            <label htmlFor='city2'>Chicago</label>
        </div>

        <h3>Horizontal</h3>
        {
            categories.map((category) => (
                <span key={category.key} className='field-radiobutton mr20'>
                    <RadioButton inputId={category.key} name='category' value={category} onChange={(e) => setSelectedCategory(e.value)} checked={selectedCategory.key === category.key} disabled={category.key === 'R'} />
                    <label htmlFor={category.key}>{category.name}</label>
                </span>
            ))
        }
    </BasePage>)
}
export default RadioGuide;`} />
    </BasePage>)
}
export default RadioGuide;