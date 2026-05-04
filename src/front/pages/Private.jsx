import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";


const Private = () => {
    const navigate = useNavigate()

    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        if (localStorage.getItem('token') && !store.user) {
            authService.getMe().then(data => dispatch({
                type: 'auth',
                payload: {
                    user: data.data
                }
            }))
        }
        if (!localStorage.getItem('token')) navigate('/')
    }, [store.auth])

    const handleLogout = () => {
        
        authService.logout()

        dispatch({
            type: "logout"
        })
        
    }
    return (
        <div className="container-fluid mt-5">
            <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                    <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Hi, <span className="username">{store.user?.email?.split('@')[0]||"user"} </span></h1>
                    <p className="lead text-secondary">Welcome to your private area. Here you can control your profile</p>
                    <button className="btn btn-lg shadow-sm p-1 rounded button-logout" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket logout" ></i> Logout</button>
                </div>
            </div>
            </div>

            )
}

export default Private