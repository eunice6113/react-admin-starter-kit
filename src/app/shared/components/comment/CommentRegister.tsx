import * as React from 'react';
import { Button, InputTextarea } from 'primereact';
import commentIcon from '../../../../../assets/icons/ico-comment.svg';

interface IProps {
    title: string;
    total: string;
    value: string;
    setValue: any;
    register: Function;
}

const CommentRegister:React.FC<IProps> = ({
    title, 
    total, 
    value, 
    setValue, 
    register
}) => {
    
    //등록
    const _register = () => {
        register();
    }


    return (
        <div>
            <p className='title'>
                <img src={commentIcon} alt='' /><span className='titleTxt'>{title}</span><span className='total gray'>(글 댓글 {total})</span>
            </p>
            <div className='commentRegist mb20'>
                <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} maxLength={2000}/>
                <div className='d-flex'> 
                    <small className='chkMaxLen ml-auto'>{value.length}/{2000}</small>
                </div>
                <div className='btn-container mt4'>
                    <Button className='ml-auto' onClick={_register}>등록</Button>
                </div>
            </div>
        </div>
    )
}
export default CommentRegister;