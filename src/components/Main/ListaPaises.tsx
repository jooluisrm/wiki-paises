import { DarkModeContext } from "@/Contexts/DarkModeContext";
import { useContext } from "react";

type Props = {
    listaPaises: any,
    index: number
}


export const ListaPaises = ({ listaPaises, index }: Props) => {


    const formatNumber = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    const ctx = useContext(DarkModeContext);
    return (
        <>

            <div key={index} className={`cursor-pointer rounded-lg h-auto w-96 md:w-auto md:auto ${ctx?.darkMode == true && `bg-[#2b3743] text-white`} ${ctx?.darkMode == false && 'bg-white'}`}>
                <img className="w-full h-64 rounded-lg rounded-b-none md:h-52" src={listaPaises.flags.png} alt="" />
                <div className="px-3 py-5 flex flex-col gap-4">
                    <div className={`font-bold text-black ${ctx?.darkMode == true && `text-white`}`}>
                        <h2>{listaPaises.name}</h2>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p><span className=" font-semibold">Population:</span> <span>{formatNumber(listaPaises.population)}</span></p>
                        <p><span className=" font-semibold">Region:</span> <span>{listaPaises.region}</span></p>
                        <p><span className=" font-semibold">Capital:</span> <span>{listaPaises.capital}</span></p>
                    </div>
                </div>
            </div>

        </>
    );
}