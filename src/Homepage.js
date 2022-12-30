import './Homepage.css';
import React, { useEffect, useState } from 'react';

const MiddleContatiner = () => {
    
    const [currIndex, setIndex] = useState(0);

    const slides = [
        'photo-1544511916-0148ccdeb877',
        'photo-1544572571-ab94fd872ce4',
        'reserve/bnW1TuTV2YGcoh1HyWNQ_IMG_0207.JPG',
        'photo-1540206395-68808572332f',
      ]
      
    const l = [0,1,2];
    const imgs = ['./img/1.jpg', './img/1.jpg', './img/1.jpg'];
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
        <div style = {{backgroundImage: `url(./img/${currIndex + 1}.jpg)`}} />
        </>
    
    )

};


export default MiddleContatiner;
