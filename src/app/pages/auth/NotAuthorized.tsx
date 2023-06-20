import * as React from "react";
import { getIsAdmin, hasValidToken } from "../../core/services/base/base-api.service";
import NotAdminMotion from "../../shared/components/motion/NotAdminMotion";
import useBasePage from "../../shared/hooks/base-page.hook";

const NotAuthorized: React.FC = () => {
    const { goPage } = useBasePage()

    //이 페이지에 다이렉트로 접근했을때 localStorage 를 읽어서 토큰이 있고 관리자이면 main 으로 리다이렉트
    React.useEffect(() => {

        if(hasValidToken() && getIsAdmin()) {
            goPage('/man')
        }

    }, [])

    return(
    <div className="d-flex justify-center align-center" style={{flexDirection:'column', height:'100vh'}}>
        <div className="text-center">
            <NotAdminMotion />
            <h1 className="mb20">관리자 전용 페이지 입니다.</h1>
            <p>접근하시려면 클라우드추진Cell 담당자에게 관리자 권한을 신청해 주세요.</p>
            <p></p>
        </div>
    </div>
    )
}
export default NotAuthorized;