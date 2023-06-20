import * as React from 'react';
import { BasePage } from '../../shared/components/base/BasePage';
import ClipboardCopy from '../../shared/components/clipboard-copy/ClipboardCopy';
import './ui-guide.css';

const LayoutGuide: React.FC = () => {

    return(
    <BasePage>
        <div className='previewBox'>
            <h3 className='mb30'>레이아웃 row</h3>
            <div className='cld-row'>
                <div className='cld-col-2 bgcolor-light-gray'>cld-col-2</div>
                <div className='cld-col-2 bgcolor-skyblue'>cld-col-2</div>
                <div className='cld-col-2 bgcolor-light-gray'>cld-col-2</div>
                <div className='cld-col-2 bgcolor-skyblue'>cld-col-2</div>
                <div className='cld-col-2 bgcolor-light-gray'>cld-col-2</div>
                <div className='cld-col-2 bgcolor-skyblue'>cld-col-2</div>
            </div>
            <div className='cld-row'>
                <div className='cld-col-3 bgcolor-light-gray'>cld-col-3</div>
                <div className='cld-col-3 bgcolor-mid-gray'>cld-col-3</div>
                <div className='cld-col-3 bgcolor-skyblue'>cld-col-3</div>
                <div className='cld-col-3 bgcolor-mid-gray'>cld-col-3</div>
            </div>
            <div className='cld-row'>
                <div className='cld-col-4 bgcolor-light-gray'>cld-col-4</div>
                <div className='cld-col-4 bgcolor-skyblue'>cld-col-4</div>
                <div className='cld-col-4 bgcolor-mid-gray'>cld-col-4</div>
            </div>
            <div className='cld-row'>
                <div className='cld-col-6 bgcolor-light-gray'>cld-col-6</div>
                <div className='cld-col-6 bgcolor-skyblue'>cld-col-6</div>
            </div>
        </div>

        <ClipboardCopy rows={38} copyText={`
import * as React from 'react';
import { BasePage } from '../../shared/components/base/BasePage';
import ClipboardCopy from '../../shared/components/clipboard-copy/ClipboardCopy';
import './ui-guide.css';

const LayoutGuide: React.FC = () => {

    return(
    <BasePage>
        <h3 className='mb30'>레이아웃 cld-row</h3>
        <div className='cld-row'>
            <div className='cld-col-2 bgcolor-light-gray'>cld-col-2</div>
            <div className='cld-col-2 bgcolor-skyblue'>cld-col-2</div>
            <div className='cld-col-2 bgcolor-light-gray'>cld-col-2</div>
            <div className='cld-col-2 bgcolor-skyblue'>cld-col-2</div>
            <div className='cld-col-2 bgcolor-light-gray'>cld-col-2</div>
            <div className='cld-col-2 bgcolor-skyblue'>cld-col-2</div>
        </div>
        <div className='cld-row'>
            <div className='cld-col-3 bgcolor-light-gray'>cld-col-3</div>
            <div className='cld-col-3 bgcolor-mid-gray'>cld-col-3</div>
            <div className='cld-col-3 bgcolor-skyblue'>cld-col-3</div>
            <div className='cld-col-3 bgcolor-mid-gray'>cld-col-3</div>
        </div>
        <div className='cld-row'>
            <div className='cld-col-4 bgcolor-light-gray'>cld-col-4</div>
            <div className='cld-col-4 bgcolor-skyblue'>cld-col-4</div>
            <div className='cld-col-4 bgcolor-mid-gray'>cld-col-4</div>
        </div>
        <div className='cld-row'>
            <div className='cld-col-6 bgcolor-light-gray'>cld-col-6</div>
            <div className='cld-col-6 bgcolor-skyblue'>cld-col-6</div>
        </div>
    </BasePage>)
}
export default LayoutGuide;`} />
    </BasePage>)
}
export default LayoutGuide;