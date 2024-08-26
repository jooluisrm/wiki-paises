import { createContext, ReactNode, useState } from "react";

type TypeContext = {
    darkMode: boolean,
    setDarkMode: (e: any) => void;
}


export const DarkModeContext = createContext<TypeContext | null>(null);

type Props = {children: ReactNode}

export const ContextProvider = ({ children }: Props) => {
    const [darkMode, setDarkMode] = useState(false);
     // state para exibir modal dos paises
    
    return (
        <DarkModeContext.Provider value={ {darkMode, setDarkMode} }>
            { children }
        </DarkModeContext.Provider>
    )
}
