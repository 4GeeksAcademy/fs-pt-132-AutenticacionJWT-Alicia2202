import { useState } from "react"
import authService from "../services/auth.service"
import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"



const Auth = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        type: 'login',
    })

    const handleType = () => {
        setFormData({ ...formData, type: formData.type === 'register' ? 'login' : "register" })
    }

    const handleSubmit = e => {
        e.preventDefault()
        authService.auth(formData).then(data => dispatch({
            type: 'auth',
            payload: {
                user: data.data
            }
        }),

            navigate('/private')
        )
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-8 col-sm-12">
                    <div className="card shadow p-3 mb-5 bg-white rounded p-4 ">
                        <h5 className="card-tittle text-center mb-4 text-capitalize">{formData.type}</h5>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input className="form-control email" id="email" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="example@email.com" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input className="form-control password" id="password" name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Enter your password" />
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="mb-3">
                                        <input className="form-control shadow-sm bg-primary text-white rounded" type="submit" />
                                    </div>
                                    <div className="mb-1 mt-1">
                                        <button onClick={handleType} type="button" className="btn btn-link btn-sm text-decoration-none">
                                            Switch to {formData.type === 'register' ? 'login' : "register"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth