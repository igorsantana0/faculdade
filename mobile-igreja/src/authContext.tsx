import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { UserService } from "./services/users.service";

type User = {
    id: string;
    name: string;
    email: string;
    profile: string;
}

type AuthContextData = {
    user: User | null;
    loading: boolean;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    devLogin: (user:  User) => Promise<void>
    signOut: () => Promise<void>;
    updateUser: () => Promise<void>;
    errors: any
}

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode
}

//Criar o contexto

const AuthContext = createContext<AuthContextData>({} as AuthContextData)
const AUTH_STORAGE_KEY = '@mobile-igreja:auth'
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loading,setLoading] = useState<boolean>(false)
    const [errors,setErrors] = useState<any>()

    const redirect = (userData: User) => {
        const profile = userData?.profile?.toUpperCase() || '';
        if(profile.includes("IGREJA")){
            router.replace('/igreja')
        }else if(profile.includes("CONTRIBUIDOR")){
            router.replace('/(tabs)/contribuidor/contribuicoes')
        }else{
            router.replace('/')
        }
    }
    useEffect(() => {
        async function loadStoreData() {
            setLoading(true)
            let us  = {} as User
            try {
                const storeUser = await AsyncStorage.getItem(AUTH_STORAGE_KEY)
                if (storeUser) {
                    const usr = JSON.parse(storeUser);
                    setUser(usr)
                    us = usr;
                }

            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
            redirect(us)
        
        }
        loadStoreData()
    }, [])

    const devLogin = async (user: User) => {
        setLoading(true)

        let us = {} as User
        try {
            console.log(user)
            await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
            setUser(user)
            us = user
           
        }
        catch (e) {
            console.error('erro de login: ', e)
        }finally{
            setLoading(false)
        }
        redirect(us)
    }
    const signIn = async ({ email, password }: SignInCredentials) => {
        setLoading(true)
        let us = {} as User
        setErrors(null)

        try {
 
            const userData : any= await UserService.login({email, password})

    

            await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
            setUser(userData)
            us = userData
           
        }
        catch (e) {
            console.error('erro de login: ', e)
            setErrors("Usuário/Senha incorretas")

        }finally{
            setLoading(false)
        }
        redirect(us)
    }
    const signOut = async () => {
        try {
            await AsyncStorage.removeItem(AUTH_STORAGE_KEY)
            setUser(null)
            redirect({} as User)
        }
        catch (e) {

        }
    }

    const updateUser = async () => { }

   
    return (
        <AuthContext.Provider
            value={
                {
                    devLogin,user, loading, signIn, signOut, updateUser, errors
                }
            }>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth(): AuthContextData {
    const context = useContext(AuthContext)
    if (!context) { throw new Error('useAuth deve ser usado dentro de um AuthProvider'); }
    return context
}
