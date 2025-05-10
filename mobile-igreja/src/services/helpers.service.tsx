import { HttpClient } from "./httpConnect"

const basePath = "/helpers"
export const HelperService = {
    getAll: async () => {
       return await HttpClient.get(`${basePath}/all`).then(r => {
            return r.data;
        });
    },
      getByUserId: async (id: any) => {
       return await HttpClient.get(`${basePath}/${id}`).then(r => {
            return r.data;
        });
    },
    sendHelper: async (helper: any) =>{
        return await HttpClient.post(`${basePath}/enviar`, helper);
    },
    updateStatus: async (id: any, status: string) => {
        return await HttpClient.post(`${basePath}/atualizar-status/${id}/${status}`, {})
    }
}