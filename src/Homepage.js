import './Homepage.css';
import React, { useEffect, useState, useRef } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Nodes, {Language} from './mock';

import { LanguageButtons, HomeButton, MenuButton } from './components';
import Animation from './Animation';
import WelcomePage from './Welcomepage';
import Menu from './Menu';
import MiddleContainer from './MiddleContainer';

const useComponentVisible = (initState) => {
    const [isComponentVisible, setIsComponentVisible] = useState(
        initState
      );
      const ref = useRef(null);
    
      const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsComponentVisible(false);
        }
      };

      useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
          document.removeEventListener("click", handleClickOutside, true);
        };
      });

    return { ref, isComponentVisible, setIsComponentVisible };
}

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
    // const {ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const {isMenuOpen, setIsMenuOpen} = useMenuOpen(false);

    const [langSelected, setLanSelected] = useState(window.sessionStorage.getItem("langSelected") ?? false);

    const onClickLanguageButton = (language) => {
        setCurrLan(language);
        // setIsComponentVisible(false);
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
        <MiddleContainer currLan={currLan} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} currIndex={currIndex} setIndex={setIndex}/>}
        </>
    )
}

export default HomePage;
