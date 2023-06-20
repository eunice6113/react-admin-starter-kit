import { Button } from "primereact";
import * as React from "react";
import { Link } from "react-router-dom";
import logo from '../../../../assets/images/cloud.png';
import { getToken, getUserInfo } from "../../../core/services/base/base-api.service";
import './header.css';

interface IProps {
    handleOpen: React.MouseEventHandler<HTMLButtonElement>;
}

const Header: React.FC<IProps> = ({handleOpen}) => {

    const isLogin = getToken() ? true : false

    //user 정보를 보여준다
    let userData = JSON.parse(getUserInfo())
    let userName = userData ? userData.emm : '로그인 안됨'
    
    let lgnDt = userData ? userData.lgnTs.slice(0,3).join('.') : ''
    let lgnTs = userData ? userData.lgnTs.slice(3,6).join(':') : ''

    let userAccessInfo = `최근 접속 ${lgnDt}  ${lgnTs}`;

    const logoutFunc = () => {
        localStorage.clear();
        window.location.href = process.env.REACT_APP_SSO_LOGOUT; 
    }

    return(
    <div className='customHeader'>
        <div className="headerInnerContents">
            <Button className="menu p-button-text" icon="pi pi-bars" onClick={handleOpen} />

            <Link to='/man' className="logoTitle">
                <span className="portalName">React CMS Starter Kit</span>
            </Link>
  
            {
                !isLogin ? 
                <Button label="login" className="ml-auto" 
                    onClick={() => { window.location.href = process.env.REACT_APP_SSO_AUTH }}
                />
                :
                <>
                    <span className="accessInfo">{userAccessInfo}</span>
                    <span className="profile">
                        <i className="pi pi-user" />
                    </span>
                    <span>{userName}</span>

                    <Button label="logout" className="ml20" onClick={logoutFunc} />
                </>
            }
        </div>
    </div>
    )
}
export default Header;