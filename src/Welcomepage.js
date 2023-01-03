import { LanguageButtons } from "./components";
import { MenuButton } from "./components";

const WelcomePage = ( {menuClick, languageButtonsHandleClick}) => {
    return (
        <div class="welcomepage">
            <MenuButton handleClick = {menuClick}/>
            <p>Welcome to the website</p>
            <h1>Mocun Ye</h1>
            <p>select a language</p>
            <LanguageButtons handleClick={languageButtonsHandleClick}/>
        </div>
    );
}

export default WelcomePage;