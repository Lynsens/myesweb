import { Language } from "./mock";

export const LanguageButtons = ({handleClick}) => {
    return(
        <>
            <button onClick={() => {handleClick(Language.ENG)}}>ENG</button>
            <button onClick={() => {handleClick(Language.CHN)}}>中文</button>
        </>
    )
}

export const HomeButton = ({handleClick}) => 
    <button onClick = {handleClick}>Home</button>;
