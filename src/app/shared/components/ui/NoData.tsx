import * as React from 'react';

interface IProps {
    isTriangleIcon?: boolean;
    isVertical? : boolean;
    message: string;

}
const NoData:React.FC<IProps> = ({isTriangleIcon=true, isVertical=true, message}) => {

    let classes = isVertical ? 'text-center' : 'd-flex-default'
    let msg_classes = isVertical ? 'mt7' : 'ml7'

    return (
        <div className={classes + ' mt20 mb20'}>
            {isTriangleIcon ? 
                <i className='pi pi-exclamation-triangle color-gray f30'></i> 
                :
                <i className='pi pi-exclamation-circle color-gray'></i>
            }
            <p className={msg_classes + ' f12 color-gray'}>{message}</p>
        </div>
    )
}
export default NoData;