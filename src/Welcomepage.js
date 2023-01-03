import { LanguageButtons } from "./components";

const WelcomePage = ({languageButtonsHandleClick}) => {
    return (
        <div class="welcomepage">
            <p>Welcome to the website</p>
            <h1>Mocun Ye</h1>
            <p>select a language</p>
            <LanguageButtons handleClick={languageButtonsHandleClick}/>
        </div>
    );
}

export default WelcomePage;