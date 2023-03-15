import React, { useEffect, useState } from 'react'
import "./Home.css";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const[name, setName] = useState('');
  const[token,setToken] = useState('');
  const[expired,setExpird]=useState('');

  const navigate = useNavigate();

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

      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpird(decoded.exp);

    }
    return config;
  },(error) => {
    return Promise.reject(error);
  });

  const refreshToken = async() => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpird(decoded.exp);

    } catch (error) {
      if(error.response){
        navigate('/')
      }
    }
  }

  const getUsers = async() => {
    const response = await axiosJWT.get('http://localhost:5000/users',{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
    console.log(response.data)

  }

  const logout = async() => {
    try {
      await axios.delete('http://localhost:5000/logout');
      navigate('/');

    } catch (error) {
      
    }
  }



  return (
    <div className='HomeContainer'>
      <h1>
        Welcome Back! {name}
      </h1>

      <button className='button is-danger mt-5' onClick={logout}>
        <strong>Log Out</strong>
      </button>

      <button className='button is-info mt-5' onClick={getUsers}>
        <strong>Get Data</strong>
      </button>


    </div>
  )


}

export default Home

