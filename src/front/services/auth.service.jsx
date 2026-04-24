const authService = {}
const url = import.meta.env.VITE_BACKEND_URL

authService.auth = async (FormData) => {
    try {
        const resp = await fetch(url + '/api/auth',{
            method : 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(FormData)
        })
        if (!resp.ok) throw new Error ('Error auth')
    } catch (error) {
        console.log(error)
    }
}