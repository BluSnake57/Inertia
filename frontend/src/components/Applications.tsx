import React from 'react';
import {useContext, useState} from 'react';
import {Get_App_List} from "../../wailsjs/go/main/App"


interface App_List {
    selected_apps: Array<string>
}

function Applications() {
    const [appList, setAppList] = useState(Array<string>)
    const app_list: App_List = {selected_apps: []}

    function get_app_list() {
        Get_App_List().then(set_app_list);
        ([])
    }

    function set_app_list(names: Array<string>) {
        setAppList([...names])
    }

    return (
        <div>
            <div>Select Apps from the list to backup</div>
            <button id="button" className='button' onClick={get_app_list}>Get Apps</button>
            <table>
                <tbody>
                    {appList.map((item, index) => App_Element(item, index, app_list))}
                </tbody>
            </table>

            <button id="button" className='button' onClick={get_app_list}>Backup</button>
            <table>
                <tbody>
                    {app_list.selected_apps.map((item, index) => App_Element(item, index, app_list))}
                </tbody>
            </table>
        </div>
    )
}


function App_Element(app_name:string, index: number, app_list: App_List) {


    return (
        <tr>
            <td key={index}>{app_name}</td>
            <input key={index} type="checkbox"/>
        </tr>
    )
}

// function App_Elements(app_list:string[]) {

//     function build_app_list() {
//         app_list.forEach(function (app_name){
//             App_Element(app_name)
//         })
//     }

//     return (
//         <div>
//             {}
//         </div>
//     )
// }

export default Applications