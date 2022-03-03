function drawClock() {
  drawBackground();
  let time = new Date();
  let hour = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
  let minute = time.getMinutes();
  drawHands(hour, minute);
  let angle = calculateAngle(hour, minute);
  showAngle(angle);
}

function drawBackground() {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.stroke();
  // Drawing the middle circle
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.12, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();
  // Drawing hours
  for (i = 1; i < 13; i++) {
    angle = (i * Math.PI) / 6;
    ctx.beginPath();
    ctx.rotate(angle);
    ctx.moveTo(0, -radius + 10);
    ctx.lineTo(0, -radius + 25);
    ctx.stroke();

    ctx.translate(0, -radius * 0.82);
    ctx.rotate(-angle);
    ctx.font = radius * 0.08 + "px arial";
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(i.toString(), 0, 0);
    ctx.rotate(angle);
    ctx.translate(0, radius * 0.82);

    ctx.rotate(-angle);
  }
  // Drawing minutes
  for (i = 1; i < 61; i++) {
    angle = (i * Math.PI) / 30;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.rotate(angle);
    ctx.moveTo(0, -radius + 10);
    ctx.lineTo(0, -radius + 17);
    ctx.stroke();
    ctx.rotate(-angle);
  }
}

function drawHands(hour, minute) {
  // Minute
  let mAngle = minute * (Math.PI / 30);
  ctx.beginPath();
  ctx.rotate(mAngle);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.lineWidth = 10;
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 0.65);
  ctx.stroke();
  ctx.rotate(-mAngle);
  // Hour
  let hAngle = (hour * 5 + (minute * 5) / 60) * (Math.PI / 30);
  ctx.beginPath();
  ctx.rotate(hAngle);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.lineWidth = 14;
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 0.5);
  ctx.stroke();
  ctx.rotate(-hAngle);
}

function calculateAngle(hour, minute) {
  const angleByMinute = 360 / 60;
  const minutesInOneHour = 5;
  const minutesInHours = 5 / 60;

  let minutesInHour = minute * minutesInHours;
  let calculatedMinutes = hour * minutesInOneHour - minute + minutesInHour;
  let angle = calculatedMinutes * angleByMinute;
  return Math.abs(angle);
}

function showAngle(angle) {
  ctx.font = radius * 0.06 + "px arial";
  ctx.fillStyle = "black";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(angle.toFixed(2) + "º", 0, 0);
}

let canvas = document.getElementById("reloj");
let ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;

drawClock();
setInterval(drawClock, 60000);
