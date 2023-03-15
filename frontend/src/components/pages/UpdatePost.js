import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';




const UpdatePost = () => {

    const[title,setTitle] = useState("");
    const[image,setImage] = useState("");
    const[content,setContent] = useState("");
    const[preview,setPreview] = useState("");

    const {id} = useParams();

    const getProductById = async()=> {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        setTitle(response.data.name);
        setImage(response.data.image);
        setContent(response.data.content);
        setPreview(response.data.url);
    }


    const navigate = useNavigate();

    const loadImage = (e) =>{
        const imagePrev = e.target.files[0];
        setImage(imagePrev);
        setPreview(URL.createObjectURL(imagePrev));
    }

    const updatePost = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title",title);
        formData.append("image",image);
        formData.append("content",content);

        try {
            await axios.patch(`http://localhost:5000/posts/${id}`,formData,{
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            });
            navigate("/posts")
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getProductById();
    },[])

    return (
    <div>

        <div className="columns is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={updatePost}>

                    <div className="field">
                        <label htmlFor="">Post Name</label>
                        <div className="control">
                            <input type="text" className='input' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="">Post Content</label>
                        <div className="control">
                            <input type="text" className='input' value={content} onChange={(e) => setContent(e.target.value)} placeholder="Post Content" />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor=""></label>
                        <div className="control">
                            <div className="file">
                                <label htmlFor="" className="file-label">
                                    <input type="file" name="" id="" onChange={loadImage}/>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    {preview ? (
                        <figure className="image is-128x128">
                            <img src={preview} alt="" />
                        </figure>
                    ): ("")}

                    <div className="field">
                        <div className="control">
                            <button className='button is-success'>Update</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>


    </div>
  )
}

export default UpdatePost