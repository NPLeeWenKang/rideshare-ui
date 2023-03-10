// Import components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as c from "../Constants";
import axios from "axios";

function CreateDriver({ changeMenu }) {

    async function cancelCreate() {
        changeMenu(c.HOME);
    }

    async function startCreate() {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const mobileNo = document.getElementById("mobileNo").value;
        const idNo = document.getElementById("idNo").value;
        const carNo = document.getElementById("carNo").value;
        await axios.post(`http://localhost:5000/api/v1/driver`,
            {
                "First_Name": firstName,
                "Last_Name": lastName,
                "Email": email,
                "Mobile_No": mobileNo,
                "Id_No": idNo,
                "Car_No": carNo,
            });
        changeMenu(c.HOME);
    }

    return (
        <div>
            <div>========== Create User (Driver) ==========</div>
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
            <div class="mt-1">
                <label for="mobileNo">Id No</label>
                <input type="text" class="form-control" id="idNo" />
            </div>
            <div class="mt-1">
                <label for="mobileNo">Car No</label>
                <input type="text" class="form-control" id="carNo" />
            </div>
            <div class="input-group mt-3">
                <button class="btn btn-danger" type="button" onClick={cancelCreate}>Cancel</button>
                <button class="btn btn-success" type="button" onClick={startCreate}>Confirm</button>
            </div>
        </div>
    );
}

export default CreateDriver;