import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})

export const middleMulter = multer({
    storage,
    limits: { fileSize: 3000000 },
    fileFilter: (req, file, cb) => {
        const filetype = /jpeg|jpg|png|gif/;
        const mimetype = filetype.test(file.mimetype);
        const extname = filetype.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb({
            respont: false,
            message: "archivo no valido",
        });
    }
}).single('imgFile');