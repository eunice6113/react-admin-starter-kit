import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../shared/layouts/loader/Loadable';

//https://reactnavigation.org/docs/getting-started/

//:::::::::::::::::::::::::::::::::::::::: Layouts ::::::::::::::::::::::::::::::::::::::::::

const BlankLayout = Loadable(lazy(() => import('../shared/layouts/BlankLayout')));
const FullLayout = Loadable(lazy(() => import('../shared/layouts/FullLayout')));

// :::::::::::::::::::::::::::::::::::::::: Pages :::::::::::::::::::::::::::::::::::::::::::

//auth
const Callback = Loadable(lazy(() => import('../pages/auth/Callback')));
const Logout = Loadable(lazy(() => import('../pages/auth/Logout')));
const NotAuthorized = Loadable(lazy(() => import('../pages/auth/NotAuthorized')));
const NotFound = Loadable(lazy(() => import('../pages/auth/NotFound')));
const ErrorPage = Loadable(lazy(() => import('../pages/auth/ErrorPage')));

//UI GUIDE
const LayoutGuide = Loadable(lazy(() => import('../pages/ui-guide/LayoutGuide')));
const ButtonGuide = Loadable(lazy(() => import('../pages/ui-guide/ButtonGuide')));
const InputGuide = Loadable(lazy(() => import('../pages/ui-guide/InputGuide')));
const SelectGuide = Loadable(lazy(() => import('../pages/ui-guide/SelectGuide')));
const PopupGuide = Loadable(lazy(() => import('../pages/ui-guide/PopupGuide')));
const TableListGuide = Loadable(lazy(() => import('../pages/ui-guide/TableListGuide')));
const TableViewGuide = Loadable(lazy(() => import('../pages/ui-guide/TableViewGuide')));
const ChartGuide = Loadable(lazy(() => import('../pages/ui-guide/ChartGuide')));
const UploadGuide = Loadable(lazy(() => import('../pages/ui-guide/UploadGuide')));
const NoDataGuide = Loadable(lazy(() => import('../pages/ui-guide/NoDataGuide')));
const ExcelGuide = Loadable(lazy(() => import('../pages/ui-guide/ExcelGuide')));
const CheckboxGuide = Loadable(lazy(() => import('../pages/ui-guide/CheckboxGuide')));
const DatePickerGuide = Loadable(lazy(() => import('../pages/ui-guide/DatePickerGuide')));
const InfoGuide = Loadable(lazy(() => import('../pages/ui-guide/InfoGuide')));
const LabelGuide = Loadable(lazy(() => import('../pages/ui-guide/LabelGuide')));
const RadioGuide = Loadable(lazy(() => import('../pages/ui-guide/RadioGuide')));
const TabGuide = Loadable(lazy(() => import('../pages/ui-guide/TabGuide')));
const ToggleGuide = Loadable(lazy(() => import('../pages/ui-guide/ToggleGuide')));



//메인 ==================================================================================
const Main = Loadable(lazy(() => import('../pages/main/Main')));


//공지사항
const BoardList = Loadable(lazy(() => import('../pages/board/BoardList')));
const BoradDetail = Loadable(lazy(() => import('../pages/board/BoradDetail')));
const BoardRegister = Loadable(lazy(() => import('../pages/board/BoardRegister')));

const getAccessView = (isAuthenicated, type) => {
    let view;

    if(!isAuthenicated.hasToken) {
        //인증 토큰이 없으면
        view = <Navigate to='/auth/logout' />  //토큰을 받아온다
    }
    else if(isAuthenicated.hasToken && !isAuthenicated.isAdmin) {
        //토큰이 있는데 관리자가 아니면 관리자 아님 페이지로 이동
        view = <Navigate to='/auth/not-admin' />
    }
    else if(isAuthenicated.hasToken && isAuthenicated.isAdmin) {
      //토큰 있고 관리자이면 메인 or <FullLayout /> 으로 이동
      if(type === '1') {
        view = <Navigate to='/man' />
      }
      else {
        view = <FullLayout />
      }
    }
    else {
      view = <Navigate to='/auth/logout' />
    }

    return view;
}

// Routes ================================================================
const adminRoutes = (isAuthenicated) => [
  /* [인증]
      1. 토큰을 가지고 있지 않으면 (!isAuthenicated.hasToken)
      2. logout페이지로 가서 ssoLogin 자동로그인을 태운다
      3. ssoLogin 해서 토큰이 있는데 admin 권한이 없다면 auth/not-admin 페이지로 간다. (권한이 없습니다)
      4. 토큰이 있고 관리자이면 main 으로 이동한다!
  */ 
  {
    path: '/',
    element : getAccessView(isAuthenicated, '1'),
  },
  {
    path: '/',
    element: getAccessView(isAuthenicated, '2'),
    children: [
      {
        path: 'ui',
        children: [
          {
            path: 'layout', 
            name: 'Layout Guide', 
            element: <LayoutGuide />,
          },
          {
            path: 'button', 
            name: 'Button Guide', 
            element: <ButtonGuide />
          },
          {
            path: 'input', 
            name: 'Input Guide', 
            element: <InputGuide />
          },
          {
            path: 'select', 
            name: 'Select Guide', 
            element: <SelectGuide />
          },
          {
            path: 'popup', 
            name: 'Popup Guide', 
            element: <PopupGuide />
          },
          {
            path: 'table-view/:id', 
            name: 'Table View Guide', 
            element: <TableViewGuide />
          },
          {
            path: 'table-list', 
            name: 'Table List Guide', 
            element: <TableListGuide />
          },
          {
            path: 'excel', 
            name: 'Excel Import/Export', 
            element: <ExcelGuide />
          },
          {
            path: 'chart', 
            name: 'Chart Guide', 
            element: <ChartGuide />
          },
          {
            path: 'radio', 
            name: 'Radio Guide', 
            element: <RadioGuide />
          },
          {
            path: 'check', 
            name: 'Checkbox Guide', 
            element: <CheckboxGuide />
          },
          {
            path: 'datepicker', 
            name: 'DatePickerGuide Guide', 
            element: <DatePickerGuide />
          },
          {
            path: 'info', 
            name: 'InfoGuide Guide', 
            element: <InfoGuide />
          },
          {
            path: 'label', 
            name: 'LabelGuide Guide', 
            element: <LabelGuide />
          },
          {
            path: 'tab', 
            name: 'TabGuide Guide', 
            element: <TabGuide />
          },
          {
            path: 'toggle', 
            name: 'ToggleGuide Guide', 
            element: <ToggleGuide />
          },
          {
            path: 'upload', 
            name: 'Upload Guide', 
            element: <UploadGuide />
          },
          {
            path: 'nodata', 
            name: 'NoData Guide', 
            element: <NoDataGuide />
          },
        ]
      },
      { path: 'man',
        name: 'Main', 
        element: <Main />
      },
      { path: 'ntc',
        name: '공지사항 관리',
        children: [
          {path: 'list', name:'공지사항 관리', state: {name:'hello'}, element: <BoardList />},
          {path: ':id', name:'공지사항 상세/수정', element: <BoradDetail />},
          {path: 'register', name:'공지사항 등록', element: <BoardRegister />},
        ],
      },
    ]
  },
  {
    path: 'callback',
    element: <Callback />,
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: 'logout', element: <Logout /> },
      { path: '404', element: <NotFound /> },
      { path: 'err', element: <ErrorPage /> },
      { path: 'not-admin', element: <NotAuthorized /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/auth/404" />
  },
];

export default adminRoutes;