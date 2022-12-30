import './Homepage.css';
import React, { useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Nodes, {Language} from './mock';

const MiddleContatiner = () => {

    const [currIndex, setIndex] = useState(0);
    const [currLan, setLan] = useState(Language.ENG);

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
        return(
            <>
                <button onClick={() => switchLan(Language.ENG)}>ENG</button>
                <button onClick={() => switchLan(Language.CHN)}>CNH</button>
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
    }, [currIndex, currLan, currNodes]);

    useEffect(() =>{
        navigate('/');
    }, [currLan]);

    return(
        <>
        <LanguageButtons/>
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
