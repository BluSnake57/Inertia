import React, { Component, Dispatch, ReactElement, SetStateAction, useState } from 'react';
import Directories from './Directories';
import Applications from './Applications';
import Packages from './Packages';


interface SelectedPage {
    selectedValue: Number;
    setSelectedValue: React.Dispatch<React.SetStateAction<number>>;
  }

function Navbar({selectedValue, setSelectedValue} : SelectedPage) {
    const handleRadioChange = (value:number) => {
        setSelectedValue(value);
    };

    return (
        <nav className='navbar'>
            <div>
                <input type="radio" id="Applications" value={0}
                    checked={ selectedValue === 0 }
                    onChange={() =>
                        handleRadioChange(0)
                    }
                />
                <label>Applications</label>
            </div>
            <div>
                <input type="radio" id="Packages" value={1}
                    checked={ selectedValue === 1 }
                    onChange={() =>
                        handleRadioChange(1)
                    }
                />
                <label>Packages</label>
            </div>
            <div>
                <input type="radio" id="Directories" value={2}
                    checked={ selectedValue === 2 }
                    onChange={() =>
                        handleRadioChange(2)
                    }
                />
                <label>Directories</label>
            </div>
            
        </nav>
    )

}

export default Navbar