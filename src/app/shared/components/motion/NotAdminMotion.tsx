import React from 'react';
import { Player } from "@lottiefiles/react-lottie-player";
import notAdmin from '../../../../assets/images/lottie/admin.json'

const NotAdminMotion = () => {


    return (
        <Player
            autoplay
            speed={1}
            src={notAdmin}
            style={{width:500, marginTop: -100}}
        >
        </Player>
    )

}
export default NotAdminMotion;