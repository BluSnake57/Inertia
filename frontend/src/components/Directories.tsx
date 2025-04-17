import React from 'react';
import {useState} from 'react';
import {Backup_Directories} from "../../wailsjs/go/main/App"
import {Pick_Directory} from "../../wailsjs/go/main/App"

function Directories() {
    const [result, setResult] = useState("")
    const [directoryList, setDirectoryList] = useState(Array<string>)
    const getBackupResults = (results: boolean[]) => path_backup_result(results);

    function path_backup() {
        Backup_Directories(directoryList).then(getBackupResults);
    }

    // Should make this recursive and link to each directory
    function path_backup_result(results: boolean[]) {
        if (results[0]) {
            setResult("backup success");
        } else {
            setResult("backup failure");
        }
    }
    function pick_path() {
        Pick_Directory().then(add_directory);
    }

    function add_directory(path:string) {
        if (path != "") {
            setDirectoryList([...directoryList, path]);
        }
        
    }

    return(
        <div>
            <div>Backup Directories</div>
            <div>{result}</div>
            <div>
                <button id="button" className='button' onClick={pick_path}>Add Directory</button>
                <button id="button" className='button' onClick={path_backup}>Backup</button>
                <table>
                    <tbody>
                        {directoryList.map((item, index) => Directory_Element(item, index, directoryList, setDirectoryList))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function Directory_Element(directory:string, index: number, directoryList: Array<string>, setDirectoryList: React.Dispatch<React.SetStateAction<string[]>>) {

    function remove_directory() {
        directoryList = directoryList.filter(e => e !== directory);
        setDirectoryList([...directoryList])
    }

    return (
        <tr>
            <td key={index}>{directory}</td>
            <input key={index} type="button" onClick={() => remove_directory()}/>
        </tr>
    )
}

export default Directories