import { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

function Login() {
    const [loginForm, setLoginForm] = useState(
        {
            username: "",
            password: ""
        }
    );

    const {username, password} = loginForm;
    const { loginUser } = useContext(AuthContext);

    const handleChangeLoginForm = (e)=> {
        setLoginForm({...loginForm, [e.target.name]: e.target.value});
    }

    const handleSubmitLoginForm = async (e)=> {
        e.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            console.log(loginData);
            if(!loginData.status) {
                console.log('co loi');
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="bg-[url('./assets/images/anh-coder.jpg')] w-screen h-screen flex justify-center items-center">
            <form className="bg-white rounded-lg w-96 text-center h-fit py-5" onSubmit={handleSubmitLoginForm}>
                <div className="my-7">
                    <h1 className="text-2xl font-bold indent-1">
                        Login Form
                    </h1>
                </div>
                <div>
                    <div className="mb-3">
                        <span className="block font-normal text-black text-left text-sm ml-[44px] mb-1">
                            Username:
                        </span>
                        <input 
                            type="text" 
                            name="username" 
                            value={username}
                            onChange={handleChangeLoginForm}
                            className="border-2 rounded border-slate-500 p-2 w-[300px]"  
                            placeholder="Enter your username"/>
                    </div>
                    <div className="mb-3">
                        <span className="block font-normal text-black text-left text-sm ml-[44px] mb-1">
                            Password:
                        </span>
                        <input 
                            type="password" 
                            name="password" 
                            value={password}
                            onChange={handleChangeLoginForm}
                            className="border-2 rounded border-slate-500 p-2 w-[300px]"  
                            placeholder="Enter your password"/>
                    </div>
                </div>
                <div className="my-5">
                    <button 
                        type="submit" 
                        className="text-white  bg-fuchsia-500 text-center rounded-full w-[300px] h-10">
                        Login
                    </button>
                </div>
                <div>
                    <span className="mr-1 font-light text-black">
                        Do not have an account?
                    </span>
                    <Link 
                        to="/auth/register" 
                        className="text-fuchsia-500">
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;