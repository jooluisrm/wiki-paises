import { DarkModeContext } from "@/Contexts/DarkModeContext";
import { useContext, useState } from "react";


export const Header = () => {

    const ctx = useContext(DarkModeContext);

    const [textDarkMode, setTextDarkMode] = useState('Dark Mode');

    const DarkMode = () => {
        ctx?.setDarkMode(true);
        setTextDarkMode('Light Mode');
        if (ctx?.darkMode === true) {
            ctx.setDarkMode(false);
            setTextDarkMode('Dark Mode');
        }
        console.log('Modo dark');
    }

    return (
        <header className={`relative top-0 left-0 right-0 z-50 w-full py-8 border-b ${ctx?.darkMode === true && `bg-[#2b3743] border-b-[#202d36] text-white`}`}>
            <div className="container m-auto flex px-4 justify-between md:px-0">

                <h1 className="font-bold text-xl md:text-3xl">Where in the world?</h1>
                <div onClick={DarkMode} className="flex items-center gap-1 font-semibold cursor-pointer ">
                    {ctx?.darkMode ? (
                        <ion-icon name="sunny-outline"></ion-icon>
                    ) : (
                        <ion-icon name="moon-outline"></ion-icon>
                    )}
                    <p>{textDarkMode}</p>
                </div>

            </div>
            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </header>
    );
}