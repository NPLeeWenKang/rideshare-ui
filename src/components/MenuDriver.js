// Import components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import axios from "axios";
import { useEffect, useState } from 'react';

function MenuDriver({ userId }) {

    const [driver, setDriver] = useState([]);
    const [currentAssignment, setCurrentAssignment] = useState([]);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const data1 = (await axios.get(`http://localhost:5000/api/v1/driver/${userId}`)).data[0];

        const data2 = (await axios.get(`http://localhost:5000/api/v1/driver/current_assignment/${userId}`)).data;

        setDriver(data1);
        setCurrentAssignment(data2);
    }

    function processDate(dateString) {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} UTC`;
    }

    return (
        <div>
            <div>========== Ride Share ==========</div>
            <div>Driver Id: {driver.driver_id}</div>
            <div>First Name: {driver.first_name}</div>
            <div>Last Name: {driver.last_name}</div>
            <div>Email: {driver.email}</div>
            <div>Mobile No: {driver.mobile_no}</div>
            <div>Id No: {driver.id_no}</div>
            <div>Car No: {driver.car_no}</div>
            <div>Availability: {driver.is_available ? "True" : "False"}</div>
            <div className="mt-3">Driver Console</div>
            <div>1. Update information</div>
            <div>2. Toggle availability status (to get allocated trips)</div>
            {currentAssignment.length !== 0 ?
                <div>
                    <div className="mt-3">========== Trip Status ==========</div>
                    <div key={currentAssignment[0].trip_id} className="mt-2">
                        <div>Trip Id: {currentAssignment[0].trip_id}</div>
                        <div>Passanger: ({currentAssignment[0].passanger_id}) {currentAssignment[0].first_name} {currentAssignment[0].last_name}</div>
                        <div>Mobile No: {currentAssignment[0].mobile_no}</div>
                        <div>Pickup Location: {currentAssignment[0].pick_up}</div>
                        <div>Dropoff Location: {currentAssignment[0].drop_out}</div>
                        <div>Start: {currentAssignment[0].start.Valid ? processDate(currentAssignment[0].start.Time) : "-"}</div>
                        <div>End: {currentAssignment[0].end.Valid ? processDate(currentAssignment[0].end.Time) : "-"}</div>
                        <div>Status: {currentAssignment[0].status}</div>
                    </div>
                    <div className="mt-2">Trip Console</div>
                    {
                        currentAssignment[0].status === "PENDING"
                            ?
                            <div>
                                <div>3. Accept Trip</div>
                                <div>4. Reject Trip</div>
                            </div>
                            :
                            <div></div>
                    }
                    {
                        currentAssignment[0].status === "ACCEPTED"
                            ?
                            <div>
                                <div>5. Start Trip</div>
                            </div>
                            :
                            <div></div>
                    }
                    {
                        currentAssignment[0].status === "DRIVING"
                            ?
                            <div>
                                <div>6. End Trip</div>
                            </div>
                            :
                            <div></div>
                    }
                </div>
                :
                <div></div>
            }
            <div className="mt-3">000. Refresh</div>
            <div>999. Exit</div>
        </div>
    );
}

export default MenuDriver;