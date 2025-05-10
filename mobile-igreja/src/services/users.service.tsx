import { HttpClient } from "./httpConnect";

export const UserService = {
  login: async (user: any) => {
   return await  HttpClient.post(`/users`, user).then((response) => {
     return response.data;
    });
  }
}