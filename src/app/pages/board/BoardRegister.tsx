import * as React from 'react';
import { confirmDialog, Dropdown, Button, InputText, RadioButton } from 'primereact';
import { BasePage } from '../../shared/components/base/BasePage';
import ViewButtonsTemplate from '../../shared/components/template/ViewButtonsTemplate';
import ViewTemplate from '../../shared/components/template/ViewTemplate';
import useBasePage from '../../shared/hooks/base-page.hook';
import { CommonUtils } from '../../shared/utils/commonUtils';
import { useGetCodeList } from '../../shared/hooks/get-code.hook';
import { useFormik } from "formik";
import * as Yup from 'yup';
import {useAddNtcPostMutation , } from '../../core/services/ntc.service';
import {useDeleteAtchMutation , } from '../../core/services/atch.service';
import CldFileUpload from '../../shared/components/CldFileUpload';
import TextEditor from '../../shared/components/text-editor/TextEditor';

const BoardRegister:React.FC = () => {
    const { goPage, commonCode, commonMsg} = useBasePage()

    //등록
    const [addPost, ] = useAddNtcPostMutation()
    //첨부파일 삭제
    const [delAtch, ] = useDeleteAtchMutation()

    const BLBR_DCD = commonCode.BLBR_DCD_NTC;   //게시판구분코드(10:공지사항)
    const BLBR_TCD = useGetCodeList("P2837600");   //게시판유형코드(BLBR_TCD)
    const [cldPotlBlbrTcd,setCldPotlBlbrTcd] =  React.useState([])  //게시판유형코드 필터된값

    const [mode] = React.useState<'view' | 'edit' | 'register'>('register');

    const [atchNoVal, setAtchNoVal] = React.useState('');
    const [atchDetail,setAtchDetail] =  React.useState([])  //첨부파일

    const [fileTempCnt,setFileTempCnt] =  React.useState(0)  //첨부파일

    //dir : 파일업로드 경로(gnrl:일반, imln:이미지링크, chls:체크리스트, apfr:신청서)
    let uploadUrl = commonCode.FILE_UPLOAD_URL+`?dir=gnrl&inAtchNo=${atchNoVal}`
    
    const categories = [    //중요공지여부
        {name: '노출', key: 'Y'}, 
        {name: '비노출', key: 'N'}];
    const [selectedCategory, setSelectedCategory] = React.useState(categories[1]);
    
    React.useEffect(()=> {

        // 게시판유형 filter '10'공지사항에 해당하는것만 노출
        const cldPotlBlbrTcdVal = BLBR_TCD.filter((t) => t.value.substring(0,2) == BLBR_DCD)
        setCldPotlBlbrTcd(cldPotlBlbrTcdVal)                
        
        setInitValues({...initValues,cldPotlBlbrTcd:cldPotlBlbrTcdVal[0]?.value})

    },[BLBR_TCD]) //<-여기를 [] 빈 배열로 놓아야 초기 한 번만 실행됨
    

    React.useEffect(()=> {

        formik.values.cldPotlAddif = [{cldPotlAddifTcd:commonCode.ADDIF_TCD_IMPN_PBNT_YN,   //중요공지여부
        addifCon:selectedCategory.key}];
        
    },[selectedCategory]) //<-여기를 [] 빈 배열로 놓아야 초기 한 번만 실행됨
    
    React.useEffect(()=> {
        formik.values.fileTempCnt = fileTempCnt ;
        formik.setFieldValue('fileTempCnt',fileTempCnt)
    }, [fileTempCnt]) 

    // ** initvalues key값과 input name이 일치해야 formik이 동작합니다! ** 
    const [initValues, setInitValues] = React.useState({
        cldPotlBlbrDcd: BLBR_DCD,
        cldPotlBlbrTcd: '',
        blbrTtlNm:  '',
        atchNo: '',
        blbrInqNbi:0,
        blbrCon: '',
        cldPotlAddif: [{cldPotlAddifTcd:commonCode.ADDIF_TCD_IMPN_PBNT_YN,   //중요공지여부
        addifCon:selectedCategory.key}],
        fileTempCnt:0,
    });

    const formik = useFormik({
        //초기 value
        initialValues: initValues,
        enableReinitialize: true,
        //validation check
        validate: (values) => {
            let errors = {}

            if(values.blbrCon.length > 0){
                 const blbrCon = values.blbrCon.replace(/(<([^>]+)>)/gi, '').trim()
                 
                 if(blbrCon.length == 0){
                     errors = {...errors, blbrCon : commonMsg.COM_ERR_MSG_001}
                 }
             }
     
             return errors
        },
        validationSchema: Yup.object({
            cldPotlBlbrTcd: Yup.string().trim()
            .required(commonMsg.COM_ERR_MSG_001),
            blbrTtlNm: Yup.string().trim()
            .required(commonMsg.COM_ERR_MSG_001)
            .max(200,'200'+commonMsg.COM_ERR_MSG_003),
            blbrCon: Yup.string().trim()
            .required(commonMsg.COM_ERR_MSG_001)
            .nullable(),
            fileTempCnt: Yup.number()
            .max(0, '파일이 업로드되지 않았습니다. 상단의 업로드 버튼 클릭 또는 파일삭제 후 진행해 주세요.'),
        }),
        onSubmit: values => {      
            if(atchDetail.length < 1){
                values.atchNo = '';
            }

            addPost(values).unwrap()
            .then(( response:any ) => {
                console.log('addPost response =>', response)

                if(response) {
                    confirmDialog({
                        message: '공지사항이 등록되었습니다.',
                        className: 'noHeader oneButton',
                        acceptLabel: '확인',
                        accept: () => {
                            goPage('/board/list');
                        },
                    })
                }
            })
            .catch((error) => console.error('rejected', error)) 
        }
    })

    const UploadAfter = (event) => {

        let atchData = JSON.parse(event.xhr.response);
        let resAtchNo = atchData.response.atchNo;
        let resAtchList = atchData.response.atchDetail;

        //첨부파일번호set
        setAtchNoVal(resAtchNo);
        formik.setFieldValue('atchNo',resAtchNo)

        if(atchDetail){
            setAtchDetail(atchDetail.concat(resAtchList));
        }else{
            setAtchDetail(resAtchList);     
        }
    }

    const DelFile = (condition) => {
    
        delAtch(condition).unwrap()
        .then(( response:any ) => {
                setAtchDetail(atchDetail.filter((t) => t.atchSrn !== condition.atchSrn))
        })
        .catch((error) => console.error('rejected', error))
    }

    const list = () => {
        if(!CommonUtils.isDeepEqual(initValues,formik.values)){
            confirmDialog({
                message: '등록/수정 내용이 있습니다.\n목록으로 이동 시 내용이 삭제됩니다.\n이동하시겠습니까?',
                className: 'noHeader',
                accept: ()=> { 
                    goPage('/board/list')
                },
                reject: () => { }
            })
        }else{
            goPage('/board/list');
        } 
   }

    const cancel = () => {
        goPage('/board/list');
    }
    const iff = (condition, then, otherwise) => condition? then : otherwise;
   
    const isFormikError = (name: any) => {
        return  Boolean(formik.touched[name] && formik.errors[name])
    }
    const contents2 = {
        title: '등록 내용',
        mode: mode,
        hasRequired: true,
        rows: [
            {
                cols: [
                {
                    required: true,
                    key: '구분', 
                    error: isFormikError('cldPotlBlbrTcd'),
                    helperText: formik.errors.cldPotlBlbrTcd,
                    editingValue: <Dropdown name='cldPotlBlbrTcd'
                                            id='cldPotlBlbrTcd'
                                            value={formik.values.cldPotlBlbrTcd} 
                                            options={cldPotlBlbrTcd} 
                                            onChange={formik.handleChange}  
                                            optionLabel="name" 
                                            placeholder="전체"/>
                },
                ]
            },
            {
                cols: [
                {
                    required: true,
                    key: '제목', 
                    error: isFormikError('blbrTtlNm'),
                    helperText: formik.errors.blbrTtlNm,
                    editingValue: <InputText className={iff(isFormikError('blbrTtlNm'), 'p-invalid' , '')}
                                            placeholder="제목을 입력해주세요" 
                                            id='blbrTtlNm'
                                            name="blbrTtlNm"
                                            type="text" 
                                            maxLength={200}
                                            value={formik.values.blbrTtlNm} 
                                            onChange={formik.handleChange} />,
                },
                ]
            },
           
            {
                cols: [
                {
                    required: true,
                    key: '내용', 
                    error: isFormikError('blbrCon'),
                    helperText: formik.errors.blbrCon,
                    editingValue: <TextEditor 
                                    className={iff(isFormikError('blbrCon'), 'p-invalid' , '')}
                                    name='blbrCon'
                                    value={formik.values?.blbrCon || ''}
                                    onTextChange={(e) => formik.setFieldValue('blbrCon', CommonUtils.nullToString(e.htmlValue))} />,
                },
                ]
            },
            {
                cols: [
                {
                    key: '첨부파일', 
                    editingValue: <>
                    <div className={iff(isFormikError('fileTempCnt') , 'p-invalid' , '')}>
                    <CldFileUpload 
                                //ref={fileRef}
                                name="files"
                                url={uploadUrl}
                                onUpload={UploadAfter} 
                                multiple={true}
                                accept="*"
                                maxFileSize={50000000}
                                maxFileCnt ={5}
                                acceptFileType="hwp, ppt, pptx, doc, docx, txt, xls, xlsx, jpg, png, avi, mov, mpeg4"
                                atchDetail={atchDetail}
                                setFileTempCnt = {setFileTempCnt}
                    />
                    </div>
                    {iff(isFormikError('fileTempCnt')  , <div className='p-error'>{formik.errors.fileTempCnt}</div> , '')} 
                        {
                            atchDetail.length > 0 ? 
                            <div className='downloadFiles mt10'>
                            <ul className='fileList'>
                            {
                                atchDetail && atchDetail.map((e) => (
                                    <li key={e.atchNo + e.atchSrn}>
                                    <i className='pi pi-download mr5 downloadIco'></i>
                                    <u>{e.atchNm}</u>
                                    <span  className='ml10'>{CommonUtils.byteCal(e.atchSizeVl)}</span>
                                    <Button type='button' icon='pi pi-times-circle' className='p-button-text deleteFileBtn' onClick={ () => DelFile({
                                        atchNo: e.atchNo,
                                        atchSrn:e.atchSrn,
                                    })} />
                                    </li>
                                ))
                            }
                            </ul>
                            </div>
                            :
                            <></>
                        }
                    </>
                },
                ]
            },
            
            {
                cols: [
                {
                    key: '중요공지여부',
                    editingValue: (
                        categories.map((category) => {
                        return (
                            <span key={category.key} className="field-radiobutton mr20">
                                <RadioButton 
                                    inputId={category.key} 
                                    name="category" 
                                    value={category} 
                                    onChange={(e) => setSelectedCategory(e.value)}  
                                    checked={selectedCategory.key === category.key} 
                                    disabled={category.key === 'R'} />
                                <label className='ml5' htmlFor={category.key}>{category.name}</label>
                            </span>
                    )}))
                }
            ]
        }
    ]
    }

    return(
    <BasePage>
    <form onSubmit={formik.handleSubmit}>
        {/* 등록 내용 */}
        <ViewTemplate {...contents2} />

        <ViewButtonsTemplate 
            mode={mode}
            list={list}
            cancel={cancel}
        />
    </form>
    </BasePage>)
}
export default BoardRegister;
