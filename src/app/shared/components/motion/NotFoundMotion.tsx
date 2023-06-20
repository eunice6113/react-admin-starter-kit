import React from 'react';
import { Player } from "@lottiefiles/react-lottie-player";
import notFound from '../../../../assets/images/lottie/3146-404page.json'

const NotFoundMotion = () => {


    return (
        <Player
            autoplay
            // loop={play}
            speed={1}
            src={notFound}
            style={{height:800}}
        >
        </Player>
    )

}
export default NotFoundMotion;