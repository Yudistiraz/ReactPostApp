import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";



const Login = () => {


    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errMsg,setErrMsg] = useState('');


    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/login',{
                email : email,
                password : password
            });
            
            navigate('/home')
        } catch (error) {
            if(error.response) {
                setErrMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div className="login">
            <div className={style.content}>
                <form action="" className={style.form} onSubmit={handleSubmit}>
                    <div className={style.formitem}>
                    <div class="field">
                        <label class={style.label}>Email</label>
                        <div class="control ">
                        <input
                            className="input has-background-grey-dark"
                            class="input "
                            type="email"
                            value={email}
                            onChange = {(e) => setEmail(e.target.value)}
                        />
                        
                        </div>
                        {/* <p class="help is-success">This username is available</p> */}
                    </div>
                    </div>

                    <div className={style.formitem}>
                    <div class="field">
                        <label class={style.label}>Password</label>
                        <div class="control ">
                        <input
                            className="input has-background-grey-dark"
                            class="input "
                            type="password"
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}
                        />
                        </div>
                        {/* <p class="help is-success">This username is available</p> */}
                    </div>
                    </div>

                    <div className={style.buttonSection}>
                        <button class="button is-dark">Login</button>
                    </div>

                    <p className="has-text-centered mt-4" style={{color: "red"}}>{errMsg}</p>
                </form>
            </div>
        </div>
    );
}

export default Login