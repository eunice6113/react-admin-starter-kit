import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const alertDialog = () => {
    
    const confirm = ( props ) => {

        //header(타이틀)이 있는 경우 withHeader 클래스를 붙인다.
        // console.log('props.header', props.header)
        let className = ''
        if(props.className === undefined && props.header !== undefined) {
            className = 'withHeader'
        } else if(props.className !== undefined && props.header !== undefined) {
            className = props.className + ' withHeader'
        }

        confirmDialog({
            message: props.message,
            header: props.header,
            icon: props.icon,
            rejectLabel: props.rejectLabel,
            acceptLabel: props.acceptLabel,
            acceptClassName: props.acceptClassName,
            rejectClassName: props.rejectClassName,
            position: props.position,
            children: props.children,
            accept: props.accept,
            reject: props.reject,
            appendTo: props.appendTo,
            className: className //props.className,
        });
    };

    return {
        confirm,
        ConfirmDialog,
        confirmDialog,
    }
}
export default alertDialog;