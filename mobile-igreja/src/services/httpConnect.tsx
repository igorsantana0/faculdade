import axios from 'axios';
const baseUrl = 'http://localhost:8080';


const http = axios.create({baseURL: baseUrl})

export const HttpClient = {
    get: async (path: string, ...params: any): Promise<any> => {
        return await http.get(path, {params})
    },
    post: async (path: string, body: any): Promise<any>=> {
        return await http.post(path, body)
    }
}