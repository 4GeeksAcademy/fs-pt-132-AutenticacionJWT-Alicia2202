import { useState } from "react"

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
    }

    const handleChange = e => {
        const {name, value} =e.target; //AQUI QUE ESTA DESESTRUCTURANDO?
        setFormData({...formData,[name]:value})
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>{formData.type}</p>
            <button onClick={handleType}>
                change to {formData.type==='register'? 'login':"register"}
            </button>
            <input className="email" value={formData.email} onChange={handleChange} type="email"/>
            <input className="password" value={formData.password} type="password"/>
            <input type="submit"  />
        </form>
    )
}

export default Auth