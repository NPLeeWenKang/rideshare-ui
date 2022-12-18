// Import components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as c from "../Constants";
import axios from "axios";

function CreatePassenger({ changeMenu }) {

    async function cancelCreate() {
        changeMenu(c.HOME);
    }

    async function startCreate() {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const mobileNo = document.getElementById("mobileNo").value;
        await axios.post(`http://localhost:5000/api/v1/passenger`,
            {
                "First_Name": firstName,
                "Last_Name": lastName,
                "Email": email,
                "Mobile_No": mobileNo,
            });
        changeMenu(c.HOME);
    }

    return (
        <div>
            <div>========== Create User (Passenger) ==========</div>
            <div class="mt-1">
                <label for="firstName">First Name</label>
                <input type="text" class="form-control" id="firstName" />
            </div>
            <div class="mt-1">
                <label for="lastName">Last Name</label>
                <input type="text" class="form-control" id="lastName" />
            </div>
            <div class="mt-1">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email" />
            </div>
            <div class="mt-1">
                <label for="mobileNo">Mobile No</label>
                <input type="text" class="form-control" id="mobileNo" />
            </div>
            <div class="input-group mt-3">
                <button class="btn btn-denger" type="button" onClick={cancelCreate}>Cancel</button>
                <button class="btn btn-success" type="button" onClick={startCreate}>Confirm</button>
            </div>
        </div>
    );
}

export default CreatePassenger;