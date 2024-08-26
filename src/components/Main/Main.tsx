import { listaPaises } from "@/Api/data";
import { useContext, useEffect, useState } from "react";
import { ListaPaises } from "./ListaPaises";
import { DarkModeContext } from "@/Contexts/DarkModeContext";
import { Modal } from "../Modal/Modal";

export const Main = () => {

    const [busca, setBusca] = useState('');
    //Esta fazendo a filtragem dos paises e adicionando a "listaPaisesFiltrada"
    const listaPaisesFiltrada = listaPaises.filter((listaPaises) => listaPaises.name.toLowerCase().includes(busca.toLowerCase()));

    const [filterSelect, setFilterSelect] = useState(false);
    const [rodarSeta, setRodarSeta] = useState('transform rotate-180');
    const [infoSelect, setInfoSelect] = useState('Filter by Region');

    const [filtrarContinente, setFiltrarContinente] = useState('');


    const openFilter = () => { // mostra as opt do select
        setFilterSelect(true)
        if (filterSelect === false) setRodarSeta('')
        if (filterSelect === true) {
            setFilterSelect(false);
            setRodarSeta('transform rotate-180');
        }
    }
    const PegarContinente = (e: any) => { // Estou pegando o "data-key" das opt do select
        setFiltrarContinente(e.currentTarget.getAttribute('data-key'))
        console.log(e.currentTarget);
        setFilterSelect(false)
        setInfoSelect(e.currentTarget.getAttribute('data-key'));
        setRodarSeta('transform rotate-180');
    };
    // Esta fazendo a filtragem dos continentes e adicionando a "listaPaisesContinentes"
    const listaPaisesContinentes = listaPaises.filter((listaPaises => listaPaises.region.startsWith(filtrarContinente)));


    const combinarListas = () => { //combina as duas listas em apenas 1 "Lista final"
        const listaCombinada = listaPaisesContinentes.filter((paisContinente) =>
            listaPaisesFiltrada.some((paisFiltrado) => paisFiltrado.name === paisContinente.name)
        );
        return listaCombinada.length > 0 ? listaCombinada : listaPaisesContinentes;
    };
    
    const listaFinal = combinarListas();


    const formatNumber = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // MOdal

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState('');

    
    const handleOpenModal = (index: any) => {
        setSelectedData(index);
        console.log(index);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedData('');
    };

    

    // Modal
    const ctx = useContext(DarkModeContext);

    return (
        <>
            {isModalOpen &&
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} array={listaFinal} formatNumber={formatNumber}></Modal>
            }

            {!isModalOpen &&
                <main className={`w-full min-h-screen pb-10 pt-10 ${ctx?.darkMode === true && `bg-[#202d36] text-white`} ${ctx?.darkMode == false && 'bg-[#e9e9e9]'}`}>
                    <div className="container m-auto">
                        <div className="pb-16 flex flex-col items-center gap-8 md:flex-row md:gap-0 md:justify-between md:items-start">

                            <div className="relative flex items-center">
                                <div className={`absolute left-4 text-gray-500 ${ctx?.darkMode === true && `text-white`}`}>
                                    <ion-icon name="search-outline"></ion-icon>
                                </div>

                                <input
                                    className={`pl-12 w-80 py-4 px-4 rounded-lg outline-none shadow-md md:w-96 ${ctx?.darkMode == true && `bg-[#2b3743] text-white placeholder:text-white`} ${ctx?.darkMode == false && 'bg-white'}`}
                                    placeholder="Search for a country..."
                                    type="search"
                                    name=""
                                    id=""
                                    value={busca}
                                    onChange={e => setBusca(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <div onClick={openFilter} className={`flex justify-between items-center w-48 py-4 px-4 shadow-md rounded-lg ${ctx?.darkMode && `bg-[#2b3743]`} ${ctx?.darkMode == false && 'bg-white'}`}>
                                    <div>{infoSelect}</div>
                                    <div className={rodarSeta}><ion-icon name="chevron-down-outline"></ion-icon></div>

                                </div>
                                {filterSelect &&
                                    <div className={`absolute w-48 mt-16 px-4 rounded-lg flex flex-col gap-2 py-2 text-sm text-gray-500 cursor-pointer ${ctx?.darkMode && `bg-[#2b3743] text-white`} ${ctx?.darkMode == false && 'bg-white'}`}>
                                        <p onClick={PegarContinente} data-key="Africa">Africa</p>
                                        <p onClick={PegarContinente} data-key="Americas">Americas</p>
                                        <p onClick={PegarContinente} data-key="Asia">Asia</p>
                                        <p onClick={PegarContinente} data-key="Europe">Europe</p>
                                        <p onClick={PegarContinente} data-key="Oceania">Oceania</p>
                                    </div>
                                }

                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="grid grid-cols-1 gap-9 md:grid-cols-4">
                                {
                                    listaFinal.map((listaPaises: any, index: any) => (
                                        <div onClick={() => handleOpenModal(index)} key={index} className={`cursor-pointer rounded-lg h-auto w-96 md:w-auto md:auto ${ctx?.darkMode == true && `bg-[#2b3743] text-white`} ${ctx?.darkMode == false && 'bg-white'}`}>
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
                                    ))
                                }

                            </div>
                        </div>

                    </div>
                </main>
            }
        </>



    );
}