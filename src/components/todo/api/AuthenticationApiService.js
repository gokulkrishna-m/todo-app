import { apiClient } from "./ApiClient"

export const executeBasicAuth = (token) => apiClient.get(`/basicauth`,{
    headers:{
        Authorization:token
    }
})

export const executeJWTAuth = (username,password) => apiClient.post(`/authenticate`,{username,password})