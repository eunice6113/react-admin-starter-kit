import { Button } from 'primereact';
import * as React from 'react';
import NotFoundMotion from '../../shared/components/motion/NotFoundMotion';
import useBasePage from '../../shared/hooks/base-page.hook';

const NotFound = () => {
    const { goPage } = useBasePage()

    return(
    <div className='d-flex justify-center align-center' style={{flexDirection: 'column'}}>
        <NotFoundMotion />
        
        <Button 
            label='메인으로 돌아가기' 
            onClick={(e) => goPage('/man')} 
            className='p-button-rounded roundBtn'
            style={{position:'absolute', top: 600, left: '50%', marginLeft: -120}}
        />
    </div>)
}
export default NotFound;