import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'public/assets/img/posts/');
    },
    filename: function(req, file, callback) {
        const name = Date.now() + path.extname(file.originalname);
        callback(null, name);
    }
});

const upload = multer( {storage} );

export default upload;