import * as React from 'react';
import { Menubar } from 'primereact/menubar';
import './page-title.css'
import { Link } from 'react-router-dom';

interface IProps {
    title: string;
    breadcrumbs?: string[];
}

const AdminPageTitle: React.FC<IProps> = ({title, breadcrumbs}) => {

    React.useEffect(() => {

    }, [])

    const items = [
        {
            label: 'menu1',
            items: [
                {
                    label: 'Left',
                    url: '',
                },
                {
                    label: 'Right',
                    url: '',
                },
                {
                    label: 'Center',
                    url: '',
                },
                {
                    label: 'Justify',
                    url: '',
                },

            ]
        },
    ];

    const items2 = [
        {
            label: 'menu2',
            items: [
                {
                    label: 'Left',
                    url: '',
                },
                {
                    label: 'Right',
                    url: '',
                },

            ]
        },
    ];

    const items3 = [
        {
            label: 'menu3',
            items: [
                {
                    label: 'Left',
                    url: '',
                },
                {
                    label: 'Right',
                    url: '',
                },

            ]
        },
    ];

    return(
    <div className='pageTitleContainer'>
        <h1>{title}</h1>

        <div className='breadCrumbs'>
            <Link to='/' className='menuTxt'>Home</Link> 
            <i className='pi pi-chevron-right' />
            <Menubar model={items} />
            <i className='pi pi-chevron-right' />
            <Menubar model={items2} />
            <i className='pi pi-chevron-right' />
            <Menubar model={items3} />
        </div>
    </div>
    )
}
export default AdminPageTitle

