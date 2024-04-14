import React from "react"

const userInitialState = {username: localStorage.getItem("username"), token: localStorage.getItem("token")}

const contextInitialState = {currentUser: userInitialState, login: () => {}, logout: () => {}}

export const CurrentUserContext = React.createContext(contextInitialState)

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState(userInitialState)

    async function login({username, token}) {
        localStorage.setItem("username", username)
        localStorage.setItem("token", token)
        setCurrentUser({username, token})
    }

    async function logout() {
        localStorage.removeItem("username")
        localStorage.removeItem("token")
        setCurrentUser({username: "", token: ""})
    }

    return (
        <CurrentUserContext.Provider value={{currentUser, login, logout}}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export const useCurrentUser = () => React.useContext(CurrentUserContext)