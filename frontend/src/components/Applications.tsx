import React from 'react';
import { useState } from 'react';
import { Get_App_List } from "../../wailsjs/go/main/App"
import './Applications.css'


interface App_List {
    selected_apps: Array<string>
}

function Applications() {
    const [appList, setAppList] = useState(Array<string>)
    const [selectedAppList, setSelectedAppList] = useState(Array<string>)
    const app_list: App_List = { selected_apps: [] }

    function get_app_list() {
        Get_App_List().then(set_app_list);
        ([])
    }

    function set_app_list(names: Array<string>) {
        setAppList([...names])
        setSelectedAppList([])
    }

    // Interesting idea of making the elements have css classes but then specifying different parents, ex .unselected-table-body + .table-element

    return (
        <div>
            <div>Select Apps from the list to backup</div>
            <button id="button" className='button' onClick={get_app_list}>Get Apps</button>
            <button id="button" className='button' onClick={get_app_list}>Backup</button>
            <div className='tables'>
                <table className='unselected-table'>
                    <label>Unselected</label>
                    <tbody className='unselected-table-body'>
                        {appList.map((item, index) => App_Element(item, index, appList, setAppList, selectedAppList, setSelectedAppList))}
                    </tbody>
                </table>
                <table className='selected-table'>
                    <label>Selected</label>
                    <tbody className='selected-table-body'>
                        {selectedAppList.map((item, index) => App_Element(item, index, selectedAppList, setSelectedAppList, appList, setAppList))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


function App_Element(app_name: string, index: number, appList: Array<string>, setAppList: React.Dispatch<React.SetStateAction<string[]>>, selectedAppList: Array<string>, setSelectedAppList: React.Dispatch<React.SetStateAction<string[]>>) {

    function selectionChange() {
        setSelectedAppList([...selectedAppList, app_name])
        appList = appList.filter(e => e !== app_name);
        setAppList([...appList])
    }

    return (
        <tr>
            <td key={index}>{app_name}</td>
            <input key={index} type="button" onClick={() => selectionChange()} />
        </tr>
    )
}

export default Applications