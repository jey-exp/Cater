import CryptoJS from 'crypto-js';

export const hash = async (value) => {
    const secretKey = process.env.REACT_APP_JWT_SECRET;
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
    return encrypted;
};

export const decode = async (hash) => {
    const secretKey = process.env.REACT_APP_JWT_SECRET;
    const bytes = CryptoJS.AES.decrypt(hash, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    const decoded = JSON.parse(decrypted);
    console.log(decoded);
    return decoded;
};
