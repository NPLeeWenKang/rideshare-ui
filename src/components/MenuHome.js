// Import components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import axios from "axios";
import { useEffect, useState } from 'react';

function MenuHome() {

    const [passangers, setPassangers] = useState([]);
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        initMenuHome();
    }, []);

    async function initMenuHome() {
        const pData = (await axios.get("http://localhost:5000/api/v1/passanger")).data;
        const dData = (await axios.get("http://localhost:5000/api/v1/driver")).data;
        console.log(pData);
        setPassangers(pData);
        setDrivers(dData);
    }

    return (
        <div>
            <div>========== Ride Share ==========</div>
            <div>Passanger & Driver Console</div>
            <table className={"table"}>
                <thead>
                    <tr>
                        <th scope="col">User Id</th>
                        <th scope="col">User Type</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {passangers.map(p => {
                        return (
                            <tr key={"p" + p.passanger_id}>
                                <th>p{p.passanger_id}</th>
                                <td>Passanger</td>
                                <td>{p.first_name}</td>
                                <td>{p.last_name}</td>
                            </tr>
                        );
                    })}
                    {drivers.map(d => {
                        return (
                            <tr key={"d" + d.driver_id}>
                                <th>d{d.driver_id}</th>
                                <td>Driver</td>
                                <td>{d.first_name}</td>
                                <td>{d.last_name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>000. Refresh</div>
            <div>777. Create Passanger</div>
            <div>888. Create Driver</div>
        </div>
    );
}

export default MenuHome;