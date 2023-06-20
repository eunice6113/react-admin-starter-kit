import * as React from "react";
import GuideImg from '../../../assets/images/exit.png'
import { Button } from "primereact";

const Logout: React.FC = () => {

    const PERMITTED_DOMAIN = process.env.REACT_APP_USER_URL

    return (
        <div className='d-flex-default justify-center' style={{width:'100%', height:'100vh'}}>
            <div className="d-flex justify-center align-center" style={{flexDirection:'column', height:'100vh'}}>
                <div className="text-center">
                <h1 className="mb20">Cloud Portal 관리자 전용 페이지 입니다.</h1>
                <p className='mt20'>접근하시려면</p>
                <p>1. 클라우드 추진 Cell 담당자에게 관리자 권한을 신청하신 후</p>
                <p className='mb20'>2. Cloud Portal 우측 상단 이름을 클릭하여 팝업 메뉴에서 '관리자'를 선택하여 접속해 주세요.</p>
                <div>
                    <img src={GuideImg} style={{border:'1px solid #eaeaea'}} />
                </div>
                <Button 
                    label="Cloud Portal 접속하기" 
                    onClick={(e) => { window.location.href = PERMITTED_DOMAIN }} 
                    className='p-button-rounded roundBtn mt20' 
                />
                </div>
            </div>
        </div>
    )

      
    
}
export default Logout;