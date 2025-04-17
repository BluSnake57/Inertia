import { useState } from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import { Greet } from "../wailsjs/go/main/App";
import Applications from './components/Applications';
import Directories from './components/Directories';
import Packages from './components/Packages';
import Navbar from './components/Navbar';

function App() {
    const [page, setPage] = useState(Number)

    function changePage(value: Number) {
        switch (value) {
            case 0:
                return (
                    <div className='main-content'>
                        <Applications />
                    </div>
                );
            case 1:
                return (
                    <div className='main-content'>
                        <Packages />
                    </div>
                );
            case 2:
                return (
                    <div className='main-content'>
                        <Directories />
                    </div>
                );
            default:
                return (
                    <label className='main-content'>Something went wrong</label>
                )
        }

    }

    return (
        <div id="App">
            <Navbar selectedValue={page} setSelectedValue={setPage} />
            {changePage(page)}
        </div>
    )
}

export default App
