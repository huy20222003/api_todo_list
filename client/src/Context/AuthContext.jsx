import { createContext, useEffect, useReducer } from "react";
import { initStateAuth, reducer } from "../Reducer/AuthReducer/reducer";
import { Api_URL, LOCAL_STORAGE_TOKEN_NAME } from "../constant";
import { setAuth } from "../Reducer/AuthReducer/action";
import setAuthToken from '../utils/setAuthToken';
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children})=> {
    const [authState, dispatch] = useReducer(reducer, initStateAuth);

    //load user
    const loadUser = async ()=> {
        const localStorageToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
        if(localStorageToken) {
            setAuthToken(localStorageToken);
        }

        try {
            const response = await axios.get(`${Api_URL}/auth`);
            if(response.data.status) {
                dispatch(setAuth({
                    isAuthenticated: true,
                    user: response.data.user
                }));
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch(setAuth({
                isAuthenticated: false,
                user: null
            }));
        }
    }

    useEffect(()=> {
        loadUser();
    }, []);

    //register User
    const registerUser = async (registerForm)=> {
        try {
            const res = await axios.post(`${Api_URL}/auth/register`, registerForm);
            if(res.data.status) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
            }

            await loadUser();

            return res.data;
        } catch (error) {
            if (error.response.data){ 
                return error.response.data;
            } else {
                return { 
                    status: false, 
                    message: error.message 
                }
            }
        }
    }

    //login User
    const loginUser = async (loginForm)=> {
        try {
			const response = await axios.post(`${Api_URL}/auth/login`, loginForm);
			if (response.data.success) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.accessToken
				)
            }
			await loadUser()

			return response.data
		} catch (error) {
			if (error.response.data){
                 return error.response.data;
            } else {
                return { status: false, message: error.message }
            }
		}
    }

    const AuthContextData = {
        loadUser,
        registerUser,
        loginUser
    }

    return (
        <AuthContext.Provider value = {AuthContextData}>
            {children}
        </AuthContext.Provider>
    );
}
