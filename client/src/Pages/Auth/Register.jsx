import { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Api_URL } from '../../constant';
import { AuthContext } from '../../Context/AuthContext';

function Register() {
    const [registerForm, setRegisterForm] = useState(
        {
            fullName: "",
            username: "",
            email: "",
            password: "",
            comfirmPassword: ""
        }
    );

    const {registerUser} = useContext(AuthContext);

    const {fullName, username, email, password, comfirmPassword} = registerForm;

    const handelChangeRegisterForm = (e)=> {
        setRegisterForm({...registerForm, [e.target.name]: e.target.value});
    }

    const handleSubmitRegisterForm = async (e)=>{
        e.preventDefault();
        if(password != comfirmPassword) {
            console.log('NOT OK');
        }

        try {
            const registerData = await registerUser(registerForm);
            if(!registerData.status) {
                console.log('co loi');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-[url('./assets/images/anh-coder.jpg')] w-screen h-screen flex justify-center items-center">
            <form 
                className="bg-white rounded-lg w-96 text-center h-fit py-5" 
                onSubmit={handleSubmitRegisterForm}>
                <div className="my-7">
                    <h1 className="text-2xl font-bold indent-1">
                        Register Form
                    </h1>
                </div>
                <div>
                    <div className="mb-3">
                        <span className="block font-normal text-left ml-[44px] mb-1 text-sm">
                            FullName:
                        </span>
                        <input 
                            type="text" 
                            name="fullName" 
                            value={fullName} 
                            onChange={handelChangeRegisterForm}
                            className="border-2 rounded border-slate-500 p-2 w-[300px]"  
                            placeholder="Enter your fullname"/>
                    </div>
                    <div className="mb-3">
                        <span className="block font-normal text-left ml-[44px] mb-1 text-sm">
                            Username:
                        </span>
                        <input 
                            type="text" 
                            name="username" 
                            value={username} 
                            onChange={handelChangeRegisterForm}
                            className="border-2 rounded border-slate-500 p-2 w-[300px]"  
                            placeholder="Enter your username"/>
                    </div>
                    <div className="mb-3">
                        <span className="block font-normal text-left ml-[44px] mb-1 text-sm">
                            Email:
                        </span>
                        <input 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={handelChangeRegisterForm}
                            className="border-2 rounded border-slate-500 p-2 w-[300px]"  
                            placeholder="Enter your email"/>
                    </div>
                    <div className="mb-3">
                        <span className="block font-normal text-left ml-[44px] mb-1 text-sm">
                            Password:
                        </span>
                        <input 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={handelChangeRegisterForm}
                            className="border-2 rounded border-slate-500 p-2 w-[300px]"  
                            placeholder="Enter your password"/>
                    </div>
                    <div className="mb-3">
                        <span className="block font-normal text-left ml-[44px] mb-1 text-sm">
                            Comfirm Password:
                        </span>
                        <input 
                            type="password" 
                            name="comfirmPassword" 
                            value={comfirmPassword} 
                            onChange={handelChangeRegisterForm}
                            className="border-2 rounded border-slate-500 p-2 w-[300px]"  
                            placeholder="Enter your comfirm Password"/>
                    </div>
                </div>
                <div className="my-5">
                    <button 
                        type="submit" 
                        className="text-white  bg-fuchsia-500 text-center rounded-full w-[300px] h-10">
                        Register
                    </button>
                </div>
                <div>
                    <span className="mr-1 font-light">
                        Do you already have an account?
                    </span>
                    <Link 
                        to="/auth/login" 
                        className="text-fuchsia-500">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;