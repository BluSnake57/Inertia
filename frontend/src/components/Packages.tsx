import React from 'react';
import { useState } from 'react';
import { Backup_Packages } from '../../wailsjs/go/main/App';


function Packages() {
    const [resultText, setResultText] = useState("Packages have not been backed up");
    const getBackupResults = (results: boolean) => package_backup_result(results);

    function package_backup() {
        Backup_Packages().then(getBackupResults);
    }

    function package_backup_result(result: boolean) {
        if (result) {
            setResultText("package backup success")
        } else {
            setResultText("package backup failed")
        }
    }

    return (
        <div>
            <div id="result" className="result">{resultText}</div>
            <button id="button" className='button' onClick={package_backup}>Backup Packages</button>
        </div>
    )
}

export default Packages