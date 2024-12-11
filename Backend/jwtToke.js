import jwt from "jsonwebtoken"


const jwtMiddleWare = (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1]

    if(!token) return res.status(400).json({error:"Unauthorized"})

        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.user=decode
            next()
        } catch (error) {
            console.log(error);
            
        }
}


const generateAccessToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'5d'})
}

const generateRefreshToken = ()=>{

}

export {generateAccessToken,generateRefreshToken,jwtMiddleWare}