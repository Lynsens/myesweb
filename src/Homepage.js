import './Homepage.css';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Nodes, {Language} from './mock';
import { LanguageButtons, HomeButton } from './components';

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
        // document.addEventListener("keydown", handleHideDropdown, true);
        document.addEventListener("click", handleClickOutside, true);
        return () => {
        //   document.removeEventListener("keydown", handleHideDropdown, true);
          document.removeEventListener("click", handleClickOutside, true);
        };
      });

    return { ref, isComponentVisible, setIsComponentVisible };
}

const HomePage = () => {
    const [currLan, setCurrLan] = useState(window.sessionStorage.getItem("currLan") ?? Language.ENG);
    const [currIndex, setIndex] = useState(window.sessionStorage.getItem("currIndex") ?? 0);
    const {ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    const [langSelected, setLanSelected] = useState(window.sessionStorage.getItem("langSelected") ?? false);

    const handleClick = (language) => {
        setCurrLan(language);
        setIndex(0);
        setIsComponentVisible(false);
        setLanSelected(true)
    }

    const WelcomePage = () => {
        return (
            <>
            <p>select a language</p>
            <LanguageButtons handleClick={handleClick}/>
            </>
        );
    }
    
    const MiddleContatiner = () => {
    
        const currNodes = Nodes.filter(n => n.language === currLan || n.language === Language.ALL);
    
        const indexingButton = (index) => {
            return(
            <button className='indexingButton' 
                    key = {index}
                    onClick={() => setIndex(index)}>
                {index}
            </button>)}
    
        const IndexButtons = () => {
            return(
                currNodes.map((_n, index) => indexingButton(index))
                );
        };
    
        const ViewPostButton = () => {
            return(
                <button onClick={navigateToPost}>{currNodes[currIndex].alt}</button>
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
        
        useEffect(() => {
            window.sessionStorage.setItem("langSelected", langSelected);
        }, [langSelected]);

        useEffect(() => {
            window.sessionStorage.setItem("currLan", currLan);
        }, [currLan]);

        useEffect(() => {
            window.sessionStorage.setItem("currIndex", currIndex);
        }, [currIndex]);

        useEffect(() => {
            // console.log(JSON.parse(window.sessionStorage.getItem("langSelected")));
        }, [currIndex, currLan, currNodes, isComponentVisible]);
    
        useEffect(() =>{
            navigate('/myesweb');
        }, [currLan]);

        return(
            <>
            <Routes>
                <Route path = "/myesweb" element = {
                    <> 
                        <div ref = {ref}>
                            {!isComponentVisible && (
                                <button class = "language_button" onClick={()=>setIsComponentVisible(true)}/>
                            )}
                            {isComponentVisible && (<LanguageButtons handleClick={handleClick}/>)}
                        </div>
                        <IndexButtons/>
                        {/* <img class = "centerPhoto" key = {currIndex} src ={require(`./img/${currIndex + 1}.jpg`)}/> */}
                        <img class = "centerPhoto" key = {currIndex} src ={require(`./img/${currNode.image}.jpg`)}/>
                        {/* <img src = {require(n1.image)}/> */}
                        <ViewPostButton/>
                    </>
                } />
                <Route path = "/myesweb/post" element = {
                    <>
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
        {!langSelected ? <WelcomePage/> : <MiddleContatiner/>}
        </>
    )
}

export default HomePage;
