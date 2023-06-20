import * as crypto from 'crypto-js';

const iam: any = process.env.REACT_APP_ID; 

export class ApiUtils {

    //사용 예시
    // const ciphertext = crypto.AES.encrypt('암호화할 값', 'secret key').toString();
    // const bytes = crypto.AES.encrypt(ciphertext, 'secret key').toString();
    // const originalText = crypto.toString(crypto.enc.Utf8); // output: '암호화할 값'

    public static generateSignature(path: string, method: string, timestamp: string ) {
        const signingData: string[] = [];
        signingData.push(method);
        signingData.push(' ');
        signingData.push(path);
        signingData.push('\n');
        signingData.push(timestamp);
        signingData.push('\n');
        signingData.push(iam);

        const stringToSign = signingData.join('');
        const signatureBytes = crypto.HmacSHA256(stringToSign, iam.secretKey);
        return crypto.enc.Base64.stringify(signatureBytes);
    }
}
