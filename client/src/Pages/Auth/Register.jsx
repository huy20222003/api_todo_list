import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../constant';
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
    const navigate = useNavigate();

    const {fullName, username, email, password, comfirmPassword} = registerForm;

    const handelChangeRegisterForm = (e)=> {
        setRegisterForm({...registerForm, [e.target.name]: e.target.value});
    }

    const handleSubmitRegisterForm = async (e)=>{
        e.preventDefault();
        if(password != comfirmPassword) {
            console.log('Password does not match');
        }

        try {
            const registerData = await registerUser(registerForm);
            if(!registerData.status) {
                console.log('An error has occurred');
            } else {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, registerData.accessToken);
                navigate('/auth/login');
            }
        } catch (error) {
            console.log(error);
        }
        setRegisterForm({fullName: '', username: '', email: '', password: '', comfirmPassword: ''});
    }

    return (
        <div className="bg-[url('./assets/images/anh-coder.jpg')] w-screen h-screen flex justify-center items-center">
            <form 
                className="bg-white rounded-lg w-[340px] lg:w-96 sm:w-[350px] text-center h-fit pb-2" 
                onSubmit={handleSubmitRegisterForm}>
                <div className="my-7">
                    <h1 className="text-xl lg:text-2xl font-bold indent-1">
                        Register Form
                    </h1>
                </div>
                <div>
                    <div className="mb-3 w-full">
                        <span className="block font-normal text-left ml-[44px] mb-1 lg:text-sm sm:text-sm text-xs">
                            FullName:
                        </span>
                        <input 
                            type="text" 
                            name="fullName" 
                            value={fullName} 
                            onChange={handelChangeRegisterForm}
                            className="border-2 rounded border-slate-500 p-2 w-4/5"  
                            placeholder="Enter your fullname"/>
                    </div>
                    <div className="mb-3 w-full">
                        <span className="block font-normal text-left ml-[44px] mb-1 lg:text-sm sm:text-sm text-xs">
                            Username:
                        </span>
                        <input 
                            type="text" 
                            name="username" 
                            value={username} 
                            onChange={handelChangeRegisterForm}
                            className="border-2 rounded border-slate-500 p-2 w-4/5"  
                            placeholder="Enter your username"/>
                    </div>
                    <div className="mb-3 w-full">
                        <span className="block font-normal text-left ml-[44px] mb-1 lg:text-sm sm:text-sm text-xs">
                            Email:
                        </span>
                        <input 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={handelChangeRegisterForm}
                            className="border-2 rounded border-slate-500 p-2 w-4/5"  
                            placeholder="Enter your email"/>
                    </div>
                    <div className="mb-3 w-full">
                        <span className="block font-normal text-left ml-[44px] mb-1 lg:text-sm sm:text-sm text-xs">
                            Password:
                        </span>
                        <input 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={handelChangeRegisterForm}
                            className="border-2 rounded border-slate-500 p-2 w-4/5"  
                            placeholder="Enter your password"/>
                    </div>
                    <div className="mb-3 w-full">
                        <span className="block font-normal text-left ml-[44px] mb-1 lg:text-sm sm:text-sm text-xs">
                            Comfirm Password:
                        </span>
                        <input 
                            type="password" 
                            name="comfirmPassword" 
                            value={comfirmPassword} 
                            onChange={handelChangeRegisterForm}
                            className="border-2 rounded border-slate-500 p-2 w-4/5"  
                            placeholder="Enter your comfirm Password"/>
                    </div>
                    <div className="text-right mr-10 mt-[-9px]">
                        <span className="lg:text-sm sm:text-sm text-xs cursor-pointer hover:text-violet-600">Forgot password?</span>
                    </div>
                </div>
                <div className="my-4 w-full">
                    <button 
                        type="submit" 
                        className="text-white  bg-fuchsia-500 text-center rounded-full w-4/5 h-10">
                        Register
                    </button>
                </div>
                <div>
                    <span className="mr-1 font-light lg:text-sm sm:text-sm text-xs">
                        Do you already have an account?
                    </span>
                    <Link 
                        to="/auth/login" 
                        className="text-fuchsia-500 lg:text-sm sm:text-sm text-xs">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;