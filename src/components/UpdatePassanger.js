// Import components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as c from "../Constants";
import axios from "axios";
import { useEffect, useState } from 'react';

function UpdatePassanger({ userId, changeMenu }) {

    const [passanger, setPassanger] = useState([]);

    useEffect(() => {
        initMenuHome();
    }, []);

    async function initMenuHome() {
        const data = (await axios.get(`http://localhost:5000/api/v1/passanger/${userId}`)).data[0];
        setPassanger(data);
    }

    async function cancelCreate() {
        changeMenu(c.PASSANGER);
    }

    async function startCreate() {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const mobileNo = document.getElementById("mobileNo").value;
        await axios.put(`http://localhost:5000/api/v1/passanger/${userId}`,
            {
                "First_Name": firstName,
                "Last_Name": lastName,
                "Email": email,
                "Mobile_No": mobileNo,
            });
        changeMenu(c.PASSANGER);
    }

    return (
        <div>
            <div>========== Update Information (Passanger) ==========</div>
            <div class="mt-1">
                Passanger Id: {userId}
            </div>
            <div class="mt-1">
                <label for="firstName">First Name ({passanger.first_name})</label>
                <input type="text" class="form-control" id="firstName" />
            </div>
            <div class="mt-1">
                <label for="lastName">Last Name ({passanger.last_name})</label>
                <input type="text" class="form-control" id="lastName" />
            </div>
            <div class="mt-1">
                <label for="email">Email ({passanger.email})</label>
                <input type="text" class="form-control" id="email" />
            </div>
            <div class="mt-1">
                <label for="mobileNo">Mobile No ({passanger.mobile_no})</label>
                <input type="text" class="form-control" id="mobileNo" />
            </div>
            <div class="input-group mt-3">
                <button class="btn btn-danger" type="button" onClick={cancelCreate}>Cancel</button>
                <button class="btn btn-success" type="button" onClick={startCreate}>Confirm</button>
            </div>
        </div>
    );
}

export default UpdatePassanger;