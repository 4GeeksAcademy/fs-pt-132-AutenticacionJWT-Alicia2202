import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";


const Private = () => {
    const navigate= useNavigate()

    const {store, dispatch}= useGlobalReducer();

    useEffect(()=>{
        if(localStorage.getItem('token') && !store.user){
            authService.getMe().then(data => console.log(data))
        }
        if(!localStorage.getItem('token')) navigate('/')
    },[store.auth])

    const handleLogout= ()=> {
        authService.logout()
        dispatch({
            type:"logout"
        })
    }
    return(
        <div>Area private
            <h1>Welcome{store.user?.email}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>

    )
}
export default Private