const multer = require ('multer');
const path = require ('path');

//ovdje cuvamo fajlove
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, 'uploads/')
    },
    filename: (req,file,cb) => {
        //ime plius originalna recenzija
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);

    }
});

const upload = multer({storage});
module.exports = upload;