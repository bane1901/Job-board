const jwt = require('jsonwebtoken');

const vjerujTokenu = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Nema tokena, pristup odbijen' });
    }

    try{
        const podaci =jwt.verify(token,process.env.JWT_SCRIPT);
        req.user = podaci;
        next();
    }catch (err){
        return res.status(403).json({ message: 'Nevazeci token' });
    }
};

//dozvoljavam pristup po odredjenim ulogama

const dozvoliUloge = (...uloge) => {
    return(req,res,next) => {
        if (!uloge.includes(req.user.role)) {
      return res.status(403).json({ message: 'Nemate dozvolu za ovu akciju' });
    }
    next();
};
};

module.exports = {vjerujToken, dozvoliUloge};