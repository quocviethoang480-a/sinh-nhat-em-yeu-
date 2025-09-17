
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const giftBtn = document.getElementById("giftBtn");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicBtn.textContent = "🎶 Bật nhạc";
  } else {
    music.play();
    musicBtn.textContent = "🔇 Tắt nhạc";
  }
  isPlaying = !isPlaying;
});

giftBtn.addEventListener("click", () => {
  alert("🎉 Bất ngờ! Món quà lớn nhất là tình yêu của anh dành cho em 💕");
});


// ---------------- Hiệu ứng hoa rơi + tim bay ----------------
const canvas = document.getElementById("effectCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.size = Math.random() * 20 + 10;
    this.speedY = Math.random() * 2 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.type = Math.random() > 0.5 ? "🌸" : "❤️";
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y > canvas.height) {
      this.y = -20;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.font = `${this.size}px serif`;
    ctx.fillText(this.type, this.x, this.y);
  }
}

let particles = [];
for (let i = 0; i < 50; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

animate();
// Hiệu ứng trái tim bay khi click
document.addEventListener("click", function (e) {
  let heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";
  heart.innerHTML = "❤️";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 4000);
});
