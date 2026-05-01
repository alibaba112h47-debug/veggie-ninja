// 🔊 SOUND
const clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");

// 🔔 NOTIFICATION
function sendNotification(msg) {
  if (Notification.permission === "granted") {
    new Notification(msg);
  } else {
    Notification.requestPermission();
  }
}

// DATA
let points = localStorage.getItem("points") || 0;
let streak = localStorage.getItem("streak") || 0;
let lastDone = localStorage.getItem("lastDone") || "";

document.getElementById("points").innerText = points;
document.getElementById("streak").innerText = streak;

// SUGGESTIONS
const suggestions = {
  bored: ["Study 10 min", "Walk karo", "Skill seekho"],
  sad: ["Music suno", "Friend call", "Relax karo"],
  happy: ["Pushups", "Goal likho", "Kaam karo"]
};

function suggest(mood) {
  clickSound.play();
  const list = suggestions[mood];
  const random = list[Math.floor(Math.random() * list.length)];
  document.getElementById("result").innerText = random;
}

// DONE
function markDone() {
  clickSound.play();

  let today = new Date().toDateString();

  if (lastDone === today) {
    alert("Already done today");
    return;
  }

  points = parseInt(points) + 10;

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastDone === yesterday.toDateString()) {
    streak++;
  } else {
    streak = 1;
  }

  lastDone = today;

  localStorage.setItem("points", points);
  localStorage.setItem("streak", streak);
  localStorage.setItem("lastDone", lastDone);

  document.getElementById("points").innerText = points;
  document.getElementById("streak").innerText = streak;

  sendNotification("🔥 Task Completed!");
  checkReward();
}

// 💰 REWARD
function checkReward() {
  if (points >= 100) {
    alert("🎉 Reward unlocked! ₹10");
  }
}

// 📲 INSTALL
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById("installBtn").style.display = "block";
});

document.getElementById("installBtn").addEventListener("click", () => {
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(() => {
    deferredPrompt = null;
  });
});