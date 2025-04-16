import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet} from "../wailsjs/go/main/App";
import Applications from './components/Applications';
import Directories from './components/Directories';
import Packages from './components/Packages';

function App() {

    return (
        <div id="App">
            <Applications/>
            <Directories/>
            <Packages/>
        </div>
    )
}

export default App
