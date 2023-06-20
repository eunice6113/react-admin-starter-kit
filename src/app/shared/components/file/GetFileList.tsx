import * as React from "react";
import { useGetAtchPostsQuery } from '../../../core/services/atch.service';
import downFile from '../../../shared/utils/fileDownload';

interface IProps {
    atchNo?:any;
}

export const GetFileList: React.FC<IProps> = ({atchNo}) => {

    const [searchParam, setSearchParam] = React.useState<any>({
        atchNo : atchNo,
    })

    const [fileList, setFileList] = React.useState<any>([])

    const { data:posts, refetch } = useGetAtchPostsQuery( searchParam )

    React.useEffect(() => {
        setSearchParam({atchNo : atchNo})
    }, [atchNo]);

    React.useEffect(() => {
        refetch()
    }, [searchParam]);

    React.useEffect(() => {
        if(posts) {
            let boardData:any = posts

            console.log('fileList = ', boardData);

        
            // File List 초기화
            setFileList([])
        
            //데이터 읽어와서 필요한 데이터만 골라서 테이블 배열에 추가
            
            boardData?.map((data) => {
                let obj = {
                    atchNo : data.atchNo,
                    atchSrn : data.atchSrn,
                    atchNm : data.atchNm,
                    atchPhscNm : data.atchPhscNm,
                    atchSizeVl : data.atchSizeVl,
                    atchFilePath : data.atchFilePath              
                };
        
                //rows 데이터 업데이트
                setFileList((prev) => (
                [...prev, obj]
                ))
            })
        }
    }, [posts]);
    
    return(
        <>
            {fileList && fileList.length > 0 ?
                <div className='downloadFiles'>
                    <ul className='fileList'>
                        {
                            fileList?.map((e:any) => (
                                <li key={e.atchNo + e.atchSrn}
                                    ><i className='pi pi-download mr5 downloadIco'></i><u onClick={ () => downFile({
                                        atchNo: e.atchNo,
                                        atchSrn:e.atchSrn,
                                        atchNm: e.atchNm
                                    })} >{e.atchNm}</u><span className='ml10'></span></li>
                            ))
                        }
                    </ul>
                </div>
        :
        <></>
        }
        </>
    )
}
