import * as React from 'react';
import { InputNumber, InputText, InputTextarea } from 'primereact';
import { BasePage } from '../../shared/components/base/BasePage';
import ClipboardCopy from '../../shared/components/clipboard-copy/ClipboardCopy';
import TextEditor from '../../shared/components/text-editor/TextEditor';
import './ui-guide.css';

const InputGuide: React.FC = () => {

    const [order, setOrder] = React.useState<any>(null);
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    return(
    <BasePage>
        <div className='previewBox'>
            <h3>Basic</h3>
            <InputText placeholder='제목을 입력해주세요' value={title} onChange={(e) => setTitle(e.target.value)} />

            <h3>Textarea</h3>
            <InputTextarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} cols={30} />

            <h3>숫자</h3>
            <InputNumber className='orderNm' inputId='integeronly' value={order} onValueChange={(e) => setOrder(e.value)} />
        
            <h3>텍스트 에디터</h3>
            <TextEditor value={content} onTextChange={setContent} />
        </div>

        <ClipboardCopy rows={29} copyText={`
import * as React from 'react';
import { InputNumber, InputText, InputTextarea } from 'primereact';
import { BasePage } from '../../shared/components/base/BasePage';
import TextEditor from '../../shared/components/text-editor/TextEditor';

const InputGuide: React.FC = () => {

    const [order, setOrder] = React.useState<any>(null);
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    return(
    <BasePage>
        <h3>Basic</h3>
        <InputText placeholder='제목을 입력해주세요' value={title} onChange={(e) => setTitle(e.target.value)} />

        <h3>Textarea</h3>
        <InputTextarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} cols={30} />

        <h3>숫자</h3>
        <InputNumber className='orderNm' inputId='integeronly' value={order} onValueChange={(e) => setOrder(e.value)} />
    
        <h3>텍스트 에디터</h3>
        <TextEditor value={content} onTextChange={setContent} />
    </BasePage>)
}
export default InputGuide;`} />
        
    </BasePage>)
}
export default InputGuide;