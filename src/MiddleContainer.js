import './Homepage.css';
import React, { useEffect, useState, useRef } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Nodes, {Language} from './mock';

import { LanguageButtons, HomeButton, MenuButton } from './components';
import Animation from './Animation';
import WelcomePage from './Welcomepage';
import Menu from './Menu';

const MiddleContainer = (props) => {
    const DELAY = 1000;
    const [show,setShow] = useState(false);

    const currNodes = Nodes.filter(n => n.language === props.currLan || n.language === Language.ALL);

    const delay = t => new Promise(r => setTimeout(r, t));

    async function onClickIndexButtonDelay(index, t) {
        await setShow(!show);
        await delay(1.1*t);
        await props.setIndex(index);
    }

    const indexingButton = (index) => {
        return(
        <button className='index_button' 
                key = {index}
                style = {
                    index == props.currIndex ? {opacity: 1, fontWeight: "550"} : {opacity: 0.5}
                }
                onClick={() => onClickIndexButtonDelay(index, DELAY)}>
            {index}
        </button>)}

    const IndexButtons = () => {
        return(
            currNodes.map((_n, index) => indexingButton(index, props.currIndex))
            );
    };

    const ViewPostButton = () => {
        return(
            <button class="click_to_view_button" onClick={navigateToPost}>{`${currNodes[props.currIndex].alt}   >`}</button>
        )
    };

    const navigate = useNavigate();

    const navigateToPost = () => {
        navigate('/myesweb/post');
    }

    const navigateHome = () => {
        navigate('/myesweb');
    }

    const currNode = currNodes[props.currIndex];


    useEffect(()=>{
        async function triggerImageContent(){
            await setShow(true);
        }
        triggerImageContent();
    },[props.currIndex]);
    
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
                        <MenuButton isMenuOpen={props.isMenuOpen} handleClick={()=>props.setIsMenuOpen(!props.isMenuOpen)}/>
                        <div class="index_button_container">
                        <IndexButtons/>
                        </div>
                        <p class="name"> Mocun Ye </p>
                    </div>
                    <Animation show ={show} duration={DELAY}>
                        <div className="content_container">
                            <img class = "centerPhoto" key = {props.currIndex} src ={require(`./img/${currNode.image}.jpg`)}/>
                            <ViewPostButton/>
                        </div>
                    </Animation>
                    {/* <button onClick ={onClickIndexButton(show)}> click to show</button> */}
                </div>
                </>
            } />
            <Route path = "/myesweb/post" element = {
                <>  
                    <MenuButton handleClick = {()=>props.setIsMenuOpen(true)}/>
                    <HomeButton handleClick = {navigateHome}/>
                    <p>{currNode.content}</p>
                    <p>props.currIndex = {props.currIndex}, currLan = {props.currLan}</p>
                </>
            }/>
        </Routes>
        </>
    )
};

export default React.memo(MiddleContainer);