// Import style
import './App.css';

// Import components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import MenuHome from './components/MenuHome';
import CreatePassenger from './components/CreatePassenger';
import * as c from "./Constants";

import { useEffect, useState } from 'react';
import CreateDriver from './components/CreateDriver';
import MenuPassenger from './components/MenuPassenger';
import MenuDriver from './components/MenuDriver';

import axios from 'axios';
import UpdatePassenger from './components/UpdatePassenger';
import UpdateDriver from './components/UpdateDriver';
import TripsPassenger from './components/TripsPassenger';
import CreateTrip from './components/CreateTrip';

function App() {

  const [menu, setMenu] = useState(c.HOME);
  const [userId, setUserId] = useState();
  const [displayOption, setDisplayOption] = useState(true);
  const [forceRerender, setforceRerender] = useState(0);

  useEffect(() => {
    console.log(menu);
  }, [forceRerender, menu]);

  async function optionEnter() {
    const option = document.getElementById("option").value;
    if (option === "999") { changeMenu(c.HOME); document.getElementById("option").value = ""; return; }
    if (option === "000") { setforceRerender(forceRerender + 1); document.getElementById("option").value = ""; return; }

    if (menu === c.HOME) {
      if (option === "777") {
        setDisplayOption(false);
        setMenu(c.CREATE_PASSenger);
      } else if (option === "888") {
        setDisplayOption(false);
        setMenu(c.CREATE_DRIVER);
      }
      const userType = option.charAt(0).toLowerCase();
      const userId = option.substring(1);
      if (userType === "p") {
        const data = (await axios.get(`http://localhost:5000/api/v1/passenger/${userId}`)).data;
        if (data.length != 1) alert("Invalid User");
        setUserId(userId);
        setMenu(c.PASSenger);
      } else if (userType === "d") {
        const data = (await axios.get(`http://localhost:5000/api/v1/driver/${userId}`)).data;
        if (data.length != 1) alert("Invalid User");
        setUserId(userId);
        setMenu(c.DRIVER);
      } else {
        alert("Invalid Input");
      }
    } else if (menu === c.PASSenger) {
      if (option === "1") {
        setDisplayOption(false);
        setMenu(c.UPDATE_PASSenger);
      } else if (option === "2") {
        setDisplayOption(false);
        setMenu(c.TRIPS_PASSenger);
      } else if (option === "3") {
        setDisplayOption(false);
        setMenu(c.CREATE_TRIP);
      } else {
        alert("Invalid Input");
      }
    } else if (menu === c.DRIVER) {
      if (option === "1") {
        setDisplayOption(false);
        setMenu(c.UPDATE_DRIVER);
      } else if (option === "2") {
        const data = (await axios.get(`http://localhost:5000/api/v1/driver/${userId}`)).data[0];
        await axios.put(`http://localhost:5000/api/v1/driver/is_available/${userId}`,
          {
            "Is_Available": !data.is_available,
          });
        setforceRerender(forceRerender + 1);
      } else if (option === "3") {
        const currentAssignment = (await axios.get(`http://localhost:5001/api/v1/current_trip_assignment/driver/${userId}`)).data[0];
        if (currentAssignment.status !== "PENDING") alert("Invalid Input");
        await axios.put(`http://localhost:5001/api/v1/trip_assignment`,
          {
            "Trip_Id": currentAssignment.trip_id,
            "Driver_id": currentAssignment.driver_id,
            "Status": "ACCEPTED",
          });
        setforceRerender(forceRerender + 1);
      } else if (option === "4") {
        const currentAssignment = (await axios.get(`http://localhost:5001/api/v1/current_trip_assignment/driver/${userId}`)).data[0];
        if (currentAssignment.status !== "PENDING") alert("Invalid Input");
        await axios.put(`http://localhost:5001/api/v1/trip_assignment`,
          {
            "Trip_Id": currentAssignment.trip_id,
            "Driver_id": currentAssignment.driver_id,
            "Status": "REJECTED",
          });
        setforceRerender(forceRerender + 1);
      } else if (option === "5") {
        const currentAssignment = (await axios.get(`http://localhost:5001/api/v1/current_trip_assignment/driver/${userId}`)).data[0];
        if (currentAssignment.status !== "ACCEPTED") alert("Invalid Input");
        await axios.put(`http://localhost:5001/api/v1/trip_assignment`,
          {
            "Trip_Id": currentAssignment.trip_id,
            "Driver_id": currentAssignment.driver_id,
            "Status": "DRIVING",
          });
        setforceRerender(forceRerender + 1);
      } else if (option === "6") {
        const currentAssignment = (await axios.get(`http://localhost:5001/api/v1/current_trip_assignment/driver/${userId}`)).data[0];
        if (currentAssignment.status !== "DRIVING") alert("Invalid Input");
        await axios.put(`http://localhost:5001/api/v1/trip_assignment`,
          {
            "Trip_Id": currentAssignment.trip_id,
            "Driver_id": currentAssignment.driver_id,
            "Status": "DONE",
          });
        setforceRerender(forceRerender + 1);
      }
    }
    document.getElementById("option").value = "";
  }

  function changeMenu(m) {
    setDisplayOption(true);
    setMenu(m);
  }

  function BodyRender() {
    if (menu === c.HOME) {
      return <MenuHome changeMenu={changeMenu} />;
    } else if (menu === c.CREATE_PASSenger) {
      return <CreatePassenger changeMenu={changeMenu} />;
    } else if (menu === c.CREATE_DRIVER) {
      return <CreateDriver changeMenu={changeMenu} />;
    } else if (menu === c.PASSenger) {
      return <MenuPassenger changeMenu={changeMenu} userId={userId} />;
    } else if (menu === c.DRIVER) {
      return <MenuDriver changeMenu={changeMenu} userId={userId} />;
    } else if (menu === c.UPDATE_PASSenger) {
      return <UpdatePassenger changeMenu={changeMenu} userId={userId} />;
    } else if (menu === c.TRIPS_PASSenger) {
      return <TripsPassenger changeMenu={changeMenu} userId={userId} />;
    } else if (menu === c.CREATE_TRIP) {
      return <CreateTrip changeMenu={changeMenu} userId={userId} />;
    } else if (menu === c.UPDATE_DRIVER) {
      return <UpdateDriver changeMenu={changeMenu} userId={userId} />;
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      optionEnter();
    }
  }
  return (
    <div>
      <BodyRender />
      {displayOption ?
        <div class="input-group mt-3">
          <input type="text" class="form-control" id="option" onKeyDown={onKeyDown} />
          <button class="btn btn-primary" type="button" id="option" onClick={optionEnter}>Enter</button>
        </div>
        :
        <div></div>
      }
    </div>
  );
}

export default App;
