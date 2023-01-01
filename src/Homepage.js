import './Homepage.css';
import React, { useEffect, useState, useRef } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Nodes, {Language} from './mock';

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

const useLanguageSelection = (initState) => {
    
    const [langSelected, setLanSelected] = useState(initState);

    return { langSelected, setLanSelected };
}

const HomePage = () => {
    // const [langSelected, setLanSelected] = useState(false);
    const storedLanguageSelected = window.sessionStorage.getItem("langSelected");
    console.log(storedLanguageSelected);
    // const storedLanguage = window.sessionStorage.getItem("currLan");
    // const storedIndex = window.sessionStorage.getItem("currIndex");

    const [currLan, setCurrLan] = useState(Language.ENG);
    const [currIndex, setIndex] = useState(0);
    const {ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    const [langSelected, setLanSelected] = useState(storedLanguageSelected ? storedLanguageSelected : false);

    const switchLan = (language) => {
        setCurrLan(language);
        setIndex(0);
    }

    const LanguageButtons = () => {
        const handleClick = (language) => {
            switchLan(language);
            setIsComponentVisible(false);
            setLanSelected(true)
        }
        return(
            <>
                <button onClick={() => handleClick(Language.ENG)}>ENG</button>
                <button onClick={() => handleClick(Language.CHN)}>CNH</button>
            </>
        )
    }

    const WelcomePage = () => {
        return (
            <>
            <p>select a language</p>
            <LanguageButtons/>
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
            navigate('/post');
        }
    
        const navigateHome = () => {
            navigate('/');
        }
    
        const HomeButton = () => 
            <button onClick = {navigateHome}>Home</button>;
    
        const currNode = currNodes[currIndex];

        useEffect(() => {
            setLanSelected(JSON.parse(window.sessionStorage.getItem("langSelected")));
          }, []);
        
        useEffect(() => {
            window.sessionStorage.setItem("langSelected", langSelected);
        }, [langSelected]);

    
        useEffect(() => {
            // console.log(JSON.parse(window.sessionStorage.getItem("langSelected")));
        }, [currIndex, currLan, currNodes, isComponentVisible]);
    
        useEffect(() =>{
            navigate('/');
        }, [currLan]);

        return(
            <>
            <Routes>
                <Route path = "/" element = {
                    <> 
                        <div ref = {ref}>
                            {!isComponentVisible && (
                                <button onClick={()=>setIsComponentVisible(true)}> click to show </button>
                            )}
                            {isComponentVisible && (<LanguageButtons/>)}
                        </div>
                        <IndexButtons/>
                        {/* <img class = "centerPhoto" key = {currIndex} src ={require(`./img/${currIndex + 1}.jpg`)}/> */}
                        <img class = "centerPhoto" key = {currIndex} src ={require(`./img/${currNode.image}.jpg`)}/>
                        {/* <img src = {require(n1.image)}/> */}
                        <ViewPostButton/>
                    </>
                } />
                <Route path = "/post" element = {
                    <>
                        <HomeButton/>
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
        {!langSelected ? <WelcomePage/> :  <MiddleContatiner/>}
        </>
    )
}

export default HomePage;
