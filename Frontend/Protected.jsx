import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router'

const Protected = ( {children} ) => {

    const navigate = useNavigate()

    const {
        user, loading
    } = useAuth()


    // loading state
    if(loading){
        return <h1>loading...</h1>
    }

    // no loading
    if(!user){
        return <Navigate to = "/login" />
    }


    return children
}

export default Protected
