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

const MiddleContatiner = () => {

    const [currIndex, setIndex] = useState(0);
    const [currLan, setLan] = useState(Language.ENG);
    const {ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    const switchLan = (language) => {
        setLan(language);
        setIndex(0);
    }

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

    const LanguageButtons = () => {
        const handleClick = (language) => {
            switchLan(language);
            setIsComponentVisible(false);
        }
        return(
            <>
                <button onClick={() => handleClick(Language.ENG)}>ENG</button>
                <button onClick={() => handleClick(Language.CHN)}>CNH</button>
            </>
        )
    }

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
        console.log(currIndex);
        console.log(currNodes[currIndex]);
        console.log(isComponentVisible);
    }, [currIndex, currLan, currNodes, isComponentVisible]);

    useEffect(() =>{
        navigate('/');
    }, [currLan]);

    return(
        <>
        <div ref = {ref}>
            {!isComponentVisible && (
                <button onClick={()=>setIsComponentVisible(true)}> click to show </button>
            )}
            {isComponentVisible && (<LanguageButtons/>)}
        </div>
        <Routes>
            <Route path = "/" element = {
                <> 
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


export default MiddleContatiner;
