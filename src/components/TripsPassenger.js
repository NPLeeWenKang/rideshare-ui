// Import components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as c from "../Constants";

import axios from "axios";
import { useEffect, useState } from 'react';

function TripsPassenger({ userId, changeMenu }) {

    const [trips, setTrips] = useState([]);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const data = (await axios.get(`http://localhost:5001/api/v1/trip?passenger_id=${userId}`)).data;
        console.log(data);
        setTrips(data);
    }

    async function cancelCreate() {
        changeMenu(c.PASSENGER);
    }

    return (
        <div>
            <div>========== Ride Share ==========</div>
            <table className={"table"}>
                <thead>
                    <tr>
                        <th scope="col">Trip Id</th>
                        <th scope="col">Pickup</th>
                        <th scope="col">Dropoff</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map(t => {
                        return (
                            <tr key={t.trip_id}>
                                <th>{t.trip_id}</th>
                                <td>{t.pick_up}</td>
                                <td>{t.drop_off}</td>
                                <td>{t.start.Valid ? t.start.Time : "-"}</td>
                                <td>{t.end.Valid ? t.end.Time : "-"}</td>
                                <td>{t.status.Valid ? t.status.String : "-"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div class="input-group mt-3">
                <button class="btn btn-danger" type="button" onClick={cancelCreate}>Cancel</button>
            </div>
        </div>
    );
}

export default TripsPassenger;