import Post from "../models/PostModel.js";
import path from "path";
import fs from "fs";

export const getPost = async(req,res) =>{
    try {
        const response = await Post.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostbyId = async(req,res) =>{
    try {
        const response = await Post.findOne({
            where : {
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const addPost = async(req,res) =>{

    
    if(req.files === null) return res.status(400).json({msg : "No Files Uploaded!"});

    const name = req.body.title;
    const file = req.files.image;
    const content = req.body.content;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    const allowedType = ['.jpg','.png','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg : "Invalid file type!"})

    if(fileSize > 5000000) return res.status(422).json({msg : "File Size must be less than 5MB!"});

    file.mv(`./public/images/${fileName}`, async (error) => {
        if (error) return res.status(500).json({msg : error.message});
    });



    try {
        await Post.create({
            name : name,
            image : fileName,
            url : url,
            content : content,
            userId : req.userId
        })

        res.status(200).json({msg :"Post created successfully!"});
    } catch (error) {
        console.log(error.message);
    }


}

export const updatePost = async(req,res) =>{
    const post = await Post.findOne({
        where : {
            id : req.params.id
        }
    });

    const name = req.body.title;
    const content = req.body.content;

    if(!post) return res.status(404).json({msg :"Post not found!"});

    let fileName = "";

    if(req.files === null){
        fileName = post.image;
    }else {
        const file = req.files.image;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;

        const allowedType = ['.jpg','.png','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg : "Invalid file type!"})
    
        if(fileSize > 5000000) return res.status(422).json({msg : "File Size must be less than 5MB!"});
        
        const filePath = `./public/images/${post.image}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`,(error) => {
            if (error) return res.status(500).json({msg : error.message});
        });
    }

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Post.update({
            name : name,
            image : fileName,
            url : url,
            content : content
        }, {
            where : {
                id : req.params.id
            }
        });

        res.status(200).json({msg :"Post updated successfully!"});
    } catch (error) {
        console.log(error.message);
    }



}

export const deletePost = async(req,res) =>{
    const post = await Post.findOne({
        where : {
            id : req.params.id
        }
    });

    if(!post) return res.status(404).json({msg :"Post not found!"});

    try {
        const filePath = `./public/images/${post.image}`;
        fs.unlinkSync(filePath);

        await Post.destroy({
            where : {
                id : req.params.id
            }
        });

        res.status(200).json({msg : "Post deleted successfully!"})

    } catch (error) {
        console.log(error.message);
    }
}