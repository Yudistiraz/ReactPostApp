import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const PostList = () => {

    const [posts,setPosts] = useState([]);

    const getPosts = async () => {
        const response = await axios.get("http://localhost:5000/posts");
        setPosts(response.data);
    }

    const deletePost = async(postId) =>{
        try {
            await axios.delete(`http://localhost:5000/posts/${postId}`)
            getPosts();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        getPosts();
    },[])




return (
    <div className="container mt-5">
        <Link className="button is-success" to="/add">Add New Post</Link>
        <div className="columns is-multiline">

            {posts.map((post) => (
                    <div className="column is-one-quarter" key={post.id}>
                        <div className="card">
        
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src={post.url} alt="Placeholder image"/>
                                </figure>
                            </div>
        
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                    <p className="title is-4">{post.name}</p>
                                    </div>
                                </div>
                            </div>
        
                            <footer className="card-footer">
                                <Link href="" className="card-footer-item" to={`update/${post.id}`}>Edit</Link>
                                <a href="" className="card-footer-item" onClick={() => {deletePost(post.id)}} >Delete</a>
                            </footer>
        
                        </div>
                </div>
            ))}

        </div>
    </div>
);
};

export default PostList;
