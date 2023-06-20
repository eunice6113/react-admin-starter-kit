import * as React from 'react';
import { useEffect, useState } from 'react';

import {  useInqCodeDetailListMutation } from '../../core/services/code.service'
  
  export function useGetCodeListByFilter( code, filterVal ) {

    const [getCodeList] = useInqCodeDetailListMutation()
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
      console.log(":::::::::::::GetCodeList IN:"+code);
    }, []) //<-여기를 [] 빈 배열로 놓아야 초기 한 번만 실행됨
  
  

    const getList = async ( condition ) => {
      
    getCodeList(condition).unwrap()
    .then(( response:any ) => {
      
      if(response) {
        //데이터 처리
        console.log('getCodeList fulfilled =>',response)
        
        let boardData = response
      
        boardData.map(({cmcdId,cmcdVl,cmcdVlNm,cmcdVlDescCon,cmcdRpsnSqc,sysLsmdId}) => {
            let obj = {
              //_cmcdId:cmcdId,                 //공통코드ID
              value:cmcdVl,                     //공통코드값
              name:cmcdVlNm,                    //공통코드값명
              //_cmcdVlDescCon:cmcdVlDescCon,   //공통코드값설명내용
              //_cmcdRpsnSqc:cmcdRpsnSqc,       //공통코드표시순서
              //_sysLsmdId:sysLsmdId,           //시스템최종변경ID
            };

            //setCodeData
            if(cmcdVl != filterVal && cmcdVl.substring(0,2) == filterVal.substring(0,2)){
              setCodeData((prev) => (
                [...prev, obj]
                ))
            }
        })
      
      }
    }).catch((error) => console.error('rejected', error))
    }
    return codeData;
  }