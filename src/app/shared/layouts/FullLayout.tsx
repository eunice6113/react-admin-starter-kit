import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
import './layout.css'
import LNB from './sidebar/LNB';

const FullLayout: React.FC = () => {

    const [naviOpen, setNaviOpen] = React.useState(true)

    const handleOpen = () => {
        setNaviOpen(!naviOpen)
    }
  
    return(
    <>
        <Header handleOpen={handleOpen} />
        
        <div className='mainContainer'>
            <div className={`lnbContainer navi ${naviOpen ? 'open':'close'}`}>
                <LNB open={naviOpen} />
            </div>
            <div className={`pageContainer ${naviOpen ? 'open':'close'}`}>
                <Outlet />
            </div>
        </div>

        <Footer />
    </>
    )
}

export default FullLayout
