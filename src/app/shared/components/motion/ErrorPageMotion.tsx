import { Player } from "@lottiefiles/react-lottie-player";
import motion from '../../../../assets/images/lottie/119787-webpage-error.json'

const ErrorPageMotion = () => {

    return (
        <Player
            autoplay
            loop
            speed={1}
            src={motion}
            style={{margin: '30px 0 0 60px', height:600}}
        >
        </Player>
    )

}
export default ErrorPageMotion;