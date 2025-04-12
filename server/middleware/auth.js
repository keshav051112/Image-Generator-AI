import jwt from 'jsonwebtoken'

const userAuth = async(req, res, next)=>{

    const {token} = req.headers;
    if(!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    try { 
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);

        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }else{
            return res.status(401).json({message: 'not authorized .Login Again'});
        }
        next();
        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export default userAuth;