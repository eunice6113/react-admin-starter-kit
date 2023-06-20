import { useEffect, useState } from 'react';
import {  useInqCodeDetailListMutation } from '../../core/services/code.service'
  
  export function useGetCodeList( code ) {

    const [getCodeList, ] = useInqCodeDetailListMutation()
    const [codeData, setCodeData] = useState<{
      value:string;  //공통코드값
      name:string;  //공통코드값명
          }[]
      >([],)
    
    let condition = {
        cmcdId : code,
    };
  

    useEffect(()=> {
      getList( condition ); //공통코드조회
    }, []) //<-여기를 [] 빈 배열로 놓아야 초기 한 번만 실행됨

    const getList = async ( condition ) => {
      
    getCodeList(condition).unwrap()
    .then(( response:any ) => {
      
      if(response) {
        //데이터 처리
        
        let boardData = response
      
        boardData.map((data) => {

          let obj:any ={} ;
          // P2839600: 카테고리구분코드 예외처리
          if(code == 'P2839600'){ 
            obj = {
              value:data.cmcdVl,                 //공통코드값
              name:data.cmcdVlNm?.replace('서비스',''),             //공통코드값명
            };
          }else{
            obj = {
              value:data.cmcdVl,                 //공통코드값
              name:data.cmcdVlNm,             //공통코드값명
            };
          }
          
          
          setCodeData((prev) => (
            [...prev, obj]
            ))
        })
  
      }
    }).catch((error) => console.error('rejected', error))
    }
    return codeData;
  }