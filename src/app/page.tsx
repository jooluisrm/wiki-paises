"use client"

import { listaPaises } from "@/Api/data";
import { Header } from "@/components/header/Header";
import { Main } from "@/components/Main/Main";
import { ContextProvider, DarkModeContext } from "@/Contexts/DarkModeContext"
import { useContext, useEffect, useState } from "react";


export default function Home() {

  return (
    <ContextProvider>
      
        <Header></Header>
        <Main></Main>
      
    </ContextProvider>
  );
}
