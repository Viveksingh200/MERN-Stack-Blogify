import jwt from "jsonwebtoken";

export const checkUserAuth = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(404).json({ message: "Token not provided"});
        }

        const token = authHeader?.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(403).json({message: "Invalid token"});
            }

            req.user = decoded;
            next();
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}