import './Homepage.css';
import React, { useEffect, useState, useRef } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Nodes, {Language} from './mock';

import { HomeButton, MenuButton } from './components';
import Animation from './Animation';


const MiddleContainer = (props) => {
    const DELAY = 1200;
    const [show,setShow] = useState(false);

    const currNodes = Nodes.filter(n => n.language === props.currLan || n.language === Language.ALL);

    const delay = t => new Promise(r => setTimeout(r, t));
    async function onClickIndexButtonDelay(index, t) {
        await setShow(!show);
        await delay(1.1*t);
        await props.setIndex(index);
    }

    const navigate = useNavigate();

    const navigateToPost = () => {
        navigate('/myesweb/post');
    }

    const navigateHome = () => {
        navigate('/myesweb');
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
            <button className="click_to_view_button" onClick={navigateToPost}>{`${currNodes[props.currIndex].alt}   >`}</button>
        )
    };

    const currNode = currNodes[props.currIndex];

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
          ref.current = value; //assign the value of ref to the argument
        },[value]); //this code will run when the value of 'value' changes
        return ref.current; //in the end, return the current ref value.
      }

    const prevLan = usePrevious(props.currLan);

    useEffect(()=>{
        async function triggerImageContent(){
            if(props.renderTime === 0 || prevLan !== props.currLan) {
                await delay(200);
                await setShow(true);
                await props.setRenderTime(1);
            }
            else{
                await setShow(true);
            }
        }
        triggerImageContent();
    },[props.currIndex, props.currLan]);
    
    // useEffect(() => {
    //     window.sessionStorage.setItem("langSelected", langSelected);
    // }, [langSelected]);

    // useEffect(() => {
    //     window.sessionStorage.setItem("currLan", currLan);
    // }, [currLan]);

    return(
        <>
        <Routes>
            <Route path = "/myesweb" element = {
                <>
                <div className="homepage"> 
                    <div className="top_bar">
                        <MenuButton isMenuOpen={props.isMenuOpen} handleClick={()=>props.setIsMenuOpen(!props.isMenuOpen)}/>
                        <div className="index_button_container">
                        <IndexButtons/>
                        </div>
                        <p className="name"> Mocun Ye </p>
                    </div>
                    {console.log(props.renderTime)}
                    <Animation show ={show} duration={DELAY}>
                        <div className="content_container">
                            <img className = "centerPhoto" key = { props.currLan} src ={require(`./img/${currNode.image}.jpg`)}/>
                            <ViewPostButton/>
                        </div>
                    </Animation>
                    {/* <MiddleContent show={show} currIndex={props.currIndex} DELAY={DELAY} currNodes={currNodes}/> */}
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