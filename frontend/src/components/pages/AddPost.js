import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


const AddPost = () => {

    const[token,setToken] = useState("");
    const[expired,setExpird]=useState('');

    const[title,setTitle] = useState("");
    const[image,setImage] = useState("");
    const[content,setContent] = useState("");
    const[preview,setPreview] = useState("");

    const navigate = useNavigate();

    const loadImage = (e) =>{
        const imagePrev = e.target.files[0];
        setImage(imagePrev);
        setPreview(URL.createObjectURL(imagePrev));
    }

    const refreshToken = async() => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setExpird(decoded.exp);
        } catch (error) {
            if(error.response){
            navigate('/')
            }
        }
    }

    useEffect (()=> {
        refreshToken();
    },[]);

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config) => {
        const currentDate = new Date();
        if(expired * 1000 < currentDate.getTime()){
        const response = await axios.get('http://localhost:5000/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken)

        const decoded = jwtDecode(response.data.accessToken);

        }
        return config;
    },(error) => {
        return Promise.reject(error);
    });

    const addPost = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title",title);
        formData.append("image",image);
        formData.append("content",content);

        try {
            await axiosJWT.post("http://localhost:5000/posts",formData,{
                headers : {
                    "Content-Type" : "multipart/form-data",
                    Authorization : `Bearer ${token}`
                }
            });
            navigate("/home")
        } catch (error) {
            console.log(error);
        }
    } 





    return (
        <div>

            <div className="columns is-centered mt-5">
                <div className="column is-half">
                    <form onSubmit={addPost}>

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
                                <button className='button is-success'>Submit</button>
                            </div>


                        </div>

                    </form>


                </div>
            </div>


        </div>
    )
}

export default AddPost