import { Button } from 'primereact';
import * as React from 'react';
import ErrorPageMotion from '../../shared/components/motion/ErrorPageMotion';
import useBasePage from '../../shared/hooks/base-page.hook';

const ErrorPage = () => {
    const { goPage } = useBasePage()

    return(
    <div className='d-flex justify-center align-center' style={{flexDirection: 'column'}}>
        <ErrorPageMotion />
        
        <Button 
            label='메인으로 돌아가기' 
            onClick={(e) => goPage('/man')} 
            className='p-button-rounded roundBtn'
            style={{position:'absolute', top:600, left:'50%', marginLeft:-120, height:60, borderRadius:30, fontSize:20}}
        />
    </div>)
}
export default ErrorPage;