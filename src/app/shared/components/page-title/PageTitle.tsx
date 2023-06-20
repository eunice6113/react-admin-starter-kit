import * as React from 'react';
import './page-title.css'
import BreadCrumbs from '../breadcrumbs/BreadCrumbs';

interface IProps {
    title: string;
}

const PageTitle: React.FC<IProps> = ({title}) => {

    return(
    <div className='pageTitleContainer'>
        <h1>{title}</h1>

        <BreadCrumbs />
    </div>
    )
}
export default PageTitle

