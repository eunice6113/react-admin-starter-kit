import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BasePage } from '../../shared/components/base/BasePage';
import * as commonCode from '../../shared/config/commonCode';
import * as commonMsg from '../../shared/config/commonMsg';

const useBasePage = () => {

    //페이지 공통 기능
    const navigate = useNavigate();
    const params = useParams();
    const queryParam = params;

    const location = useLocation();
    const curLocation = location.pathname.split('/')
    const isRegister:boolean = curLocation[3] === 'register'

    const paramId = params.id;

    //url 라우터로 이동
    const goPage = ( url:string ) => navigate(url);

    const goPageWithData = ( url:string, data:object ) => navigate(url, { state: data });
     
    //뒤로 가기
    const goBack = () => navigate(-1);

    return {
        //basePage
        queryParam, paramId, 
        isRegister, 
        location, curLocation,
        commonCode,
        commonMsg,
        params,
        goPage, 
        goBack,
        goPageWithData,

        //공통 페이지 UI Component
        BasePage,

    }
}
export default useBasePage;