import { LanguageButtons } from "./components";
import FadeIn from 'react-fade-in';

const WelcomePage = ( {menuClick, languageButtonsHandleClick}) => {
    return (
        <div className="welcomepage">
            {/* <MenuButton handleClick = {menuClick}/> */}
            <FadeIn delay={400}>
                <p>Welcome to the website</p>
                <h1>Mocun Ye</h1>
                <>
                <h5>*This website is currently under construction</h5>
                <p>select a language</p>
                <p>请选择语言</p>
                </>
                <LanguageButtons handleClick={languageButtonsHandleClick}/>
            </FadeIn>
        </div>
    );
}

export default WelcomePage;