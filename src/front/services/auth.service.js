const authService = {}
const url = import.meta.env.VITE_BACKEND_URL

authService.auth = async (FormData) => {
    try {
        const resp = await fetch(url + 'api/auth',{
            method : 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(FormData)
        })
        if (!resp.ok) throw new Error ('Error auth')
            const data = await resp.json() //aquí se cuela solo la info necesaria
            console.log(data.token)
            localStorage.setItem("token",data.token)
    } catch (error) {
        console.log(error)
    }
}

export default authService