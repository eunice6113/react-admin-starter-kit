import * as React from 'react';
import { Button } from 'primereact';
import { BasePage } from '../../shared/components/base/BasePage';
import ClipboardCopy from '../../shared/components/clipboard-copy/ClipboardCopy';
import './ui-guide.css';

const ButtonGuide: React.FC = () => {

    const handleClick = () => {
        alert('Button Click!')
    }
    
    return(
    <BasePage className='buttonGuide'>
        <div className='previewBox'>
            <h3>Primary</h3>
            <Button label='조회' onClick={handleClick} />
            <Button label='조회' onClick={handleClick} disabled />
            <Button label='조회' onClick={handleClick} icon='pi pi-refresh' />

            <h3>Secondary</h3>
            <Button className='secondary' label='조회' onClick={handleClick} />
            <Button className='secondary' label='조회' onClick={handleClick} disabled />
            <Button className='secondary' label='조회' onClick={handleClick} icon='pi pi-refresh' />

            <h3>Outline</h3>
            <Button className='outline' label='조회' onClick={handleClick} />
            <Button className='outline' label='조회' onClick={handleClick} disabled />
            <Button className='outline' label='조회' onClick={handleClick} icon='pi pi-refresh' />

            <h3>Size</h3>
            <Button className='xxl' onClick={handleClick}>xxl 사이즈</Button>
            <br/>
            <br/>
            <Button className='xl' onClick={handleClick}>xl 사이즈</Button>
            <br/>
            <br/>
            <Button className='lg' onClick={handleClick}>lg 사이즈</Button>
            <br/>
            <br/>
            <Button className='md' onClick={handleClick}>md 사이즈</Button>
            <br/>
            <br/>
            <Button className='sm' onClick={handleClick}>sm 사이즈</Button>
        </div>

        <ClipboardCopy rows={38} copyText={`
import * as React from 'react';
import { Button } from 'primereact';
import { BasePage } from '../../shared/components/base/BasePage';

const ButtonGuide: React.FC = () => {

    const handleClick = () => {
        alert('Button Click!')
    }
    
    return(
    <BasePage>
        <h3>Primary</h3>
        <Button label='조회' onClick={handleClick} />
        <Button label='조회' onClick={handleClick} disabled />
        <Button label='조회' onClick={handleClick} icon='pi pi-refresh' />

        <h3>Secondary</h3>
        <Button className='secondary' label='조회' onClick={handleClick} />
        <Button className='secondary' label='조회' onClick={handleClick} disabled />
        <Button className='secondary' label='조회' onClick={handleClick} icon='pi pi-refresh' />

        <h3>Outline</h3>
        <Button className='outline' label='조회' onClick={handleClick} />
        <Button className='outline' label='조회' onClick={handleClick} disabled />
        <Button className='outline' label='조회' onClick={handleClick} icon='pi pi-refresh' />

        <h3>Size</h3>
        <Button className='xxl' onClick={handleClick}>xxl 사이즈</Button>
        <Button className='xl' onClick={handleClick}>xl 사이즈</Button>
        <Button className='lg' onClick={handleClick}>lg 사이즈</Button>
        <Button className='md' onClick={handleClick}>md 사이즈</Button>
        <Button className='sm' onClick={handleClick}>sm 사이즈</Button>
    </BasePage>)
}
export default ButtonGuide;`} />
    </BasePage>)
}
export default ButtonGuide;