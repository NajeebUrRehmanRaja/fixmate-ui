import {useContext,createContext,useState,useEffect} from "react";
import axiosInstance from "../lib/axios";

const AuthContext = createContext(undefined);

export const AuthContextProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [isLoggedIn,setIsLoggedIn] = useState(false)


    const getCurrentUser = async ()=>{
        try {
            const res = await axiosInstance.get("/auth/current-user");
            const {user} = res.data;
            setUser(user);
            setIsLoggedIn(true);
        }catch (error) {
         console.log("Something went wrong while getting current user",error)   
        }
    }

    useEffect(() => {
       if(!user) {
        getCurrentUser();
       }
    }, [user])

    const value = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}