import { listaPaises } from "@/Api/data";
import { DarkModeContext } from "@/Contexts/DarkModeContext";
import { useContext, useState } from "react";


type Props = {
    isOpen: boolean,
    onClose: () => void,
    data: any,
    array: any,
    formatNumber: (e: any) => void
}


export const Modal = ({ isOpen, onClose, data, array, formatNumber }: Props) => {
    if (!isOpen) return null;


    const ctx = useContext(DarkModeContext);

    return (
        <section className={`min-h-screen ${ctx?.darkMode === true && `bg-[#202d36] text-white`}`}>
            <div className="container mx-auto">
                <div className="py-10">
                    <button onClick={onClose} className={`shadow-xl border border-gray-200 rounded-md  text-center px-6 py-3
                     ${ctx?.darkMode === true && `bg-[#2b3743] border-0`}
                `}>
                        ⬅ Back
                    </button>
                </div>
                <main className="grid grid-cols-1 md:grid-cols-2 md:justify-start md:items-center">
                    <div className="flex justify-center md:justify-start">
                        <img className="w-[550px]" src={array[data].flags.svg} alt="" />
                    </div>
                    <div className="w-full">
                        <div className="pt-10 pb-5">
                            <h1 className="text-xl font-bold">{array[data].name}</h1>
                        </div>
                        <div className="grid grid-cols-1 gap-10 text-sm md:grid-cols-2 md:justify-around md:mb-10">
                            <div className="grid grid-cols-1 gap-1">
                                <p><span className="font-bold">Native Name:</span> {array[data].nativeName}</p>
                                <p><span className="font-bold">Population:</span> {formatNumber(array[data].population)}</p>
                                <p><span className="font-bold">Region:</span> {array[data].region}</p>
                                <p><span className="font-bold">Sub Region:</span> {array[data].subregion}</p>
                                <p><span className="font-bold">Capital:</span> {array[data].capital}</p>
                            </div>
                            <div className="grid grid-cols-1">
                                <p><span className="font-bold">Top Level Domain:</span> {array[data].topLevelDomain}</p>
                                <p><span className="font-bold">Currencies:</span> {array[data].currencies[0].name}</p>
                                <p className="flex gap-1"><span className="font-bold">Languages: </span>{array[data].languages?.map((idioma: string[], index: number) => (
                                    <p key={index}>{idioma.name}</p>
                                ))}</p>
                            </div>
                        </div>
                        <div className="py-5">
                            <p><span className="font-bold">Border Countriens:</span></p>
                            <p className="flex items-center gap-2 text-sm">{array[data].borders?.map((fronteiras: string[]) => (
                                <div className={`text-center border border-gray-400 rounded-md py-1 px-4 ${ctx?.darkMode === true && `bg-[#2b3743] border-0`}`}>{fronteiras}</div>
                            ))}</p>
                        </div>
                    </div>
                </main>
            </div>

        </section>
    );
}