import React from 'react';
import './loading-bar.css';
import loadingBar from '../../../../assets/images/lottie/cloud-loading.json'
import { Player } from '@lottiefiles/react-lottie-player';

const LoadingBar = () => {

    return (
        <div className='loadingBar'>
            <Player
                autoplay
                loop
                speed={2.5}
                src={loadingBar}
                style={{width: 150}}
            >
            </Player>
        </div>
    )
}
export default LoadingBar;