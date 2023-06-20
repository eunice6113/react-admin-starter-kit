/**** 

//Menu API 이용한 소스

import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './bread-crumbs.css';

const BreadCrumbs: React.FC = () => {

    const location = useLocation();
    const curLocation = location.pathname.split('/')
    const mainPath = `/${curLocation[1]}`
    const subPath = `/${curLocation[1]}/${curLocation[2]}`

   
    let curMenus:any[] = [];

    const [menus, setMenus] = React.useState<any[]>([])

    React.useEffect(() => {

        let menuList:any = JSON.parse(localStorage.getItem('menu'));

        let mainMenu;
        let subMenu;

        menuList.forEach((item) => {
            if(item.uriPathNm === mainPath) {
                mainMenu = item;
            }

            let subUriArr = item.uriPathNm.split('/');
            let subUri = '/' + subUriArr[1] + '/' + subUriArr[2]
            if(subUri === subPath) {
                subMenu = item;
            }
        })

        curMenus.push(mainMenu);
        curMenus.push(subMenu);

        setMenus(curMenus)
    }, [])

    return(
        <>
            <div className='breadCrumbs'>
                <Link to='/' className='menuTxt'>Home</Link> 
                <i className='pi pi-chevron-right' />
                {
                    menus?.map((menu, index) => (
                        <React.Fragment key={`breadCrumb-${index}`}>
                            <span className='menuTxt'>{menu.menuNm}</span>
                            {
                                menus.length-1 === index ? null :
                                <i className='pi pi-chevron-right' />
                            }
                        </React.Fragment>
                    ))
                }
            </div>
        </>
    )
}
export default BreadCrumbs

****/




//옛날 소스 (라우터에서 읽어오는) 로 일단 복원

import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './bread-crumbs.css';
import adminRoutes from '../../../routes/admin-routes';

const BreadCrumbs: React.FC = () => {

    const location = useLocation();
    const routes = adminRoutes({hasToken: true, isAdmin: true});
    const curLocation = location.pathname.split('/')
    const mainPath = `/${curLocation[1]}`
    const subPath = `/${curLocation[1]}/${curLocation[2]}`
    let list:any = null

    const setList = () => {
        list = routes[1]?.children?.map((item:any) => {
            let obj = {
                label: item?.name,
                url: `/${item.path}`,
                items: item?.children?.map((sitem:any) => {
                    return { label: sitem.name, url: `/${item.path}/${sitem.path}` }
                })
            }
            return obj;
        })

        //메인화면, ui 가이드는 제외
        list = list.filter((menu:any) => menu.url !== '/ui' && menu.url !== '/man') 

        return list
    }

    //list 한 번만 만들어서 (list 값이 없으면 setList 돌리고 아니면 list 리턴) 렌더링시마다 재사용 (useMemo)
    const lists = React.useMemo(() => setList(), [list])
    let curMenus:any[] = [];

    const [menus, setMenus] = React.useState<any[]>([])

    React.useEffect(() => {
        curMenus = [];
        lists.forEach((item:any) => { 
            if(item.url === mainPath) {
                curMenus.push(item)
                item.items?.forEach((sitem:any) => {
                    if(sitem.url === subPath) {
                        curMenus.push(sitem)
                        return false;
                    }
                })
            }
        })
        setMenus(curMenus)
    }, [])


    return(
        <>
            <div className='breadCrumbs'>
                <Link to='/' className='menuTxt'>Home</Link> 
                <i className='pi pi-chevron-right' />
                {
                    menus.map((menu, index) => (
                        <React.Fragment key={`breadCrumb-${index}`}>
                            <span className='menuTxt'>{menu.label}</span>
                            {
                                menus.length-1 === index ? null :
                                <i className='pi pi-chevron-right' />
                            }
                        </React.Fragment>
                    ))
                }
            </div>
        </>
    )
}
export default BreadCrumbs

