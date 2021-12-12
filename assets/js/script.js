const weekday = moment(moment(), "dddd");
document.getElementById("currentDay").textContent = weekday;
document.getElementById("currentDay").classList.add("time-block");

const workHours = [
  "7:00",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
];

const dayLength = workHours.length;
let timeCount = 0;

function createWeekdayCalander(times) {
    if(!times.length) {
        return;
    }
    const listEl = document.createElement("div");
    listEl.classList.add("row", "mb-3");

    const timerEl = document.createElement("div");
    timerEl.classList.add("col-2", "align-self-center", "text-end");
    const time = times.shift();
    timerEl.textContent=time;
    listEl.appendChild(timerEl);

    const noteEl =document.createElement("textarea");
    noteEl.classList.add('col-8', 'form-control');
    noteEl.rows = '3';
    listEl.appendChild(noteEl);
}