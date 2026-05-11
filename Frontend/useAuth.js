import {login, register, getMe, logout} from "../services/auth.api"
import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { useEffect } from "react"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context 

    // register handle 
    async function handleRegister({username, email, password}) {
        setLoading(true)
        const data = await register({username, email, password})
        setUser(data.user)
        setLoading(false)
        alert("Registration successfully✔️")

    }

     // login handle 
    async function handleLogin({email, password}) {
        setLoading(true)
        const data = await login({email, password})
        // console.log(email, password);
        setUser(data.user)
        setLoading(false)
        
        return data
    }
    

     // getMe handle 
    async function handleGetMe() {
        try{
            setLoading(true)

            const data = await getMe()
            setUser(data.user)
        }
        catch(err) {
            // handle unauthorized  
            if(err.response.status === 401) {
                console.log("User not logged in");
                setUser(null);
            }
            else {
                console.error("Error:", err);
            }
        }
        finally {
            setLoading(false);
        }
    }

    // logout handle 
    async function handleLogout() {
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false);
    }


    // after refreshing window user stay on home / login page
    useEffect(() => {
        handleGetMe()
    }, [])

    return ({
        user, loading, handleRegister, handleGetMe, handleLogin, handleLogout
    })

}