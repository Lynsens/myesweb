import React, { useState } from 'react';
import { Language } from './mock';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {langSelected : false};
    }

    handleClick () {
        this.setState({langSelected: true})
    }

    render() {

        const [langSelected, setLanSelected] = useState(false);

        return (
            <></>
        );
    }
  
}