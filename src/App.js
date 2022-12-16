// Import style
import './App.css';

// Import components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import MenuHome from './components/MenuHome';
import CreatePassanger from './components/CreatePassanger';
import * as c from "./Constants";

import { useEffect, useState } from 'react';
import CreateDriver from './components/CreateDriver';
import MenuPassanger from './components/MenuPassanger';
import MenuDriver from './components/MenuDriver';

import axios from 'axios';
import UpdatePassanger from './components/UpdatePassanger';
import UpdateDriver from './components/UpdateDriver';
import TripsPassanger from './components/TripsPassanger';
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
        setMenu(c.CREATE_PASSANGER);
      } else if (option === "888") {
        setDisplayOption(false);
        setMenu(c.CREATE_DRIVER);
      }
      const userType = option.charAt(0).toLowerCase();
      const userId = option.substring(1);
      if (userType === "p") {
        const data = (await axios.get(`http://localhost:5000/api/v1/passanger/${userId}`)).data;
        if (data.length != 1) alert("Invalid User");
        setUserId(userId);
        setMenu(c.PASSANGER);
      } else if (userType === "d") {
        const data = (await axios.get(`http://localhost:5000/api/v1/driver/${userId}`)).data;
        if (data.length != 1) alert("Invalid User");
        setUserId(userId);
        setMenu(c.DRIVER);
      } else {
        alert("Invalid Input");
      }
    } else if (menu === c.PASSANGER) {
      if (option === "1") {
        setDisplayOption(false);
        setMenu(c.UPDATE_PASSANGER);
      } else if (option === "2") {
        setDisplayOption(false);
        setMenu(c.TRIPS_PASSANGER);
      } else if (option === "3") {
        setDisplayOption(false);
        setMenu(c.CREATE_TRIP);
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
    } else if (menu === c.CREATE_PASSANGER) {
      return <CreatePassanger changeMenu={changeMenu} />;
    } else if (menu === c.CREATE_DRIVER) {
      return <CreateDriver changeMenu={changeMenu} />;
    } else if (menu === c.PASSANGER) {
      return <MenuPassanger changeMenu={changeMenu} userId={userId} />;
    } else if (menu === c.DRIVER) {
      return <MenuDriver changeMenu={changeMenu} userId={userId} />;
    } else if (menu === c.UPDATE_PASSANGER) {
      return <UpdatePassanger changeMenu={changeMenu} userId={userId} />;
    } else if (menu === c.TRIPS_PASSANGER) {
      return <TripsPassanger changeMenu={changeMenu} userId={userId} />;
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
