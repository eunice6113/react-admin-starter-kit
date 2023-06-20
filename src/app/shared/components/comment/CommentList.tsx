import moment from 'moment';
import { Button, confirmDialog } from 'primereact';
import * as React from 'react';
import { getIsAdmin, getUserInfo } from '../../../core/services/base/base-api.service';
import { useAddRpcmPostMutation, useDeleteRpcmPostMutation, useGetRpcmPostsQuery, useUpdateRpcmPostMutation } from '../../../core/services/rpcm.service';
import Comment from './Comment';
import { updateItemInListReturn } from '../../utils/com-utils';
import CommentRegister from './CommentRegister';

interface IProps {
    cmnyNo: any;
    efttEvntNo: any;
    wrtnEmn: any;
    title: any;
    afterRegister?: any; 
    afterSearch?:any;
    isRegister: any;
    research?: any;
}


const CommentList: React.FC<IProps> = ({cmnyNo, wrtnEmn, efttEvntNo, title, afterRegister, afterSearch, isRegister, research}) => {

    const [addRpcmPost] = useAddRpcmPostMutation();
    const [updateRpcmPost] = useUpdateRpcmPostMutation();
    const [deleteRpcmPost] = useDeleteRpcmPostMutation();

    const [visible, setVisible] = React.useState(false);
    const [commentCnt, setCommentCnt] = React.useState(3);
    const [totalCommentCnt, setTotalCommentCnt] = React.useState(0);
    const [rpcmConVal, setRpcmConVal] = React.useState('');
    const [moreCommentLen, setMoreCommentLen] = React.useState(0)

    let userData = JSON.parse(getUserInfo())
    let emn = userData ? userData.emn : '-'
    let isAdmin = getIsAdmin()
    let boardWrtnEmn = wrtnEmn

    const [comments, setComments] = React.useState([])

    const { data:posts, refetch } = useGetRpcmPostsQuery( {cmnyNo : cmnyNo, efttEvntNo : efttEvntNo} )

    const getUserNm = (krnBrm:any, wrtnEmm:any, mngrYn:any) => {
        let userNm = krnBrm+' '+wrtnEmm

        if(mngrYn == 'Y'){
            userNm += ' (관리자)'
        }else if(boardWrtnEmn === wrtnEmn){
            userNm += ' (작성자)'
        } 

        return userNm
    }

    React.useEffect(() => {
    
        if(posts) {
            let response:any = posts
            let commentData = response

            setTotalCommentCnt(commentData.length)
            setCommentCnt(3)

            //rows 데이터 배열 초기화
            setComments([])
            //데이터 읽어와서 필요한 데이터만 골라서 테이블 배열에 추가
            commentData.map(({cmnyNo, rpcmNo, efttEvntNo, rpcmCon, wrtnEmn, wrtnEmm,wrtnTs, mngrYn, prwgYn, krnBrm}) => {
                const userNm = getUserNm(krnBrm, wrtnEmm, mngrYn)
                let isDel = false
                let isEdit = false
                let isMine = false

                if(wrtnEmn == emn){
                    isMine = true

                    if(prwgYn != 'Y'){
                        isEdit = true
                    }
                }
                
                if(isAdmin) isDel = true

                let obj = {
                    id: rpcmNo,
                    mode: 'view',
                    prwgYn: prwgYn,
                    deletable: isDel,
                    editable: isEdit,
                    showProfile: true,
                    userName:userNm,
                    originValue: rpcmCon,
                    value: rpcmCon,
                    date: moment(wrtnTs, 'YYYYMMDDHHmmss').format('YYYY.MM.DD HH:mm:ss'),
                    isMine: isMine,
                };

                //rows 데이터 업데이트
                setComments((prev) => (
                    [...prev, obj]
                ))
            })  

            if(afterSearch){
                afterSearch(commentData)
            }
            
        }
    }, [posts]);

    //댓글 재조회
    React.useEffect(() => {
        if(research){
            refetch()
        }
    }, [research])
    
    React.useEffect(() => {
        setTotalCommentCnt(comments.length)

        setMoreCommentLen(comments.length - commentCnt)

        if(comments.length > 3){
            setVisible(true)
        }else{
            setVisible(false)
        }

        // setComments(comments)

        console.log('commentData=>', comments)

    }, [comments])

    React.useEffect(() => {
        // alert('멀까,,,?')
        refetch()
    }, [cmnyNo]) 


    let updateItem:any

    const moreComment = () => {
        setVisible(false)

        setCommentCnt(totalCommentCnt)
    }

    //댓글 수정 버튼
    const editRpcm = (e:Event, id:any ) => {
        console.log('수정', id)

        //댓글 목록의 해당 댓글 모드를 edit 로 바꾼다
        updateItem = updateItemInListReturn(id, 'mode', 'edit', comments)

        setComments(updateItem)
        console.log('updateItem2', updateItem)
    }

    //댓글 취소
    const cancel = (e:Event,id:any, value:any) => {
        console.log('취소', id)

        // console.log('comments=>',comments)
        updateItem = updateItemInListReturn(id, 'value', value, comments)

        //댓글 목록의 해당 댓글 모드를 view 로 바꾼다
        updateItem = updateItemInListReturn(id, 'mode', 'view', updateItem)

        setComments(updateItem)
    }


    //댓글 내용 수정
    const editValue = ( e:any, id:any ) => {
        console.log('댓글 내용 수정', id, e.target.value)

        updateItem = updateItemInListReturn(id, 'value', e.target.value, comments)

        setComments(updateItem)
        //댓글 목록의 해당 댓글 값을 업데이트한다
        // updateItemInList(id, 'value', e.target.value, comments, setComments)
    }


    //(하나만 있는) 댓글 등록
    const registerComment = async () => {
        console.log('등록')

        if(rpcmConVal.trim().length == 0){
            confirmDialog({
                message: '댓글을 입력해주세요.',
                className: 'noHeader oneButton',
                acceptLabel: '확인',
                accept: ()=> {},
            })   

            return false
        }

        const values = {
            cmnyNo : cmnyNo,
            efttEvntNo : efttEvntNo,
            rpcmCon : rpcmConVal,
            wrtnEmn: emn
        }
        
        addRpcmPost(values).unwrap()
        .then(( response:any ) => {
            console.log('addRpcmPost response =>', response)

            if(response) {
                confirmDialog({
                    message: '댓글이 등록되었습니다.',
                    className: 'noHeader oneButton',
                    acceptLabel: '확인',
                    accept: ()=> { 
                        setRpcmConVal('')
                
                        //댓글 목록 재조회
                        refetch()     

                        if(afterRegister){
                            afterRegister(response)
                        }

                    },
                })          
            }
        })
        .catch((error) => console.error('rejected', error))    
    }

    //댓글 등록
    const register = (e:Event, id:any, value:any ) => {
        // console.log('등록', id)
        
        if(value.trim().length == 0){
            confirmDialog({
                message: '댓글을 입력해주세요.',
                className: 'noHeader oneButton',
                acceptLabel: '확인',
                accept: ()=> {},
            })   

            return false
        }

        const values = {
            rpcmNo: id,
            cmnyNo : cmnyNo,
            rpcmCon : value,
            wrtnEmn : emn
        }

        updateRpcmPost(values).unwrap()
        .then(( response:any ) => {
            console.log('updatePost response =>',response)

            if(response) {
                confirmDialog({
                    message: '댓글이 수정되었습니다.',
                    className: 'noHeader oneButton',
                    acceptLabel: '확인',
                    accept: ()=> { 
                        //댓글 목록 재조회
                        refetch()  
                    },
                })               

            }
        }).catch((error) => console.error('rejected', error))
    }

    //댓글 삭제
    const deleteFunc = (e:Event, id : any, prwgYn : any) => {
        let delMessage = '댓글을 삭제하시겠습니까?'

        if(prwgYn === 'Y'){ //이벤트에서 당첨 댓글일 경우
            delMessage = '요청하신 댓글의 작성자는 실시간 이벤트 당첨 팝업을 확인한 사용자입니다. 삭제 시 민원의 소지가 있을 수 있습니다. 삭제하시겠습니까?'
        }

        confirmDialog({
            message: delMessage,
            className: 'noHeader',
            acceptLabel: '확인',
            rejectLabel: "취소",
            accept: ()=> { 
                deleteRpcmPost({rpcmNo : id}).unwrap()
                .then(( response:any ) => {
                    confirmDialog({
                        message: '댓글이 삭제되었습니다.',
                        className: 'noHeader oneButton',
                        acceptLabel: '확인',
                        accept: ()=> { 
                            //댓글 목록 재조회
                            refetch()
                            },
                    })
                })
                .catch((error) => console.error('rejected', error))
        },
            reject: () => { console.log('reject hello')}
        })
        
    }

    return(
        <>
        {
            isRegister &&         
                <CommentRegister 
                    title={title}
                    total={totalCommentCnt+''}
                    value={rpcmConVal}
                    setValue={setRpcmConVal}
                    register={registerComment}
                />
        }

        {
            comments?.filter((t,idx,array) => idx < commentCnt)?.map((item, index) =>{
                return (
                    <Comment 
                    key={'comm'+index}
                    id={item.id}
                    deletable={item.deletable}
                    editable={item.editable}
                    showProfile={item.showProfile}
                    userName={item.userName} 
                    originValue = {item.value}
                    value={item.value}
                    setValue={(e:Event) => editValue(e, item.id)}
                    date={item.date}
                    mode={item.mode}
                    edit={(e:Event) => editRpcm(e, item.id)}
                    delt={(e:Event) => deleteFunc(e, item.id, item.prwgYn)}
                    register={(e:Event) => register(e, item.id, item.value)}
                    cancel={(e:Event) => cancel(e, item.id, item.originValue)}
                    isMine={item.isMine}
                />
                )
            })
        }

        <Button onClick={moreComment} label={`더보기 ${moreCommentLen}댓글`} className='more p-button-text' icon='pi pi-angle-down' iconPos="right" visible={visible}/>
        </>
    )
}
export default CommentList;