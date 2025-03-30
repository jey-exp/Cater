import jwt from "jsonwebtoken"

export const hash = async(value)=>{
    const hashed = await jwt.sign(value, process.env.REACT_APP_JWT_SECRET);
    return hashed;
}

export const decode = async(hash)=>{
    const decoded = await jwt.verify(hash, process.env.REACT_APP_JWT_SECRET);
    const rehash = await jwt.decode(hash);
    console.log(decoded);
    console.log(rehash);
    return decoded;
}

