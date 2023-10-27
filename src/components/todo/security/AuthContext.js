import { useContext, createContext, useState } from "react";
import { executeBasicAuth,executeJWTAuth } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";



export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username,setUsername] = useState(null)
    const [token,setToken] = useState(null)

    // setInterval(() => setNumber(number + 1), 10000)

    // function login(username, password) {
    //     if (username === 'in28minutes' && password === 'dummy') {
    //         // console.log('Success');
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true
    //     } else {
    //         // console.log('Failed');
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }

    // async function login(username, password) {
        
    //     const baToken = 'Basic ' + window.btoa(username+':'+password)

    //     console.log(baToken)

    //     try{
    //         const response =await executeBasicAuth(baToken)

    //         // executeBasicAuth(baToken)
    //         // .then(
    //         //     response => console.log(response)
    //         // ).catch(
    //         //     error => console.log(error)
    //         // )

    //         // setAuthenticated(false)
            
    //         if (response.status == 200) {
    //             // console.log('Success');
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(baToken)

    //             apiClient.interceptors.request.use(
    //                 (config) =>{
    //                     console.log('Interceptor'+config)
    //                     config.headers.Authorization=baToken
    //                     return config
    //                 }
    //             )

    //             return true
    //         } else {
    //             // console.log('Failed');
    //             // setAuthenticated(false)
    //             // setUsername(null)
    //             // setToken(null)
    //             logout()
    //             return false
    //         }
    //     }catch(error){
    //         // setAuthenticated(false)
    //         // setUsername(null)
    //         // setToken(null)
    //         logout()
    //         return false
    //     }
    // }

    async function login(username, password) {

        try{
            const response =await executeJWTAuth(username,password)

            // executeBasicAuth(baToken)
            // .then(
            //     response => console.log(response)
            // ).catch(
            //     error => console.log(error)
            // )

            // setAuthenticated(false)
            
            if (response.status == 200) {
                const jwtToken = 'Bearer '+response.data.token
                console.log(jwtToken);
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) =>{
                        console.log('Interceptor'+config)
                        config.headers.Authorization=jwtToken
                        return config
                    }
                )

                return true
            } else {
                // console.log('Failed');
                // setAuthenticated(false)
                // setUsername(null)
                // setToken(null)
                logout()
                return false
            }
        }catch(error){
            // setAuthenticated(false)
            // setUsername(null)
            // setToken(null)
            logout()
            return false
        }
    }

    function logout() {
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }

    return ( 
        <AuthContext.Provider value = {
            { isAuthenticated, login, logout,username,token }
        } > { children } 
        </AuthContext.Provider>
    )
}