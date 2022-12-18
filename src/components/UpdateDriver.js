// Import components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as c from "../Constants";
import axios from "axios";
import { useEffect, useState } from 'react';

function UpdateDriver({ userId, changeMenu }) {

    const [driver, setDriver] = useState([]);

    useEffect(() => {
        initMenuHome();
    }, []);

    async function initMenuHome() {
        const data = (await axios.get(`http://localhost:5000/api/v1/driver/${userId}`)).data[0];
        setDriver(data);
    }

    async function cancelCreate() {
        changeMenu(c.DRIVER);
    }

    async function startCreate() {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const mobileNo = document.getElementById("mobileNo").value;
        const carNo = document.getElementById("carNo").value;
        await axios.put(`http://localhost:5000/api/v1/driver/${userId}`,
            {
                "First_Name": firstName,
                "Last_Name": lastName,
                "Email": email,
                "Mobile_No": mobileNo,
                "Car_No": carNo,
            });
        changeMenu(c.DRIVER);
    }

    return (
        <div>
            <div>========== Update Information (Driver) ==========</div>
            <div class="mt-1">
                Driver Id: {userId}
            </div>
            <div class="mt-1">
                <label for="firstName">First Name ({driver.first_name})</label>
                <input type="text" class="form-control" id="firstName" />
            </div>
            <div class="mt-1">
                <label for="lastName">Last Name ({driver.last_name})</label>
                <input type="text" class="form-control" id="lastName" />
            </div>
            <div class="mt-1">
                <label for="email">Email ({driver.email})</label>
                <input type="text" class="form-control" id="email" />
            </div>
            <div class="mt-1">
                <label for="mobileNo">Mobile No ({driver.mobile_no})</label>
                <input type="text" class="form-control" id="mobileNo" />
            </div>
            <div class="mt-1">
                <label for="mobileNo">Car No ({driver.car_no})</label>
                <input type="text" class="form-control" id="carNo" />
            </div>
            <div class="input-group mt-3">
                <button class="btn btn-danger" type="button" onClick={cancelCreate}>Cancel</button>
                <button class="btn btn-success" type="button" onClick={startCreate}>Confirm</button>
            </div>
        </div>
    );
}

export default UpdateDriver;