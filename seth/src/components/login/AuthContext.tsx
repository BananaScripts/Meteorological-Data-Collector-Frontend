import React, {createContext, useContext, useState, ReactNode} from "react";

interface User {
    cpf: string,
    token: string,
    [key: string]: any
}

interface AuthContextData{
    user: User | null
    login: (userData: User) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextData | undefined>(undefined)

interface AuthProviderProps{
    children: ReactNode
}


export const AuthProvider: React.FC<AuthProviderProps> = ({children}) =>{
    const [user, setUser] = useState<User | null>(null)

    const login = (userData: User)=>{
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () =>{
        setUser(null)
        localStorage.removeItem('user')
        alert('Usuário deslogado')
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = ():AuthContextData =>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }
    return context
}