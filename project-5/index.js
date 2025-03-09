const hourEl = document.getElementById("hour");
const dayEl = document.getElementById("day");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");
const ampmEl = document.getElementById("ampm");

const updateClock = () => {
    const d = new Date();
    let day = d.getDate();  
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let ampm = "AM";

    if (h >= 12) {
        ampm = "PM";
        if (h > 12) h -= 12;
    }


    day = day < 10 ? "0" + day : day;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;


    dayEl.innerText = day;
    hourEl.innerText = h;
    minuteEl.innerText = m;
    secondEl.innerText = s;
    ampmEl.innerText = ampm;


    setTimeout(updateClock, 1000);
};

updateClock();
