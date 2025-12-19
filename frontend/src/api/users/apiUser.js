import axios from "axios";
import { axiosInstance } from "../axios";
import {toast} from 'react-hot-toast';

export const loginUser = async (data, reset, setUser, setUserToken, navigate, ) =>{
    try {
        const res = await axiosInstance.post('/users/login', data);
        console.log(res.data);
        const token = res.data?.data?.token;
        const user = res.data?.data?.user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setUserToken(token);
        const successMsg = res.data?.message;
        toast.success(successMsg);
        navigate("/");
        
        return res.data;
    } catch (error) {
        const err = error.response?.data?.message || "Error occurred";
        toast.error(err);
    }finally {
        reset()
    }
};

export const registerUser = async (data, reset, setUser, setUserToken, navigate) =>{
    try {
        const res = await axiosInstance.post('/users/register', data);
        console.log(res.data);
        const token = res.data?.data?.token;
        const user = res.data?.data?.user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setUserToken(token);
        const successMsg = res.data?.message;
        toast.success(successMsg);
        navigate("/");
        
    } catch (error) {
        const err = error.response?.data.message || "Error occured";
        toast.error(err);
    }finally{
            reset();
    }
};