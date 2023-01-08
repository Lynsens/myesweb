import './Homepage.css';
import React, { useEffect, useState, useRef } from 'react';
import Nodes, {Language} from './mock';

import { LanguageButtons, HomeButton, MenuButton } from './components';
import Animation from './Animation';
import WelcomePage from './Welcomepage';
import Menu from './Menu';
import MiddleContainer from './MiddleContainer';

const useMenuOpen = (initState) => {
    const [isMenuOpen, setIsMenuOpen] = useState(
    initState
    );
      const handleKeyDown = event => {
        if (event.key === "Escape") {
            setIsMenuOpen(false);
          }
        };

      useEffect(() => {
        
        document.addEventListener("keydown", handleKeyDown, true);
        return () => {
          document.removeEventListener("keydown", handleKeyDown, true);
        };
      });

    return { isMenuOpen, setIsMenuOpen };
}

const HomePage = () => {
    const [currLan, setCurrLan] = useState(window.sessionStorage.getItem("currLan") ?? Language.ENG);
    const [currIndex, setIndex] = useState(window.sessionStorage.getItem("currIndex") ?? 0);
    // const renderTime = useRef(0);
    const [renderTime, setRenderTime] = useState(0);
    const {isMenuOpen, setIsMenuOpen} = useMenuOpen(false);

    const [langSelected, setLanSelected] = useState(window.sessionStorage.getItem("langSelected") ?? false);

    const onClickLanguageButton = (language) => {
        setRenderTime(0);
        setCurrLan(language);
        setLanSelected(true)
        setIsMenuOpen(false);
        setIndex(0);
    }
    return(
        <>
        <Menu isOpen={isMenuOpen} onClose={()=>setIsMenuOpen(false)}>
            <p>Language</p>
            <LanguageButtons handleClick={onClickLanguageButton}/>
        </Menu>
        {!langSelected ?(
            <>
            <WelcomePage menuClick={()=>setIsMenuOpen(true)} languageButtonsHandleClick={onClickLanguageButton}/> 
            </>
        )
        : 
        <MiddleContainer 
            currLan={currLan} 
            isMenuOpen={isMenuOpen} 
            setIsMenuOpen={setIsMenuOpen} 
            currIndex={currIndex}
            setIndex={setIndex}
            renderTime={renderTime}
            setRenderTime={setRenderTime}/>
        }
        </>
    )
}

export default HomePage;
