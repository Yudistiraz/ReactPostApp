import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";


const Register = () => {

    const navigate = useNavigate();

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confPassword,setConfPassword] = useState('');
    const [errMsg,setErrMsg] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();



        try {
            await axios.post('http://localhost:5000/register',{
                name : name,
                email : email,
                password : password,
                confPassword : confPassword
            });
            
            navigate('/')
        } catch (error) {
            if(error.response) {
                setErrMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div className="register">
            <div className={style.content}>
                
                <form action="" className={style.form} onSubmit={handleSubmit}>

                    <div className={style.formitem}>
                        <div class="field">
                            <label class={style.label}>Name</label>
                            <div class="control ">
                            <input
                                className="input has-background-grey-dark"
                                class="input "
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            </div>
                            {/* <p class="help is-success">This username is available</p> */}
                        </div>
                    </div>
                    
                    <div className={style.formitem}>
                        <div class="field">
                            <label class={style.label}>Email</label>
                            <div class="control ">
                            <input
                                className="input has-background-grey-dark"
                                class="input "
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                        {/* <p class="help is-success">This username is available</p> */}
                    </div>
                    </div>

                    <div className={style.formitem}>
                    <div class="field">
                        <label class={style.label}>Confirm Password</label>
                        <div class="control ">
                        <input
                            className="input has-background-grey-dark"
                            class="input "
                            type="password"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                        />
                        </div>
                        {/* <p class="help is-success">This username is available</p> */}
                    </div>
                    </div>

                    <div className={style.buttonSection}>
                        <button class="button is-dark">Register</button>
                    </div>

                    <p className="has-text-centered mt-4" style={{color: "red"}}>{errMsg}</p>

                </form>
            </div>
        </div>
    );
}

export default Register