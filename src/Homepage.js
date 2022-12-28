import './Homepage.css';
import React, { useEffect, useState } from 'react';

const MiddleContatiner = () => {
    
    const [currIndex, setIndex] = useState(0);

    const l = [0,1,2];
    const imgs = ['./1.jpg', './1.jpg', './1.jpg'];
    const t = ["img1", "img2", "img3"];

    const handleClick = (index) => {
        setIndex(index);
    }

    const IndexingButton = (index) => {
        return(
        <button className='indexingButton' 
                key = {index}
                onClick={() => handleClick(index)}>
            {index}
        </button>)}

    const IndexButtons = () => {
        return(
            l.map( i => IndexingButton(i))
            );
    };

    const SubTitle = () => {
        return(
            <p>{t[currIndex]}</p>
        )
    };

    useEffect(() => {
        console.log(currIndex);
    }, [currIndex]);

    return(
        <>
        <IndexButtons/>
        <img class = "centerPhoto" key = {currIndex} src ={require(`./img/${currIndex + 1}.jpg`)}/>
        <SubTitle/>
        </>
    
    )

};


export default MiddleContatiner;
