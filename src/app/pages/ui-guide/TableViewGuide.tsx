import { Button, Calendar, InputText, InputTextarea, RadioButton, TabPanel, TabView } from 'primereact';
import * as React from 'react';
import { BasePage } from '../../shared/components/base/BasePage';
import CldFileUpload from '../../shared/components/CldFileUpload';
import ClipboardCopy from '../../shared/components/clipboard-copy/ClipboardCopy';
import ViewButtonsTemplate from '../../shared/components/template/ViewButtonsTemplate';
import ViewTemplate from '../../shared/components/template/ViewTemplate';
import useBasePage from '../../shared/hooks/base-page.hook';
import './ui-guide.css';

interface File {
    name:string;
    size:number;
}

interface PopupContent {
    title: string;
    content: string;
    link?: string;
    fromDate: Date;
    toDate: Date;
    useYn?: boolean;
    files?: File[];
}

const TableViewGuide: React.FC = () => {

    const { goPage } = useBasePage()

    const [mode, setMode] = React.useState<'view' | 'edit' | 'register'>('view');
    const popupTypes = [
        {name: '토스트 팝업', key: 'T'}, 
        {name: '윈도우 팝업', key: 'W'}];
    const [popupType, setPopupType] = React.useState(popupTypes[0]);

    const useTypes = [
        {name: '사용', key: 'Y'}, 
        {name: '미사용', key: 'N'}];
    const [useType, setUseType] = React.useState(useTypes[1]);

    const [values, setValues] = React.useState<any>({
        title: '',
        content: '',
        link: '',
        fromDate: undefined,
        toDate: undefined,
        useYn: false,
        files: [{name: '파일1.xlsx', size:0}, {name:'파일2.png', size:10}],
    });

    const handleChange = (prop: keyof PopupContent, value:any) => {
        setValues({ ...values, [prop]: value });
    };

    //목록 버튼
    const list = () => {
        goPage('/stm/pop/list')
    }

    //수정 버튼
    const edit = () => {
        setMode('edit');
        console.log('mode =>', mode)
    }

    //삭제 버튼
    const remove = () => {
        console.log('삭제')
    }

    //취소 버튼
    const cancel = () => {
        console.log('취소')

        setMode('view')
    }

    //확인 버튼
    const confirm = () => {
        setMode('view')
    }

    //api 읽어와서 업데이트 할 내용
    const authorInfo = {
        title: '등록자 정보',
        rows: [
            {
                cols: [
                    {
                        key: '등록자', 
                        value: '홍길동'
                    },
                    {
                        key: '등록일시', 
                        value: '2023.03.02. 15:00:00'
                    },
                ]
            }
        ]
    }

    const contentsInfo = {
        title: '등록 내용',
        mode: mode,
        hasRequired: true,
        rows: [
            {
                thOnly: {
                    key: '제목만 !!',
                },
            },
            {
                tdOnly: {
                    value: '내용만 !!',
                    editingValue: <InputTextarea rows={5} maxLength={250} placeholder='상세내용을 입력해주세요.(최대 250자)' value={values.content} onChange={(e) => handleChange('content', e.target.value)} />,
                },
        },
            {
                cols: [
                    {
                        key: '유형', 
                        value: <span>토스트 팝업</span>,
                        editingValue: <>
                        {
                            popupTypes.map((popup) => {
                                return (
                                    <span key={popup.key} className='field-radiobutton mr20'>
                                        <RadioButton 
                                            inputId={popup.key} 
                                            name='category' 
                                            value={popup} 
                                            onChange={(e) => setPopupType(e.value)} 
                                            checked={popupType.key === popup.key} 
                                            disabled={popup.key === 'R'} />
                                            <label htmlFor={popup.key}>{popup.name}</label>
                                    </span>
                            )})
                        }
                        </>
                    },
                    {
                        key: '구분', 
                        value: <span>토스트 팝업</span>,
                        editingValue: <></>
                    }
                ]
            },
            {
                cols: [
                    {
                        required: true,
                        key: '제목', 
                        value: <span> 클라우드 포탈 소식 전해드립니다.</span>,
                        editingValue: <InputText maxLength={100} placeholder='제목을 입력해주세요.(최대 100자)' value={values.title} onChange={(e) => handleChange('title', e.target.value)} />,
                    },
                ]
            },
            {
                cols: [
                    {
                        required: true,
                        key: '상세내용', 
                        value: <span>상세내용입니다</span>,
                        editingValue: <InputTextarea rows={5} maxLength={250} placeholder='상세내용을 입력해주세요.(최대 250자)' value={values.content} onChange={(e) => handleChange('content', e.target.value)} />,
                    }
                ]
            },
            {
                showIf: popupType.key === 'W', //팝업 유형 === '윈도우 팝업' 일 때만 노출
                cols: [
                    {
                        key: '팝업이미지', 
                        value: <>
                            <div className='downloadFiles'>
                                <ul className='fileList'>
                                    {
                                        values.files.map((file:any, index:number) => (
                                            <li key={file.name+index}><i className='pi pi-download mr5 downloadIco'></i><u>{file.name}</u></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </>,
                        editingValue: <>
                            <CldFileUpload name='files' url={''} onUpload={() => {}} multiple accept='image/*' maxFileSize={5000000} maxFileCnt={5} acceptFileType='png,jpg' />
                            <div className='downloadFiles mt10'>
                                <ul className='fileList'>
                                    {
                                        values.files.map((file:any, index:number) => (
                                            <li key={file.name+index}><i className='pi pi-download mr5 downloadIco'></i><u>{file.name}</u></li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className='downloadFiles mt10'>
                                <ul className='fileList'>
                                    {
                                        values.files.map((file:any, index:number) => (
                                            <li key={file.name+index}><i className='pi pi-download mr5 downloadIco'></i>
                                            <u>{file.name}</u>
                                            <span className='ml10'>{file.size}MB</span>
                                            <Button icon='pi pi-times-circle' className='p-button-text deleteFileBtn' />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </>
                    }
                ]
            },
            {
                showIf: popupType.key === 'W', //팝업 유형 === '윈도우 팝업' 일 때만 노출
                cols: [
                    {
                        required: false,
                        key: '팝업링크', 
                        value: <span> 클라우드 포탈 소식 전해드립니다.</span>,
                        editingValue: <InputText maxLength={100} placeholder='http://' value={values.link} onChange={(e) => handleChange('link', e.target.value)} />,
                    }
                ]
            },
            {
                cols: [
                    {
                        required: true,
                        key: '노출기간', 
                        value: <span>2022.10.15 ~ 2022.10.31</span>,
                        editingValue: <div className='viewDateRangePicker'>
                            <Calendar dateFormat='yy.mm.dd' value={values.fromDate} onChange={(e) => handleChange('fromDate', e.value)} showIcon />
                            <span className='mt5 ml5 mr5'>~</span>
                            <Calendar dateFormat='yy.mm.dd' value={values.toDate} onChange={(e) => handleChange('toDate', e.value)} showIcon />
                        </div>
                    }
                ]
            },
            {
                cols: [
                    {
                        key: '사용여부',
                        value: <span>노출</span>,
                        editingValue: (
                            useTypes.map((use) => {
                            return (
                                <span key={use.key} className='field-radiobutton mr20'>
                                    <RadioButton inputId={use.key} name='category' 
                                    value={use} onChange={(e) => setUseType(e.value)} 
                                    checked={useType.key === use.key} 
                                    disabled={use.key === 'R'} />
                                    <label className='ml5' htmlFor={use.key}>{use.name}</label>
                                </span>
                        )}))
                    }
                ]
            }
        ]
    }

    return(
    <BasePage>
        <div className='previewBox'>
            <h3>View</h3>
        
            {/* 등록자 정보 */}
            <ViewTemplate {...authorInfo} />

            {/* 등록 내용 */}
            <ViewTemplate {...contentsInfo} />

            {/* 
                버튼영역 
                mode={mode} 편집모드 'view' | 'edit' | 'register'
                list={list} 목록 버튼
                edit={edit} 수정 버튼
                remove={remove} 삭제 버튼
                cancel={cancel} 수정모드 > 취소 버튼
                confirm={confirm} 수정모드 > 확인 버튼
            */}
            <ViewButtonsTemplate 
                mode={mode}
                list={list}
                edit={edit}
                remove={remove}
                cancel={cancel}
                confirm={confirm}
            />
        </div>

        <h2 className='mb10'>Source</h2>
        <TabView>
            <TabPanel header='TableViewGuide.tsx'>
                <ClipboardCopy showTitle={false} rows={295} copyText={`
import * as React from 'react';
import { Button, Calendar, InputText, InputTextarea, RadioButton } from 'primereact';
import { BasePage } from '../../shared/components/base/BasePage';
import CldFileUpload from '../../shared/components/CldFileUpload';
import ClipboardCopy from '../../shared/components/clipboard-copy/ClipboardCopy';
import ViewButtonsTemplate from '../../shared/components/template/ViewButtonsTemplate';
import ViewTemplate from '../../shared/components/template/ViewTemplate';
import useBasePage from '../../shared/hooks/base-page.hook';

interface File {
    name:string;
    size:number;
}

interface PopupContent {
    title: string;
    content: string;
    link?: string;
    fromDate: Date;
    toDate: Date;
    useYn?: boolean;
    files?: File[];
}

const TableViewGuide: React.FC = () => {

    const { goPage } = useBasePage()

    const [mode, setMode] = React.useState<'view' | 'edit' | 'register'>('view');
    const popupTypes = [
        {name: '토스트 팝업', key: 'T'}, 
        {name: '윈도우 팝업', key: 'W'}];
    const [popupType, setPopupType] = React.useState(popupTypes[0]);

    const useTypes = [
        {name: '사용', key: 'Y'}, 
        {name: '미사용', key: 'N'}];
    const [useType, setUseType] = React.useState(useTypes[1]);

    const [values, setValues] = React.useState<any>({
        title: '',
        content: '',
        link: '',
        fromDate: undefined,
        toDate: undefined,
        useYn: false,
        files: [{name: '파일1.xlsx', size:0}, {name:'파일2.png', size:10}],
    });

    const handleChange = (prop: keyof PopupContent, value:any) => {
        setValues({ ...values, [prop]: value });
    };

    //목록 버튼
    const list = () => {
        goPage('/stm/pop/list')
    }

    //수정 버튼
    const edit = () => {
        setMode('edit');
        console.log('mode =>', mode)
    }

    //삭제 버튼
    const remove = () => {
        console.log('삭제')
    }

    //취소 버튼
    const cancel = () => {
        console.log('취소')

        setMode('view')
    }

    //확인 버튼
    const confirm = () => {
        setMode('view')
    }

    //api 읽어와서 업데이트 할 내용
    const authorInfo = {
        title: '등록자 정보',
        rows: [
            {
                cols: [
                    {
                        key: '등록자', 
                        value: '신재문'
                    },
                    {
                        key: '등록일시', 
                        value: '2023.03.02. 15:00:00'
                    },
                ]
            }
        ]
    }

    const contentsInfo = {
        title: '등록 내용',
        mode: mode,
        hasRequired: true,
        rows: [
            {
                thOnly: {
                    key: '제목만 !!',
                },
            },
            {
                tdOnly: {
                    value: '내용만 !!',
                    editingValue: <InputTextarea rows={5} maxLength={250} placeholder='상세내용을 입력해주세요.(최대 250자)' value={values.content} onChange={(e) => handleChange('content', e.target.value)} />,
                },
        },
            {
                cols: [
                    {
                        key: '유형', 
                        value: <span>토스트 팝업</span>,
                        editingValue: <>
                        {
                            popupTypes.map((popup) => {
                                return (
                                    <span key={popup.key} className='field-radiobutton mr20'>
                                        <RadioButton 
                                            inputId={popup.key} 
                                            name='category' 
                                            value={popup} 
                                            onChange={(e) => setPopupType(e.value)} 
                                            checked={popupType.key === popup.key} 
                                            disabled={popup.key === 'R'} />
                                            <label htmlFor={popup.key}>{popup.name}</label>
                                    </span>
                            )})
                        }
                        </>
                    },
                    {
                        key: '구분', 
                        value: <span>토스트 팝업</span>,
                        editingValue: <></>
                    }
                ]
            },
            {
                cols: [
                    {
                        required: true,
                        key: '제목', 
                        value: <span> 클라우드 포탈 소식 전해드립니다.</span>,
                        editingValue: <InputText maxLength={100} placeholder='제목을 입력해주세요.(최대 100자)' value={values.title} onChange={(e) => handleChange('title', e.target.value)} />,
                    },
                ]
            },
            {
                cols: [
                    {
                        required: true,
                        key: '상세내용', 
                        value: <span>상세내용입니다</span>,
                        editingValue: <InputTextarea rows={5} maxLength={250} placeholder='상세내용을 입력해주세요.(최대 250자)' value={values.content} onChange={(e) => handleChange('content', e.target.value)} />,
                    }
                ]
            },
            {
                showIf: popupType.key === 'W', //팝업 유형 === '윈도우 팝업' 일 때만 노출
                cols: [
                    {
                        key: '팝업이미지', 
                        value: <>
                            <div className='downloadFiles'>
                                <ul className='fileList'>
                                    {
                                        values.files.map((file:any, index:number) => (
                                            <li key={file.name+index}><i className='pi pi-download mr5 downloadIco'></i><u>{file.name}</u></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </>,
                        editingValue: <>
                            <CldFileUpload name='files' url={''} onUpload={() => {}} multiple accept='image/*' maxFileSize={5000000} maxFileCnt={5} acceptFileType='png,jpg' />
                            <div className='downloadFiles mt10'>
                                <ul className='fileList'>
                                    {
                                        values.files.map((file:any, index:number) => (
                                            <li key={file.name+index}><i className='pi pi-download mr5 downloadIco'></i><u>{file.name}</u></li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className='downloadFiles mt10'>
                                <ul className='fileList'>
                                    {
                                        values.files.map((file:any, index:number) => (
                                            <li key={file.name+index}><i className='pi pi-download mr5 downloadIco'></i>
                                            <u>{file.name}</u>
                                            <span className='ml10'>{file.size}MB</span>
                                            <Button icon='pi pi-times-circle' className='p-button-text deleteFileBtn' />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </>
                    }
                ]
            },
            {
                showIf: popupType.key === 'W', //팝업 유형 === '윈도우 팝업' 일 때만 노출
                cols: [
                    {
                        required: false,
                        key: '팝업링크', 
                        value: <span> 클라우드 포탈 소식 전해드립니다.</span>,
                        editingValue: <InputText maxLength={100} placeholder='http://' value={values.link} onChange={(e) => handleChange('link', e.target.value)} />,
                    }
                ]
            },
            {
                cols: [
                    {
                        required: true,
                        key: '노출기간', 
                        value: <span>2022.10.15 ~ 2022.10.31</span>,
                        editingValue: <div className='viewDateRangePicker'>
                            <Calendar dateFormat='yy.mm.dd' value={values.fromDate} onChange={(e) => handleChange('fromDate', e.value)} showIcon />
                            <span className='mt5 ml5 mr5'>~</span>
                            <Calendar dateFormat='yy.mm.dd' value={values.toDate} onChange={(e) => handleChange('toDate', e.value)} showIcon />
                        </div>
                    }
                ]
            },
            {
                cols: [
                    {
                        key: '사용여부',
                        value: <span>노출</span>,
                        editingValue: (
                            useTypes.map((use) => {
                            return (
                                <span key={use.key} className='field-radiobutton mr20'>
                                    <RadioButton inputId={use.key} name='category' 
                                    value={use} onChange={(e) => setUseType(e.value)} 
                                    checked={useType.key === use.key} 
                                    disabled={use.key === 'R'} />
                                    <label className='ml5' htmlFor={use.key}>{use.name}</label>
                                </span>
                        )}))
                    }
                ]
            }
        ]
    }

    return(
    <BasePage>
        <h3>View</h3>
    
        {/* 등록자 정보 */}
        <ViewTemplate {...authorInfo} />

        {/* 등록 내용 */}
        <ViewTemplate {...contentsInfo} />

        {/* 
            버튼영역 
            mode={mode} 편집모드 'view' | 'edit' | 'register'
            list={list} 목록 버튼
            edit={edit} 수정 버튼
            remove={remove} 삭제 버튼
            cancel={cancel} 수정모드 > 취소 버튼
            confirm={confirm} 수정모드 > 확인 버튼
        */}
        <ViewButtonsTemplate 
            mode={mode}
            list={list}
            edit={edit}
            remove={remove}
            cancel={cancel}
            confirm={confirm}
        />
    </BasePage>)
}
export default TableViewGuide;
                `} />

            </TabPanel>
            <TabPanel header='ViewTemplate.tsx'>

                <ClipboardCopy showTitle={false} rows={85} copyText={`
import * as React from 'react';

interface Contents {
    required?: boolean;
    key:string;
    value?: any;
    editingValue?: any;
}

interface Cols {
    showIf?: true | false | null;
    cols: Contents[];
}

interface IProps {
    title?:string;
    hasRequired?:boolean;
    mode?: 'view' | 'edit' | 'register';
    status? : 'approval' | 'reject' | 'ongoing'; //approval: 승인, reject: 반려, ongoing: 진행중
    rows: Cols[] | object[];
    colgroups?: string[];
    className?: string;
}

const ViewTemplate: React.FC<IProps> = ({ 
    title, 
    hasRequired, 
    mode = 'view', 
    status = 'ongoing', 
    rows, 
    colgroups = ['15%','35%','15%','35%'], 
    className 
}) => {

    return(
    <>
        <div className={className + ' view-container'}>
            {title &&
            <h2 className='page-title mb5'>
                {title}
                {mode !== 'view' && hasRequired && <span className='infoTxt'>(<span className='required'>*</span> 필수)</span>}
            </h2>}
            <div className='cld-table-cover'>
                <table className='cld-table'>
                    <caption>{title}</caption>
                    <colgroup>
                    {colgroups.map((wid, index) => (<col key={'v-' + wid + '-' + index} width={wid}></col>))}
                    </colgroup>
                    <tbody>
                    {
                        rows?.map((row:any, rowIndex:number) => (
                            <tr key={'tr'+rowIndex} className={ row?.showIf !== undefined && row?.showIf === false ? 'hide':'' }>
                                {
                                    row?.thOnly ?
                                        <th colSpan={4}>{row?.thOnly?.key}</th>
                                    :
                                    row?.tdOnly ?
                                        <td colSpan={4}>{mode === 'view' ? row?.tdOnly?.value : row?.tdOnly?.editingValue}</td>
                                    :
                                    row?.cols?.map((item:any, index:number) => (
                                        <React.Fragment key={item?.key + index}>
                                            <th>
                                                {item?.key}
                                                {mode !== 'view' && item?.required && <span className='required'>*</span>}    
                                            </th>
                                            <td colSpan={ row.cols.length == 1 ? 3 : 0}>
                                                {mode === 'view' ? item?.value : item?.editingValue}
                                            </td>
                                        </React.Fragment>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    </tbody>
                </table>    
            </div>
        </div>
    </>
    )
}
export default ViewTemplate;
                `} />

            </TabPanel>
            <TabPanel header='ViewButtonsTemplate.tsx'>

                <ClipboardCopy showTitle={false} rows={42} copyText={`
import { Button } from "primereact";
import { MODE } from '../../config/commonCode';

interface IProps {
    list?: any,
    cancel?: any,
    confirm?: any,
    edit?: any,
    remove?:  any,
    mode?: 'view' | 'edit' | 'register';
}
const ViewButtonsTemplate: React.FC<IProps> = ({ list, cancel, confirm, edit, remove, mode }) => {

    return(
        <div className='btn-container cld-row'>
            <div className='cld-col-3'>
                <Button className='secondary' onClick={list}>목록</Button>
            </div>
            <div className='cld-col-6 text-center'>
            { (mode === MODE.EDIT || mode === MODE.REGISTER) &&
            <>
                <Button className='lg outline' onClick={cancel}>취소</Button>
                <Button className='lg ml5' onClick={confirm}>확인</Button>
            </>
            }
            </div>
            <div className='cld-col-3 d-flex'>
            {mode === MODE.VIEW &&
            <>
                <Button className='ml-auto outline' onClick={edit}>수정</Button>
                <Button className='ml5' onClick={remove}>삭제</Button>
            </>
            }
            </div>
        </div>
    )
}
export default ViewButtonsTemplate;
                `} />

            </TabPanel>
        </TabView>
    </BasePage>)
}
export default TableViewGuide;