import './Homepage.css';
import React, { useEffect, useState, useRef } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Nodes, {Language} from './mock';
import { LanguageButtons, HomeButton, MenuButton } from './components';
import WelcomePage from './Welcomepage';
import Menu from './Menu';

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
    //   const ref = useRef(null);
    
    //   const handleClickOutside = event => {
    //     if (ref.current && !ref.current.contains(event.target)) {
    //       setIsComponentVisible(false);
    //     }
    //   };

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
        setIndex(0);
        // setIsComponentVisible(false);
        setLanSelected(true)
        setIsMenuOpen(false);
    }

    const MiddleContatiner = () => {
    
        const currNodes = Nodes.filter(n => n.language === currLan || n.language === Language.ALL);
    
        const indexingButton = (index, currIndex) => {
            return(
            <button className='index_button' 
                    key = {index}
                    style = {
                        index == currIndex ? {opacity: 1, fontWeight: "550"} : {opacity: 0.5}
                    }
                    onClick={() => setIndex(index)}>
                {index}
            </button>)}
    
        const IndexButtons = () => {
            return(
                currNodes.map((_n, index) => indexingButton(index, currIndex))
                );
        };
    
        const ViewPostButton = () => {
            return(
                <button class="click_to_view_button" onClick={navigateToPost}>{`${currNodes[currIndex].alt}   >`}</button>
            )
        };
    
        const navigate = useNavigate();
    
        const navigateToPost = () => {
            navigate('/myesweb/post');
        }
    
        const navigateHome = () => {
            navigate('/myesweb');
        }
    
        const currNode = currNodes[currIndex];
        
        // useEffect(() => {
        //     window.sessionStorage.setItem("langSelected", langSelected);
        // }, [langSelected]);

        // useEffect(() => {
        //     window.sessionStorage.setItem("currLan", currLan);
        // }, [currLan]);

        // useEffect(() => {
        //     window.sessionStorage.setItem("currIndex", currIndex);
        // }, [currIndex]);

        // useEffect(() => {
        // }, [currIndex, currLan, currNodes, isComponentVisible]);

        return(
            <>
            <Routes>
                <Route path = "/myesweb" element = {
                    <>
                    <div class="homepage"> 
                        <div class="top_bar">
                            <MenuButton isMenuOpen={isMenuOpen} handleClick={()=>setIsMenuOpen(!isMenuOpen)}/>
                            <div class="index_button_container">
                            <IndexButtons/>
                            </div>
                            <p class="name"> Mocun Ye </p>
                        </div>
                        <div className="content_container">
                            <img class = "centerPhoto" key = {currIndex} src ={require(`./img/${currNode.image}.jpg`)}/>
                            <ViewPostButton/>
                        </div>
                    </div>
                    </>
                } />
                <Route path = "/myesweb/post" element = {
                    <>  
                        <MenuButton handleClick = {()=>setIsMenuOpen(true)}/>
                        <HomeButton handleClick = {navigateHome}/>
                        <p>{currNode.content}</p>
                        <p>currIndex = {currIndex}, currLan = {currLan}</p>
                    </>
                }/>
            </Routes>
            </>
        )
    };
    return(
        <>
        {console.log(currIndex)}
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
        <MiddleContatiner/>}
        </>
    )
}

export default HomePage;
