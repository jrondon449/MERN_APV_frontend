import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const autenticarUsuario = async () =>{
            const token = localStorage.getItem('token')

            if(!token){
                setLoading(false)
                return
            }

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setLoading(false)
        }

        autenticarUsuario()
    }, [])

    const logout = () =>{
        localStorage.removeItem('token')
        setAuth({})
    }

    const updatePerfil = async (datos) => {
        const token = localStorage.getItem('token')

            if(!token){
                setLoading(false)
                return
            }

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }
        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const { data } = await clienteAxios.put(url, datos, config)
            
            return{
                msg: 'Su perfil se ha actualizado correctamente'
            }

        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }

    }

    const guardarPassword = async (datos) =>{
        const token = localStorage.getItem('token')

        if(!token){
            setLoading(false)
            return
        }

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }

        try {
            const url = '/veterinarios/actualizar-password'
            const { data } = await clienteAxios.put(url, datos, config)
            
            return {
                msg: data.msg
            }

        } catch (error) {

            return{
                msg:error.response.data.msg,
                error: true
            }

        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                logout,
                updatePerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;