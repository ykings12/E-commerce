import jwt from "jsonwebtoken";

const generateToken=(res,userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"30d",
    });

    //set JWT as an HTTP-only cookie
    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'developement',
        sameSite:'strict',
        maxAge: 30*24*60*60*1000
    });

    return token;
};

export default generateToken;