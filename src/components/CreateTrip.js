// Import components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as c from "../Constants";
import axios from "axios";

function CreateTrip({ userId, changeMenu }) {

    async function cancelCreate() {
        changeMenu(c.PASSENGER);
    }

    async function startCreate() {
        const pickup = document.getElementById("pickup").value;
        const dropoff = document.getElementById("dropoff").value;
        console.log(userId, pickup, dropoff);
        await axios.post(`http://localhost:5001/api/v1/trip`,
            {
                "Passenger_Id": parseInt(userId),
                "Pick_Up": pickup,
                "Drop_Off": dropoff,
            });
        changeMenu(c.PASSENGER);
    }

    return (
        <div>
            <div>========== Create Trip ==========</div>
            <div class="mt-1">
                <label for="firstName">Pickup Location</label>
                <input type="text" class="form-control" id="pickup" />
            </div>
            <div class="mt-1">
                <label for="lastName">Dropoff Location</label>
                <input type="text" class="form-control" id="dropoff" />
            </div>
            <div class="input-group mt-3">
                <button class="btn btn-danger" type="button" onClick={cancelCreate}>Cancel</button>
                <button class="btn btn-success" type="button" onClick={startCreate}>Confirm</button>
            </div>
        </div>
    );
}

export default CreateTrip;