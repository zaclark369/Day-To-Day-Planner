const weekday = moment(moment(), "dddd");
document.getElementById("currentDay").textContent = weekday;
document.getElementById("currentDay").classList.add("time-block");

const workHours = ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",];

const dayLength = workHours.length;
let timeCount = 0;

function createWeekdayCalander(times) {
  if (!times.length) {
    return;
  }
  const listEl = document.createElement("div");
  listEl.classList.add("row", "mb-3");

  const timerEl = document.createElement("div");
  timerEl.classList.add("col-2", "align-self-center", "text-end");
  const time = times.shift();
  timerEl.textContent = time;
  listEl.appendChild(timerEl);

  const noteEl = document.createElement("textarea");
  noteEl.classList.add("col-8", "form-control");
  noteEl.rows = "3";
  listEl.appendChild(noteEl);

  const btnEl = document.createElement("button");
  btnEl.classList.add("me-md-3", "btn", "btn-primary", "saveBtn");
  btnEl.type = "button";
  btnEl.textContent = "Save";

  const btnContainer = document.createElement("div");
  btnContainer.classList.add(
    "d-grid",
    "gap-2",
    "d-md-flex",
    "justify-content-md-end"
  );
  listEl.appendChild(btnContainer);
  btnContainer.appendChild(btnEl);

  const containerEl = document.getElementById("contentMain");
  containerEl.appendChild(listEl);
  noteEl.value = retreiveSaves();
  btnEl.onclick = handleSave;

  function retreiveSaves() {
    if (!localStorage.getItem("taskList")) {
      const newUserArray = [];
      for (i = 0; i < dayLength; i++) {
        newUserArray.push("");
      }
      localStorage.setItem("taskList", JSON.stringify(newUserArray));
    }
    const saveArray = JSON.parse(localStorage.getItem("taskList"));
    while (saveArray.length < dayLength) {
      saveArray.push("");
    }
    const noteContent = saveArray[timeCount];
    return noteContent;
  }

  function handleSave() {
    const saveEl = document.getElementsByTagName("textarea");
    const savesArray = [];
    for (let i = 0; i < saveEl.length; i++) {
      savesArray[i] = saveEl[i].value;
    }
    localStorage.setItem("taskList", JSON.stringify(savesArray));
  }

  createColor();

  function createColor() {
    const currentTime = moment(moment(), "hh:mm");
    const calendarTime = moment(time, "hh:mm");
    if (calendarTime.isBefore(currentTime)) {
      noteEl.classList.add("past");
    }
    if (calendarTime.isAfter(currentTime)) {
      noteEl.classList.add("future");
    }
    if (calendarTime.isSame(currentTime, "hour")) {
      noteEl.classList.add("present");
    }
  }

  timeCount++;
  createWeekdayCalander(times);
}

createWeekdayCalander(workHours);

const clearButtonEl = document.getElementById("clear-button");
clearButtonEl.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
