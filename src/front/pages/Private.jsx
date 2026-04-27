import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";


const Private = () => {
    const navigate= useNavigate()

    const {store, dispatch}= useGlobalReducer();

    useEffect(()=>{
        if(localStorage.getItem('token') && !store.user){
            authService.getMe().then(data => dispatch({
                type: 'auth',
                payload:{
                    user:data.data
                }
            }))
        }
        if(!localStorage.getItem('token')) navigate('/')
    },[store.auth])

    const handleLogout= ()=> {
        console.log("1. El botón de logout ha sido pulsado");
        authService.logout()
        console.log("2. Se llamó a authService.logout(). Token actual:", localStorage.getItem('token'));
        dispatch({
            type:"logout"
        })
        console.log("3. Se envió el dispatch de 'logout'");
    }
    return(
        <div>Area private
            <h1>Welcome{store.user?.email}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>

    )
}
export default Private