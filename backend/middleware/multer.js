import multer from "multer";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend/uploads/')
        console.log('in multer disk')
        },

    filename : function(req, file, cb){
        cb(null,file.originalname)
        console.log('in multer file')

        

    }

})

const upload = multer({storage})

export default upload