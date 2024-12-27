const jwt=require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        console.log("Authorization header missing");
        return res.status(401).json({ message: "Token not found!" });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        console.log("Token missing in Authorization header");
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log("Decoded JWT Payload:", decoded); // Log the entire payload
        req.user = decoded;
        next();
    }catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expired" });
        }
        return res.status(401).json({ error: "Invalid token" });
    }
};


//Generate krte wakt humme user ka payload chahiye; payload=userdate
//Generate token ek function hai
//Jisme ki payload or userDate and Secret key hota hai
const generateToken=(userData)=>{
    return jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "1h" });
}

const adminMiddleware = (req, res, next) => {
    console.log("Admin Middleware - User:", req.user); // Debug log
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Access denied: Admins only' });
};

const voterMiddleware = (req, res, next) => {
    console.log("Voter Middleware - User:", req.user); // Debug log
    if (req.user && req.user.role === 'voter') {
        return next();
    }
    return res.status(403).json({ message: 'Access denied: Voters only' });
};


module.exports={
    jwtAuthMiddleware,
    generateToken,
    adminMiddleware,
    voterMiddleware
}