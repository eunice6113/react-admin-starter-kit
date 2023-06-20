import { Editor } from 'primereact';
import * as React from 'react';
import './text-editor.css';

interface IProps {
    value: string;
    onTextChange: Function;
    name?:string;
    className?:string;
}

const TextEditor:React.FC<IProps> = ({name,className,value, onTextChange}) => {

    const renderHeader = () => {
        return (
        <div id="standalone-container">
            <div id="toolbar-container">
                <span className="ql-formats">
                    <select className="ql-font" defaultValue="sansserif">
                        <option value="roboto">NotoSansKR</option>
                    </select>
                    <select className="ql-size" defaultValue="default">
                        <option value="small">작게</option>
                        <option value="default">보통</option>
                        <option value="large">크게</option>
                        <option value="huge">아주 크게</option>
                    </select>
                </span>
                <span className="ql-formats">
                    <button className="ql-bold"></button>
                    <button className="ql-italic"></button>
                    <button className="ql-underline"></button>
                    <button className="ql-strike"></button>
                </span>
                <span className="ql-formats">
                    <select className="ql-color"></select>
                    <select className="ql-background"></select>
                </span>
                <span className="ql-formats">
                    <button className="ql-blockquote"></button>
                    <button className="ql-code-block"></button>
                    <button className="ql-link"></button>
                </span>
                <span className="ql-formats">
                    <button className="ql-header" value="1"></button>
                    <button className="ql-header" value="2"></button>
                </span>
                <span className="ql-formats">
                    <button className="ql-list" value="ordered"></button>
                    <button className="ql-list" value="bullet"></button>
                    <button className="ql-indent" value="-1"></button>
                    <button className="ql-indent" value="+1"></button>
                </span>
                <span className="ql-formats">
                    <button className="ql-direction" value="rtl"></button>
                    <select className="ql-align"></select>
                </span>
                {/* <span className="ql-formats">
                    <button className="ql-script" value="sub"></button>
                    <button className="ql-script" value="super"></button>
                </span> */}
                <span className="ql-formats">
                    <button className="ql-clean"></button>
                </span>
            </div>
        </div>
        )
    }

    const header = renderHeader()

    return (
        <Editor 
            style={{height:'320px'}} 
            headerTemplate={header}
            value={value} 
            name={name}
            className={className}
            onTextChange={(e) => onTextChange(e)} />
    )
}
export default TextEditor;