import { Button, confirmDialog } from 'primereact';
import * as React from 'react';
import { BasePage } from '../../shared/components/base/BasePage';
import ClipboardCopy from '../../shared/components/clipboard-copy/ClipboardCopy';
import './ui-guide.css';

const SelectGuide: React.FC = () => {

    //제목이 있는 팝업
    const showTitlePopup = () => {
        confirmDialog({
            header: '제목',
            message: '내용',
            rejectLabel: '취소',
            acceptLabel: '확인',
            accept: () => {},
            reject: () => {}
        })
    }

    //제목이 없는 팝업
    const showNoTitlePopup = () => {
        confirmDialog({
            message: '내용',
            rejectLabel: '취소',
            acceptLabel: '확인',
            className: 'noHeader',
            accept: () => {},
            reject: () => {}
        })
    }

    //확인 버튼만 있는 팝업
    const showAlertDialog = () => {
        confirmDialog({
            message: '내용',
            acceptLabel: '확인',
            className: 'noHeader oneButton',
            accept: () => {},
        })
    }

    return(
    <BasePage>
        <div className='previewBox'>
            <Button label='제목이 있는 팝업' onClick={showTitlePopup} />
            <br/>
            <br/>
            <Button label='제목이 없는 팝업' onClick={showNoTitlePopup} />
            <br/>
            <br/>
            <Button label='확인 버튼만 있는 팝업' onClick={showAlertDialog} />
        </div>
        <ClipboardCopy rows={50} copyText={`
import * as React from 'react';
import { Button, confirmDialog } from 'primereact';
import { BasePage } from '../../shared/components/base/BasePage';

const SelectGuide: React.FC = () => {

    //제목이 있는 팝업
    const showTitlePopup = () => {
        confirmDialog({
            header: '제목',
            message: '내용',
            rejectLabel: '취소',
            acceptLabel: '확인',
            accept: () => {},
            reject: () => {}
        })
    }

    //제목이 없는 팝업
    const showNoTitlePopup = () => {
        confirmDialog({
            message: '내용',
            rejectLabel: '취소',
            acceptLabel: '확인',
            className: 'noHeader',
            accept: () => {},
            reject: () => {}
        })
    }

    //확인 버튼만 있는 팝업
    const showAlertDialog = () => {
        confirmDialog({
            message: '내용',
            acceptLabel: '확인',
            className: 'noHeader oneButton',
            accept: () => {},
        })
    }

    return(
    <BasePage>
        <Button label='제목이 있는 팝업' onClick={showTitlePopup} />
        <Button label='제목이 없는 팝업' onClick={showNoTitlePopup} />
        <Button label='확인 버튼만 있는 팝업' onClick={showAlertDialog} />
    </BasePage>)
}
export default SelectGuide; `} />
    </BasePage>)
}
export default SelectGuide;