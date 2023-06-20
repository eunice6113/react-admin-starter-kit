import * as React from 'react';

interface Contents {
    required?: boolean;
    key:string;
    value?: any;
    editingValue?: any;
    error?: boolean;
    helperText?: any;
    describeText?: any;
    label?: any;
}

interface Cols {
    showIf?: true | false | null;
    cols: Contents[];
}

interface IProps {
    title?:string;
    hasRequired?:boolean;
    mode?: 'view' | 'edit' | 'register';
    rows: Cols[] | object[];
    colgroups?: string[];
    className?: string;
}

const iff = (condition, then, otherwise) => condition? then : otherwise;

const ViewTemplate: React.FC<IProps> = ({ title, hasRequired, mode = 'view', rows, colgroups = ['15%','35%','15%','35%'], className}) => {


    
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
                            {colgroups.map((wid, index) => (<col key={`v-${wid}-${index}`} width={wid}></col>))}
                        </colgroup>
                        <tbody>
                        {
                            rows?.map((row:any, rowIndex:number) => (
                                <tr key={'tr'+rowIndex} className={ row?.showIf !== undefined && row?.showIf === false ? 'hide':'' }>
                                    {
                                        iff(row?.thOnly ,
                                            <th scope='row' colSpan={4}>{row?.thOnly?.key}</th> 
                                        ,iff(
                                        row?.tdOnly ,
                                            <td scope='row' colSpan={4}>{mode === 'view' ? row?.tdOnly?.value : row?.tdOnly?.editingValue}</td> 
                                        ,
                                        row?.cols?.map((item:any, index:number) => (   
                                            <React.Fragment key={item?.key + index}>
                                                <th scope='row'>
                                                    {iff(mode === 'view' , item?.key ,
                                                        iff(item?.label , item?.label ,
                                                            iff (item?.editingValue?.props?.__TYPE , <><label htmlFor={item?.editingValue?.props?.id} className='p-th-label'>{item?.key}</label></>
                                                            , item?.key)))
                                                    }
                                                    {mode !== 'view' && item?.required && <span className='required'>*</span>}    
                                                </th>
                                                <td scope='row' colSpan={ row.cols.length == 1 ? 3 : 0}>
                                                    {iff(mode === 'view' , item?.value 
                                                        , item?.editingValue)
                                                    }
                                                    {
                                                        mode != 'view' &&
                                                            <div className='d-flex'> 
                                                                {iff(item?.error , <div className='p-error'>{item?.helperText}</div> , '')}
                                                                {iff(item?.describeText , <small  className='block'> {item?.describeText}</small> , '')}
                                                                {iff(item?.editingValue?.props?.__TYPE?.indexOf('Text') > -1  && item?.editingValue?.props?.maxLength , <small className='chkMaxLen ml-auto'>{(item?.editingValue?.props?.value+'').length}/{item?.editingValue?.props?.maxLength}</small> , '')}
                                                            </div>
                                                    }
                                                </td>
                                            </React.Fragment>
                                        ))
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

