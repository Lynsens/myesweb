import React, { useEffect, useState } from 'react';
import { Language } from './mock';

export const useLanguageSelection = (initState) => {
    const [currLan, setLan] = useState(
        initState
        );
    
    return {currLan, setLan};
}

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {langSelected : false};
    }

    handleClick () {
        this.setState({langSelected: true})
    }


    render() {
        return (
            <>
            <p>select a language</p>
            <>
                <button>ENG</button>
                <button>CNH</button>
            </>
            </>
        );
    }
  
}