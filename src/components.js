import { Language } from "./mock";

export const LanguageButtons = ({handleClick}) => {
    return(
        <div class="language_buttons_container">
            <button class="language_buttons" onClick={() => {handleClick(Language.ENG)}}>ENG</button>
            <p>|</p>
            <button class="language_buttons" onClick={() => {handleClick(Language.CHN)}}>中文</button>
        </div>
    )
}

export const HomeButton = ({handleClick}) => 
    <button onClick = {handleClick}>Home</button>;

export const MenuButton = ({handleClick, isMenuOpen}) => {
    return (
        <div class="menu_button_container">
            {!isMenuOpen ? <button class = "menu_button" onClick={handleClick}></button> : <button class = "close_button" onClick={handleClick}></button>}
        </div>
)}
    