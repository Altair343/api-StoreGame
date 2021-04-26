import multer from 'multer';
import path from 'path';


/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
|
| subida de imagenes al servidor
|
*/


/**
 * Configuración, de donse guardara la imagen y conque nombre 
 * renombrara el archivo 
 *
 */

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})

/**
 * Ejecutando el Middleware de multer teniendo como parametros de configuración 
 * la constante storage, el limite de tamaño maximo del archivo en bytes,
 * validando el tipo de archivo para solo aceptar imagenes. 
 *
 */

export const middleMulter = multer({
    storage,
    limits: { fileSize: 3000000 }, // 3 MB en bytes
    fileFilter: (req, file, cb) => {
        const filetype = /jpeg|jpg|png|gif/;
        const mimetype = filetype.test(file.mimetype);
        const extname = filetype.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb({
            code: "upload/not-valid",
            respont: false,
            message: "Invalid file",
        });
    }
}).single('imgFile');