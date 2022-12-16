// Import style
import './App.css';

// Import components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import axios from "axios";

function App() {
  async function getAllCourses() {
    console.log("getAllCourses");
    const response = await axios.get("http://localhost:5000/api/v1/courses");
    const data = response.data;

    const bigbox = document.getElementById("bigbox");
    bigbox.innerHTML = "";

    for (const [index, course] of Object.entries(data.Courses)) {
      const courseDiv = document.createElement("div");

      const name = document.createElement("div");
      name.innerHTML = `ID: ${course.Name} [${index}]`;

      const planned_intake = document.createElement("div");
      planned_intake.innerHTML = `Planned Intake: ${course["Planned Intake"]}`;

      const min_gpa = document.createElement("div");
      min_gpa.innerHTML = `Min GPA: ${course["Min GPA"]}`;

      const max_gpa = document.createElement("div");
      max_gpa.innerHTML = `Max GPA: ${course["Max GPA"]}`;

      const buttonDiv = document.createElement("div");
      buttonDiv.innerHTML = `
            <button type="button" onclick="updateCourse(this)" id="update_${index}">Update ${index}</button>
            <button type="button" onclick="submitDeleteCourse(this)" id="delete_${index}">Delete ${index}</button>
        `;

      courseDiv.appendChild(name);
      courseDiv.appendChild(planned_intake);
      courseDiv.appendChild(min_gpa);
      courseDiv.appendChild(max_gpa);
      courseDiv.appendChild(buttonDiv);
      courseDiv.style.marginBottom = "10px";

      bigbox.appendChild(courseDiv);
    }
  }

  async function createCourse() {
    console.log("createCourse");

    const bigbox = document.getElementById("bigbox");
    bigbox.innerHTML = "";

    const id = document.createElement("div");
    id.innerHTML = `
    <label for="id">ID:</label>
    <input type="text" id="id" name="id">
    `;
    const name = document.createElement("div");
    name.innerHTML = `
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    `;
    const planned_intake = document.createElement("div");
    planned_intake.innerHTML = `
    <label for="planned_intake">Planned Intake number:</label>
    <input type="text" id="planned_intake" name="planned_intake">
    `;
    const min_gpa = document.createElement("div");
    min_gpa.innerHTML = `
    <label for="min_gpa">Minimum GPA:</label>
    <input type="text" id="min_gpa" name="min_gpa">
    `;
    const max_gpa = document.createElement("div");
    max_gpa.innerHTML = `
    <label for="max_gpa">Maximum GPA:</label>
    <input type="text" id="max_gpa" name="max_gpa">
    `;
    const submit = document.createElement("div");
    submit.innerHTML = `
    <button type="button" onclick="submitCreateCourse()">Create</button>
    `;

    bigbox.appendChild(id);
    bigbox.appendChild(name);
    bigbox.appendChild(planned_intake);
    bigbox.appendChild(min_gpa);
    bigbox.appendChild(max_gpa);
    bigbox.appendChild(submit);
  }

  async function updateCourse(e) {
    console.log("createCourse");
    const moduleId = e.id.replace("update_", "");

    const response = await axios.get(`http://localhost:5000/api/v1/courses/${moduleId}`);
    const data = response.data;
    console.log(data);

    const bigbox = document.getElementById("bigbox");
    bigbox.innerHTML = "";

    const id = document.createElement("div");
    id.innerHTML = `<div id="id">ID: ${moduleId}</div>`;

    const name = document.createElement("div");
    name.innerHTML = `
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" value="${data["Name"]}">
    `;
    const planned_intake = document.createElement("div");
    planned_intake.innerHTML = `
    <label for="planned_intake">Planned Intake number:</label>
    <input type="text" id="planned_intake" name="planned_intake" value="${data["Planned Intake"]}">
    `;
    const min_gpa = document.createElement("div");
    min_gpa.innerHTML = `
    <label for="min_gpa">Minimum GPA:</label>
    <input type="text" id="min_gpa" name="min_gpa" value="${data["Min GPA"]}">
    `;
    const max_gpa = document.createElement("div");
    max_gpa.innerHTML = `
    <label for="max_gpa">Maximum GPA:</label>
    <input type="text" id="max_gpa" name="max_gpa" value="${data["Max GPA"]}">
    `;
    const submit = document.createElement("div");
    submit.innerHTML = `
    <button type="button" onclick="submitUpdateCourse()">Update</button>
    `;

    bigbox.appendChild(id);
    bigbox.appendChild(name);
    bigbox.appendChild(planned_intake);
    bigbox.appendChild(min_gpa);
    bigbox.appendChild(max_gpa);
    bigbox.appendChild(submit);
  }

  async function submitCreateCourse() {
    console.log("submitCreateCourse");
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const planned_intake = document.getElementById("planned_intake").value;
    const min_gpa = document.getElementById("min_gpa").value;
    const max_gpa = document.getElementById("max_gpa").value;

    console.log(id, name, planned_intake, min_gpa, max_gpa);

    await axios.post(`http://localhost:5000/api/v1/courses/${id}`,
      {
        "Name": name,
        "Planned Intake": parseInt(planned_intake),
        "Min GPA": parseInt(min_gpa),
        "Max GPA": parseInt(max_gpa)
      }).then(
        (response) => {
          const bigbox = document.getElementById("bigbox");
          bigbox.innerHTML = `Course ${id} created successfully`;
        },
        (error) => {
          const bigbox = document.getElementById("bigbox");
          bigbox.innerHTML = `Error - course ${id} exists`;
        },
      );
  }

  async function submitUpdateCourse() {
    console.log("submitUpdateCourse");
    const id = document.getElementById("id").textContent.replace("ID: ", "");
    const name = document.getElementById("name").value;
    const planned_intake = document.getElementById("planned_intake").value;
    const min_gpa = document.getElementById("min_gpa").value;
    const max_gpa = document.getElementById("max_gpa").value;

    console.log(id, name, planned_intake, min_gpa, max_gpa);

    await axios.put(`http://localhost:5000/api/v1/courses/${id}`,
      {
        "Name": name,
        "Planned Intake": parseInt(planned_intake),
        "Min GPA": parseInt(min_gpa),
        "Max GPA": parseInt(max_gpa)
      }).then(
        (response) => {
          const bigbox = document.getElementById("bigbox");
          bigbox.innerHTML = `Course ${id} updated successfully`;
        },
        (error) => {
          const bigbox = document.getElementById("bigbox");
          bigbox.innerHTML = `Error - course ${id} does not exist`;
        },
      );
  }

  async function submitDeleteCourse(e) {
    console.log("submitDeleteCourse");
    const id = e.id.replace("delete_", "");

    console.log(id);

    await axios.delete(`http://localhost:5000/api/v1/courses/${id}`)
      .then(
        (response) => {
          const bigbox = document.getElementById("bigbox");
          bigbox.innerHTML = `Course ${id} deleted successfully`;
        },
        (error) => {
          const bigbox = document.getElementById("bigbox");
          bigbox.innerHTML = `Error - course ${id} does not exist`;
        },
      );
  }
  return (
    <div>
      <div>
        <button type="button" onClick={getAllCourses}>Get all courses</button>
        <button type="button" onClick="createCourse()">Create course</button>
      </div>
      <div id="bigbox">
        <div style={{ marginBottom: "10px" }}>
          <div>Name: ...</div>
          <div>Planned Intake: ...</div>
          <div>Min GPA: ...</div>
          <div>Max GPA: ...</div>
          <div>
            <button type="button">Update ...</button>
            <button type="button">Delete ...</button>
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <div>Name: ...</div>
          <div>Planned Intake: ...</div>
          <div>Min GPA: ...</div>
          <div>Max GPA: ...</div>
          <div>
            <button type="button">Update ...</button>
            <button type="button">Delete ...</button>
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <div>
            <label for="id">ID:</label>
            <input type="text" id="id" name="id" />
          </div>
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label for="planned_intake">Planned Intake number:</label>
            <input type="text" id="planned_intake" name="planned_intake" />
          </div>
          <div>
            <label for="min_gpa">Minimum GPA:</label>
            <input type="text" id="min_gpa" name="min_gpa" />
          </div>
          <div>
            <label for="max_gpa">Maximum GPA:</label>
            <input type="text" id="max_gpa" name="max_gpa" />
          </div>
          <div>
            <input type="submit" id="submit" name="submit" value="Create" />
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <div>
            <div for="id">ID: ...</div>
          </div>
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label for="planned_intake">Planned Intake number:</label>
            <input type="text" id="planned_intake" name="planned_intake" />
          </div>
          <div>
            <label for="min_gpa">Minimum GPA:</label>
            <input type="text" id="min_gpa" name="min_gpa" />
          </div>
          <div>
            <label for="max_gpa">Maximum GPA:</label>
            <input type="text" id="max_gpa" name="max_gpa" />
          </div>
          <div>
            <input type="submit" onsubmit="submitCreateCourse()" id="submit" name="submit" value="Create" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
