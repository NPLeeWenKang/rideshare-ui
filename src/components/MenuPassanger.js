// Import components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import axios from "axios";
import { useEffect, useState } from 'react';

function MenuPassanger({ userId }) {

    const [passanger, setPassanger] = useState([]);
    const [currentAssignment, setCurrentAssignment] = useState([]);

    useEffect(() => {
        initMenuHome();
    }, []);

    async function initMenuHome() {
        const data1 = (await axios.get(`http://localhost:5000/api/v1/passanger/${userId}`)).data[0];

        const data2 = (await axios.get(`http://localhost:5001/api/v1/current_trip_assignment/passanger/${userId}`)).data;

        setPassanger(data1);
        setCurrentAssignment(data2);
    }

    function processDate(dateString) {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} UTC`;
    }

    return (
        <div>
            <div>========== Ride Share ==========</div>
            <div>Driver Id: {passanger.passanger_id}</div>
            <div>First Name: {passanger.first_name}</div>
            <div>Last Name: {passanger.last_name}</div>
            <div>Email: {passanger.email}</div>
            <div>Mobile No: {passanger.mobile_no}</div>
            <div className="mt-3">Passanger Console</div>
            <div>1. Update information</div>
            <div>2. Display trips</div>
            <div>3. Start a new trip</div>
            {currentAssignment.length !== 0 ?
                <div>
                    <div className="mt-3">========== Trip Status ==========</div>
                    {
                        currentAssignment.map(ca => {
                            if (!ca.driver_id.Valid) {
                                return (
                                    <div key={ca.trip_id} className="mt-2">
                                        <div>Trip Id: {ca.trip_id}</div>
                                        <div>Pickup Location: {ca.pick_up}</div>
                                        <div>Dropoff Location: {ca.drop_out}</div>
                                        <div>Start: {ca.start.Valid ? processDate(ca.start.Time) : "-"}</div>
                                        <div>End: {ca.end.Valid ? processDate(ca.end.Time) : "-"}</div>
                                        <div>Status: Assigning...</div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={ca.trip_id} className="mt-2">
                                        <div>Trip Id: {ca.trip_id}</div>
                                        <div>Driver: ({ca.driver_id.Int32}) {ca.first_name.String} {ca.last_name.String}</div>
                                        <div>Mobile No: {ca.mobile_no.String}</div>
                                        <div>Car No: {ca.car_no.String}</div>
                                        <div>Pickup Location: {ca.pick_up}</div>
                                        <div>Dropoff Location: {ca.drop_out}</div>
                                        <div>Start: {ca.start.Valid ? processDate(ca.start.Time) : "-"}</div>
                                        <div>End: {ca.end.Valid ? processDate(ca.end.Time) : "-"}</div>
                                        {
                                            ca.status.Valid && ca.status.String === "REJECTED"
                                                ?
                                                <div>Status: Assigning...</div>
                                                :
                                                <div>Status: {ca.status.Valid ? ca.status.String : "-"}</div>
                                        }
                                    </div>
                                );
                            }

                        })
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

export default MenuPassanger;