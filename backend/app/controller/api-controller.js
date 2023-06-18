import config from '../config.js';
import axios from 'axios';

class APIController {
    getWcaData = async (req, res) => {
        const url = "https://www.worldcubeassociation.org/api/v0/persons/2015TKAC02";
        const {token} = config;
        const responce = await axios.get(url, {
            params: {
                Authorization: "Bearer " + 'IWilda6S5GMZemr2iKdmaSlEqZzgIAkthMFLkz3iUp0'
            }
        });
        //console.log(responce);
        //const data = JSON.stringify(responce);
        const data = await responce.data.personal_records;
        res.json(data);
    }

    showImageUpload = (req, res) => {
        res.render('pages/auth/image');
    }

    imageUpload = (req, res) => {
        console.log(req.file, req.filename);
        if(req.file === undefined || req.file === null)
        {
            return res.status(400).json({message: "Image is required"});
        }
        res.json({message: `Image uploaded successfully. Filename: /assets/img/posts/${req.file.filename}`});
    }
}

export default new APIController();