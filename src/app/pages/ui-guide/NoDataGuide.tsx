import * as React from "react";
import { BasePage } from "../../shared/components/base/BasePage";
import ClipboardCopy from "../../shared/components/clipboard-copy/ClipboardCopy";
import NoData from "../../shared/components/ui/NoData";
import './ui-guide.css';

const NoDataGuide: React.FC = () => {

    return(
    <BasePage>
        <div className='previewBox'>
            <h3>Basie</h3>
            <NoData message="데이터가 없습니다" />

            <h3>Horizontal</h3>
            <NoData isVertical={false} isTriangleIcon={false} message="데이터가 없습니다" />
        </div>

        <ClipboardCopy rows={20} copyText={`
import * as React from "react";
import { BasePage } from "../../shared/components/base/BasePage";
import NoData from "../../shared/components/ui/NoData";

const NoDataGuide: React.FC = () => {

    return(
    <BasePage>
        <h3>Basie</h3>
        <NoData message="데이터가 없습니다" />

        <h3>Horizontal</h3>
        <NoData isVertical={false} isTriangleIcon={false} message="데이터가 없습니다" />
    </BasePage>)
}
export default NoDataGuide`} />
    </BasePage>)
}
export default NoDataGuide