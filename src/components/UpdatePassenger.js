// Import components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as c from "../Constants";
import axios from "axios";
import { useEffect, useState } from 'react';

function UpdatePassenger({ userId, changeMenu }) {

    const [passenger, setPassenger] = useState([]);

    useEffect(() => {
        initMenuHome();
    }, []);

    async function initMenuHome() {
        const data = (await axios.get(`http://localhost:5000/api/v1/passenger/${userId}`)).data[0];
        setPassenger(data);
    }

    async function cancelCreate() {
        changeMenu(c.PASSenger);
    }

    async function startCreate() {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const mobileNo = document.getElementById("mobileNo").value;
        await axios.put(`http://localhost:5000/api/v1/passenger/${userId}`,
            {
                "First_Name": firstName,
                "Last_Name": lastName,
                "Email": email,
                "Mobile_No": mobileNo,
            });
        changeMenu(c.PASSenger);
    }

    return (
        <div>
            <div>========== Update Information (Passenger) ==========</div>
            <div class="mt-1">
                Passenger Id: {userId}
            </div>
            <div class="mt-1">
                <label for="firstName">First Name ({passenger.first_name})</label>
                <input type="text" class="form-control" id="firstName" />
            </div>
            <div class="mt-1">
                <label for="lastName">Last Name ({passenger.last_name})</label>
                <input type="text" class="form-control" id="lastName" />
            </div>
            <div class="mt-1">
                <label for="email">Email ({passenger.email})</label>
                <input type="text" class="form-control" id="email" />
            </div>
            <div class="mt-1">
                <label for="mobileNo">Mobile No ({passenger.mobile_no})</label>
                <input type="text" class="form-control" id="mobileNo" />
            </div>
            <div class="input-group mt-3">
                <button class="btn btn-denger" type="button" onClick={cancelCreate}>Cancel</button>
                <button class="btn btn-success" type="button" onClick={startCreate}>Confirm</button>
            </div>
        </div>
    );
}

export default UpdatePassenger;