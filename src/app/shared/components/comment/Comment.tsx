import * as React from 'react';
import { Button, InputTextarea } from 'primereact';
import { IComment } from '../../../core/models/i-comment';
import './comment.css';

//댓글 상세/수정
const Comment:React.FC<IComment> = ({
    id, 
    editable = false, 
    deletable = false,
    showProfile = true, 
    userName, 
    date, 
    mode = 'view',
    originValue,
    value, 
    setValue, 
    register, 
    cancel,
    edit, 
    delt,
    isMine = false,
}) => {
   
    console.log('Comment id =>', id)

    //등록
    const _register = () => {
        register && register()
    }

    
    //취소
    const _cancel = () => {
        cancel && cancel()
    }

    //수정
    const _edit = () => {
        edit && edit()
    }

    //삭제
    const _delt = () => {
        delt && delt()
    }


    return (
        <div className={`comment ${isMine ? 'myComment':''}`}> {/* myComment Class 추가 하시면 됩니다.*/}
            <div className='commentContents'>
                {showProfile && 
                <div>
                    <span className='profile'>
                        <i className='pi pi-user'></i>
                    </span>
                    <span className='profileName ml8'>{userName}</span>
                </div>
                }
                <div className='content mt8 mb8'>
                    {
                        mode === 'edit' ?
                        <>
                            <InputTextarea value={value} 
                                           onChange={setValue}
                                        //    onChange={(e) => setValue(e.target.value)} 
                                           rows={5} cols={30}
                                           maxLength={2000}
                                           />
                            <div className='d-flex'> 
                                <small className='chkMaxLen ml-auto'>{value.length}/{2000}</small>
                            </div>
                            <div className='btn-container mt4'>
                                <Button className='ml-auto outline' onClick={_cancel}>취소</Button>
                                <Button className='ml10' onClick={_register}>저장</Button>
                            </div>
                        </>
                        :
                        value
                    }
                </div>
                {
                    //댓글 등록 날짜
                    mode === 'view' && <p className='date'>{date}</p>
                }
            </div>
            
            {
                mode === 'view' && 
                <div className='ml8'>
                    {/* 수정 아이콘 버튼 */}
                    {editable && 
                    <Button onClick={_edit} className='iconBtn p-button-text' icon='pi pi-file-edit' />}

                    {/* 삭제 아이콘 버튼 */}
                    {deletable && 
                    <Button onClick={_delt} className='iconBtn p-button-text' icon='pi pi-trash' />}
                </div>
            }
        </div>
    )
}
export default Comment;