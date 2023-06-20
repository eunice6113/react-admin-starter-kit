export class ClipBoard {

    
    public static copy (copyText):any {

        if(navigator.clipboard) {
            navigator.clipboard.writeText(copyText);
        }
        else {
            const textarea = document.createElement('textarea');
            textarea.value = copyText;
            textarea.style.top = '0px';
            textarea.style.left = '0px';
            textarea.style.position = 'fixed';

            document.body.appendChild(textarea);

            textarea.focus();

            textarea.select();

            document.execCommand('copy');

            document.body.removeChild(textarea);
        }
    }
}