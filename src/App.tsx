import { ConfirmDialog, Toast } from 'primereact';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import adminRoutes from './app/routes/admin-routes';

// css 는 불러오는 순서를 지켜주셔야 합니다!!
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "./assets/css/font.css";
// import "./assets/css/design-token.css"; //디자인토큰 css 
import "./assets/css/main.css";
import './assets/css/App.css';

import { Auth } from './app/core/models/auth';
import { getIsAdmin, hasValidToken } from './app/core/services/base/base-api.service';
import { useGetMnuPostsQuery } from './app/core/services/mnu.service';
import useBasePage from './app/shared/hooks/base-page.hook';

function App() {

  let isAuthenticated:Auth = {};
  let routing = null;

  isAuthenticated = {
    hasToken: true,
    isAdmin: true
  }
  routing = useRoutes(adminRoutes(isAuthenticated));

  // 메뉴정보 조회
  const { commonCode } = useBasePage()
    const { data:posts } = useGetMnuPostsQuery( {
        cldPotlAthrDcd: commonCode.ATHR_DCD_ADM,    //권한구분코드(10:사용자)
        useYn : 'Y'
  })

  React.useEffect(() => {

        if(posts) {
            let response:any = posts;

            let menu = [];
            
            //데이터 읽어와서 필요한 데이터만 골라서 테이블 배열에 추가
            response.map(({menuNo, menuNm, cldPotlAthrDcd, menuLvlSqn, menuSqc, hgrnMenuNo, uriPathNm, menuDescCon}) => {

                let obj = {
                    key: menuNo,
                    menuNo: menuNo,
                    menuNm: menuNm,
                    cldPotlAthrDcd: cldPotlAthrDcd,
                    menuLvlSqn: menuLvlSqn,
                    menuSqc: menuSqc,
                    hgrnMenuNo: hgrnMenuNo,
                    uriPathNm: uriPathNm,
                    menuDescCon: menuDescCon,
                };

                menu.push(obj);

            })

            localStorage.setItem('menu', JSON.stringify(menu) );
        }
    }, [posts]);

  return (
      <>
          <ConfirmDialog />
          <Toast />

          {routing}
      </>
  );
}

export default App;
