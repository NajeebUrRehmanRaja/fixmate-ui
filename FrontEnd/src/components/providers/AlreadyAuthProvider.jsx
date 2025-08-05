import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'


export const AlreadyAuthProvider = ({children}) => {
    const {isLoggedIn} = useAuth();

    const alreadyLoggedIn = !!isLoggedIn;

    return  alreadyLoggedIn ? <Navigate to="/" /> : <>{children}</>
}