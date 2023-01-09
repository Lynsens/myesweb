import { Language } from "./mock";

export const LanguageButtons = ({handleClick}) => {
    return(
        <div className="language_buttons_container">
            <button className="language_buttons" onClick={() => {handleClick(Language.ENG)}}>ENG</button>
            <p>|</p>
            <button className="language_buttons" onClick={() => {handleClick(Language.CHN)}}>中文</button>
        </div>
    )
}

export const HomeButton = ({handleClick}) => 
    <button className="home_button" onClick = {handleClick}>Home</button>;

export const MenuButton = (props) => {
    return (
        <div className="menu_button_container">
            {!props.isMenuOpen ? <button className = "menu_button" onClick={props.handleClick}></button> : <button className = "close_button" onClick={props.handleClick}></button>}
        </div>
)}

    