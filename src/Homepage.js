import './Homepage.css';
import React, { useEffect, useState } from 'react';
import Nodes, {Language} from './mock';

const MiddleContatiner = () => {

    const [currIndex, setIndex] = useState(0);
    const [currLan, setLan] = useState(Language.ENG);

    const switchLan = (language) => {
        setLan(language);
        setIndex(0);
    }

    const currNodes = Nodes.filter(n => n.language === currLan);

    const IndexingButton = (index) => {
        return(
        <button className='indexingButton' 
                key = {index}
                onClick={() => setIndex(index)}>
            {index}
        </button>)}

    const IndexButtons = () => {
        return(
            currNodes.map((_n, index) => IndexingButton(index))
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

    const SubTitle = () => {
        return(
            <p>{currNodes[currIndex].word}</p>
        )
    };

    useEffect(() => {
        console.log(currIndex);
        console.log(currNodes[currIndex]);
        // currIndex = 0;
    }, [currIndex, currLan]);

    return(
        <>
        <IndexButtons/>
        {/* <img class = "centerPhoto" key = {currIndex} src ={require(`./img/${currIndex + 1}.jpg`)}/> */}
        <img class = "centerPhoto" key = {currIndex} src ={require(`./img/${currNodes[currIndex].image}.jpg`)}/>
        {/* <img src = {require(n1.image)}/> */}
        <SubTitle/>
        <LanguageButtons/>
        </>
    
    )

};


export default MiddleContatiner;
