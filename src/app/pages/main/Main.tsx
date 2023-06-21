import moment from 'moment';
import * as React from 'react';
import { useGetManPostsQuery } from '../../core/services/man.service';
import { BasePage } from '../../shared/components/base/BasePage';
import NoData from '../../shared/components/ui/NoData';
import './main.css';

// 메인화면
const Main:React.FC = () => {

    const USER_SNC = process.env.REACT_APP_USER_URL + '/snc/csn/list';

    const [snctPsst, setSnctPsst] = React.useState<any>({});
    const [sysCnt, setSysCnt] = React.useState(0);
    const [utlPsst, setUtlPsst] = React.useState<any>({});
    const [snctBrif, setSnctBrif] = React.useState<any>({});

    const { data:posts } = useGetManPostsQuery( {} )

    /**
     *  브라우저 창에 Title 세팅
     */
    React.useEffect(() => {
        const htmlTitle = document.querySelector('title')
        htmlTitle.innerHTML = 'React Starter Kit'
        
        setDataTable()
    }, []);

    const setDataTable = () => {
        const dataTables = Array.from(document.getElementsByClassName('p-datatable-table'))

        if(dataTables != null){

            dataTables.forEach(function(dataTable) {
                const thGroup = Array.from(dataTable.getElementsByTagName('th'))

                thGroup.forEach(function(th) {
                    th.scope = 'col'
                })
    
                const caption = document.createElement('caption')
                caption.textContent = 'Cloud Portal'
        
                dataTable.prepend(caption)

                console.log('datatable=>', dataTable)
            })
        }
    }
    

    React.useEffect(() => {

        if(posts) {
            let boardData:any = posts;
            let rqstPsstOutVo = boardData?.rqstPsstOutVo;
            let cldUtlPsstOutVo = boardData?.cldUtlPsstOutVo;
            let snctBrifOutVo = boardData?.snctBrifOutVo;

            

            console.log('posts = ', posts);
            console.log('boardData = ', boardData)

            let sysRtrcNbi;
            let sysAthzWaitNbi = 0;
            let sysAthzFnsgNbi;
            let rsrcRtrcNbi;
            let rsrcAthzWaitNbi = 0;
            let rsrcAthzFnsgNbi;
            /**
             * 반려 : 결재반려(04)
             * 승인대기 : 결재전+결재중+결재승인 (01 + 02 + 03) 
             * 승인완료 : 결재완료(05)             
             */

            let sysRqstList = rqstPsstOutVo?.sysRqstList;   // 서비스그룹 결재 건수
            let rsrcRqstList = rqstPsstOutVo?.rsrcRqstList; // 클라우드 자원 요청 결재 건수

            console.log('sysAthzWaitNbi = ', sysAthzWaitNbi)

            sysRqstList?.map((data) => {
                if(data.snctScd === '01'
                    || data.snctScd === '02'
                    || data.snctScd === '03' ) {
                    sysAthzWaitNbi += data.cnt;
                }
                else if(data.snctScd === '04') {
                    sysRtrcNbi = data.cnt;
                }
                else if(data.snctScd === '05') {
                    sysAthzFnsgNbi = data.cnt;
                }
            })

            rsrcRqstList?.map((data) => {
                if(data.snctScd === '01'
                    || data.snctScd === '02'
                    || data.snctScd === '03' ) {
                    rsrcAthzWaitNbi += data.cnt;
                }
                else if(data.snctScd === '04') {
                    rsrcRtrcNbi = data.cnt;
                }
                else if(data.snctScd === '05') {
                    rsrcAthzFnsgNbi = data.cnt;
                }
            })

            let obj = {
                sysAthzWaitNbi : sysAthzWaitNbi,
                sysRtrcNbi : sysRtrcNbi,
                sysAthzFnsgNbi : sysAthzFnsgNbi,
                rsrcRtrcNbi : rsrcRtrcNbi,
                rsrcAthzWaitNbi : rsrcAthzWaitNbi,
                rsrcAthzFnsgNbi : rsrcAthzFnsgNbi

            }
            setSnctPsst(obj)
            setSysCnt(rqstPsstOutVo.sysCnt);
            setSnctBrif(snctBrifOutVo);

            let utlPsstObj = {
                prmmAmt : cldUtlPsstOutVo.prmmAmt,
                thmmAmt : cldUtlPsstOutVo.thmmAmt,
                thmmAmtLocaleStr : cldUtlPsstOutVo.thmmAmt.toLocaleString(),
                dfamAmt : Math.abs(cldUtlPsstOutVo.thmmAmt - cldUtlPsstOutVo.prmmAmt).toLocaleString()
            }
            setUtlPsst(utlPsstObj);
        }
    }, [posts]);

    const linkSnct = () => {
        window.open(USER_SNC, '_blank')
    }

    return(
    <BasePage className='main'>
        <div className='cld-row pt30'>
            <div className='cld-col-3'>
                <div className='card dataCard'>
                    <div className='titleArea'>전체 시스템</div>
                    <div className='data'>
                        총<u className='ml5 num'>{sysCnt}</u>개
                    </div>
                </div>
            </div>
            <div className='cld-col-3'>
                <div className='card dataCard'>
                    <div className='titleArea'>시스템 요청</div>
                    <div className='cld-row mb0'>
                        <div className='cld-col-4'>
                            <div className='blueBox'>
                                <p>반려</p>
                                <h2 className='color-red'>{snctPsst.sysRtrcNbi}</h2>
                            </div>
                        </div>
                        <div className='cld-col-4'>
                            <div className='blueBox'>
                                <p>승인대기</p>
                                <h2>{snctPsst.sysAthzWaitNbi}</h2>
                            </div>
                        </div>
                        <div className='cld-col-4'>
                            <div className='blueBox'>
                                <p>승인완료</p>
                                <h2>{snctPsst.sysAthzFnsgNbi}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='cld-col-3'>
                <div className='card dataCard'>
                    <div className='titleArea'>클라우드 자원 요청</div>
                    <div className='cld-row mb0'>
                        <div className='cld-col-4'>
                            <div className='blueBox'>
                                <p>반려</p>
                                <h2 className='color-red'>{snctPsst.rsrcRtrcNbi}</h2>
                            </div>
                        </div>
                        <div className='cld-col-4'>
                            <div className='blueBox'>
                                <p>승인대기</p>
                                <h2>{snctPsst.rsrcAthzWaitNbi}</h2>
                            </div>
                        </div>
                        <div className='cld-col-4'>
                            <div className='blueBox'>
                                <p>승인완료</p>
                                <h2>{snctPsst.rsrcAthzFnsgNbi}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='cld-col-3'>
                <div className='card dataCard'>
                    <div className='d-flex-end'>
                        <div className='titleArea'>비용 현황</div>
                        <div className='ml-auto f12'>{moment().format('YYYY.MM')}</div>
                    </div>
                    <div className='data'>
                        <div className='d-block'>
                            <div>
                                <span className='ml5 num'>{utlPsst.thmmAmtLocaleStr}</span>원
                            </div>
                            <p className={`text-right mt3 ${utlPsst.prmmAmt < utlPsst.thmmAmt ? 'color-red' : 'color-primary'}  `}>
                            {
                                utlPsst.prmmAmt < utlPsst.thmmAmt ? '▲' : '▼'
                            }
                            {utlPsst.dfamAmt}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        <h1 className='mt30 mb5'>결재 진행 업무 리스트</h1>

        <div className='cld-row'>
            <div className='cld-col-6 cld-col-lg-6 cld-col-xl-4'>
                <div className='card'>
                    <div className='titleArea'>
                        <a href='#' onClick={linkSnct}>{snctBrif?.snctDsncNm1}</a>
                        <i className='pi pi-angle-right'></i>
                        <div className='tag tag-update ml-auto'>
                            <span>미처리 <strong>{snctBrif?.ntysNbi1}</strong>건</span>
                        </div>
                    </div>
                    <div>
                        <table className='listTable mt10'>
                            <colgroup>
                                <col width='70%' />
                                <col width='30%' />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>서비스 그룹명</th>
                                    <th>신청자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    snctBrif?.snctList1?.length > 0
                                    ?
                                    snctBrif?.snctList1?.map((item, index) => 
                                        <tr key={`man-sg-${index}`}>
                                            <td>{item.snctTtlNm}</td>
                                            <td>{item.rqstEmm}</td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan={2}>
                                        <NoData message='데이터가 없습니다.' />
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='cld-col-6 cld-col-lg-6 cld-col-xl-4'>
                <div className='card'>
                    <div className='titleArea'>
                        <a href='#' onClick={linkSnct}>{snctBrif?.snctDsncNm2}</a>
                        <i className='pi pi-angle-right'></i>
                        <div className='tag tag-update ml-auto'>
                            <span>미처리 <strong>{snctBrif?.ntysNbi2}</strong>건</span>
                        </div>
                    </div>
                    <div>
                        <table className='listTable mt10'>
                            <colgroup>
                                <col width='70%' />
                                <col width='30%' />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>요청명</th>
                                    <th>요청자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    snctBrif?.snctList2?.length > 0
                                    ?
                                    snctBrif?.snctList2?.map((item, index) => 
                                        <tr key={`man-rq-${index}`}>
                                            <td>{item.snctTtlNm}</td>
                                            <td>{item.rqstEmm}</td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan={2}>
                                        <NoData message='데이터가 없습니다.' />
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
       
            <div className='cld-col-6 cld-col-lg-6 cld-col-xl-4'>
                <div className='card'>
                    <div className='titleArea'>
                        <a href='#' onClick={linkSnct}>{snctBrif?.snctDsncNm3}</a>
                        <i className='pi pi-angle-right'></i>
                        <div className='tag tag-update ml-auto'>
                            <span>미처리 <strong>{snctBrif?.ntysNbi3}</strong>건</span>
                        </div>
                    </div>
                    <div>
                        <table className='listTable mt10'>
                            <colgroup>
                                <col width='70%' />
                                <col width='30%' />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>신청구분</th>
                                    <th>신청자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    snctBrif?.snctList3?.length > 0
                                    ?
                                    snctBrif?.snctList3?.map((item, index) => 
                                        <tr key={`man-cat-${index}`}>
                                            <td>{item.snctTtlNm}</td>
                                            <td>{item.rqstEmm}</td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan={2}>
                                        <NoData message='데이터가 없습니다.' />
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='cld-col-6 cld-col-lg-6 cld-col-xl-4'>
                <div className='card'>
                    <div className='titleArea'>
                        <a href='#' onClick={linkSnct}>{snctBrif?.snctDsncNm4}</a>
                        <i className='pi pi-angle-right'></i>
                        <div className='tag tag-update ml-auto'>
                            <span>미처리 <strong>{snctBrif?.ntysNbi4}</strong>건</span>
                        </div>
                    </div>
                    <div>
                        <table className='listTable mt10'>
                            <colgroup>
                                <col width='40%' />
                                <col width='30%' />
                                <col width='30%' />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>사업명</th>
                                    <th>신청유형</th>
                                    <th>신청자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    snctBrif?.snctList4?.length > 0
                                    ?
                                    snctBrif?.snctList4?.map((item, index) => 
                                        <tr key={`man-tfc-${index}`}>
                                            <td>{item.snctTtlNm}</td>
                                            <td className='text-center'>{item.snctDsncNm}</td>
                                            <td>{item.rqstEmm}</td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan={3}>
                                        <NoData message='데이터가 없습니다.' />
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='cld-col-6 cld-col-lg-6 cld-col-xl-4'>
                <div className='card'>
                    <div className='titleArea'>
                        <a href='#' onClick={linkSnct}>{snctBrif?.snctDsncNm5}</a>
                        <i className='pi pi-angle-right'></i>
                        <div className='tag tag-update ml-auto'>
                            <span>미처리 <strong>{snctBrif?.ntysNbi5}</strong>건</span>
                        </div>
                    </div>
                    <div>
                        <table className='listTable mt10'>
                            <colgroup>
                                <col width='40%' />
                                <col width='30%' />
                                <col width='30%' />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>사업명</th>
                                    <th>신청유형</th>
                                    <th>신청자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    snctBrif?.snctList5?.length > 0
                                    ?
                                    snctBrif?.snctList5?.map((item, index) => 
                                        <tr key={`man-tfc-${index}`}>
                                            <td>{item.snctTtlNm}</td>
                                            <td className='text-center'>{item.snctDsncNm}</td>
                                            <td>{item.rqstEmm}</td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan={3}>
                                        <NoData message='데이터가 없습니다.' />
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='cld-col-6 cld-col-lg-6 cld-col-xl-4'>
                <div className='card'>
                    <div className='titleArea'>
                        <a href='#' onClick={linkSnct}>{snctBrif?.snctDsncNm6}</a>
                        <i className='pi pi-angle-right'></i>
                        <div className='tag tag-update ml-auto'>
                            <span>미처리 <strong>{snctBrif?.ntysNbi6}</strong>건</span>
                        </div>
                    </div>
                    <div>
                        <table className='listTable mt10'>
                            <colgroup>
                                <col width='40%' />
                                <col width='30%' />
                                <col width='30%' />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>사업명</th>
                                    <th>신청유형</th>
                                    <th>신청자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    snctBrif?.snctList6?.length > 0
                                    ?
                                    snctBrif?.snctList6?.map((item, index) => 
                                        <tr key={`man-tfc-${index}`}>
                                            <td>{item.snctTtlNm}</td>
                                            <td className='text-center'>{item.snctDsncNm}</td>
                                            <td>{item.rqstEmm}</td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan={3}>
                                        <NoData message='데이터가 없습니다.' />
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </BasePage>)
}
export default Main;