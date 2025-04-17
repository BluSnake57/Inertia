import React, { Component, Dispatch, ReactElement, SetStateAction, useState } from 'react';
import Directories from './Directories';
import Applications from './Applications';
import Packages from './Packages';
import './Navbar.css'


interface SelectedPage {
    selectedValue: Number;
    setSelectedValue: React.Dispatch<React.SetStateAction<number>>;
  }


function Navbar({selectedValue, setSelectedValue} : SelectedPage) {
    const handleRadioChange = (value:number) => {
        setSelectedValue(value);
    };

    const navbarElement = (name: string, pageValue: number) => {
        return (
            <>
                <input type="radio" id={name} value={pageValue}
                    checked={ selectedValue === pageValue }
                    onChange={() =>
                        handleRadioChange(pageValue)
                    }
                    className='radio'
                />
                <label className='label' htmlFor={name}>{name}</label>
            </>
        )
    }

    return (
        <nav className='navbar'>

            {navbarElement("Applications", 0)}

            {navbarElement("Packages", 1)}

            {navbarElement("Directories", 2)}
            
        </nav>
    )

}

export default Navbar