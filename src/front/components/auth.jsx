import { useState } from "react"
import authService from "../services/auth.service"

const Auth = () =>{

    const [formData, setFormData] = useState ({
        email: '',
        password:'',
        type:'login',
    })

    const handleType = () =>{
        setFormData({...formData, type: formData.type === 'register'? 'login':"register"})
    }

    const handleSubmit = e => {
        e.preventDefault()
        authService.auth(formData).then(data=> console.log(data))
        console.log(formData)
    }

    const handleChange = e => {
        const {name, value} =e.target; 
        setFormData({...formData,[name]:value})
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>{formData.type}</p>
            <button onClick={handleType} type="button">
                change to {formData.type==='register'? 'login':"register"}
            </button>
            <input className="email" name="email" value={formData.email} onChange={handleChange} type="email"/>
            <input className="password" name="password" value={formData.password} onChange={handleChange} type="password"/>
            <input type="submit"  />
        </form>
    )
}

export default Auth