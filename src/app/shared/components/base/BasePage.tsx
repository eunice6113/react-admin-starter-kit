import * as React from "react";
import { useLocation } from "react-router-dom";
import useBasePage from '../../hooks/base-page.hook';
import PageTitle from "../page-title/PageTitle";
import './base-page.css';

interface IProps {
    className?: string;
    children: React.ReactNode;
}

export const BasePage: React.FC<IProps> = ({className, children}) => {

    const { curLocation } = useBasePage()

    const location = useLocation();
    const [pageTitle, setPageTitle] = React.useState('')
    
    React.useEffect(() => {

        //페이지의 첫 번째 input 에 자동으로 focus 를 준다
        const firstInput:any = document.querySelector('.basePage input')
        // console.log('firstInput', firstInput)
        if(firstInput) {
            firstInput.focus()
        }


        /**
         *  메뉴 타이틀 세팅
         */
        let menu:any = JSON.parse(localStorage.getItem('menu'));
        let nowSubPath = `/${curLocation[1]}/${curLocation[2]}`

        menu?.map(({menuNm, uriPathNm}) => {
            let menuUrlArr = uriPathNm.split('/');
            let menuUrl = '/' + menuUrlArr[1] + '/' + menuUrlArr[2];

            if(menuUrl === nowSubPath) {
                setPageTitle(menuNm);
            }
        })

    }, [])

    React.useEffect(() => {
        const htmlTitle = document.querySelector('title')
        htmlTitle.innerHTML = pageTitle + ' :: React Starter Kit'
        
        if(pageTitle != ''){
            //datatable에 동적으로 caption, scope 추가
            setDataTable()
        }

    },[pageTitle])

    const setDataTable = () => {
        const dataTables = Array.from(document.getElementsByClassName('p-datatable-table'))

        if(dataTables != null){

            dataTables.forEach(function(dataTable) {
                const thGroup = Array.from(dataTable.getElementsByTagName('th'))

                thGroup.forEach(function(th) {
                    th.scope = 'col'
                })
    
                const caption = document.createElement('caption')
                caption.textContent = pageTitle
        
                dataTable.prepend(caption)

                console.log('datatable=>', dataTable)
            })
        }
    }
    
    //새로운 곳으로 이동시 페이지 상단으로 스크롤 이동
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    
    return(<>
        {
            location.pathname !== '/man' && <PageTitle title={pageTitle} />
        }
        
        <div className={`pl20 pr20 basePage ${className}`}>
            {children}
        </div>
    </>)
}
