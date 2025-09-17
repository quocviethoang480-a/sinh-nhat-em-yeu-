
// Script to control slideshow, wishes fade-in, audio autoplay, confetti, hearts
const slides = document.querySelectorAll('.slide');
let current = 0;
function showNextSlide(){
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}
let slideTimer = setInterval(showNextSlide, 4000);

// Wishes
const wishes = [
  "Chúc em sinh nhật thật ngọt ngào, như nụ cười đáng yêu của em 🌸",
  "Cảm ơn em đã đến bên anh, để mỗi ngày của anh đều có nắng ☀️",
  "Anh ước gì thời gian có thể ngừng lại, để anh được bên em mãi mãi 💕",
  "Anh yêu em nhiều lắm, hơn cả những gì anh có thể nói thành lời ❤️",
  "Xin lỗi em vì những lần làm em buồn, làm em tuyệt vọng, ngàn lần xin lỗi em 🥺"
];
const wishContainer = document.getElementById('wishContainer');
wishes.forEach((w, i) => {
  const p = document.createElement('p');
  p.textContent = w;
  p.className = 'fade-in';
  p.style.animationDelay = (0.6 + i*0.9) + 's';
  wishContainer.appendChild(p);
});

// Audio
const audio = document.getElementById('bgAudio');
const playToggle = document.getElementById('playToggle');
function tryPlay(){
  audio.play().catch(()=>{
    // autoplay blocked; leave paused. user can press playToggle.
  });
}
window.addEventListener('load', ()=>{
  // try autoplay after small delay
  setTimeout(tryPlay, 300);
});
playToggle.addEventListener('click', ()=>{
  if(audio.paused){ audio.play(); playToggle.textContent = 'Tạm dừng nhạc'; }
  else{ audio.pause(); playToggle.textContent = 'Phát nhạc'; }
});

// Surprise: confetti + hearts
const surpriseBtn = document.getElementById('surpriseBtn');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext && confettiCanvas.getContext('2d');
let confettiRunning = false;

function resizeCanvas(){
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function startConfetti(){
  if(!ctx) return;
  confettiRunning = true;
  const W = confettiCanvas.width, H = confettiCanvas.height;
  const pieces = [];
  const colors = ['#FFC0CB','#FFD700','#FF6B6B','#9AD3BC','#8EC5FC'];
  for(let i=0;i<140;i++){
    pieces.push({
      x: Math.random()*W,
      y: Math.random()*H - H,
      r: Math.random()*6+4,
      d: Math.random()*50+10,
      color: colors[Math.floor(Math.random()*colors.length)],
    });
  }
  let raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(const p of pieces){
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x,p.y,p.r,p.r*0.6);
      p.y += Math.sin(p.d)+1+p.r/2;
      p.x += Math.cos(p.d);
      p.d += 0.02;
      if(p.y>H){ p.y = -10; p.x = Math.random()*W; }
    }
    raf = requestAnimationFrame(draw);
  }
  draw();
  // stop after 6s
  setTimeout(()=>{ confettiRunning=false; cancelAnimationFrame(raf); ctx.clearRect(0,0,W,H); }, 6000);
}

// hearts
function spawnHearts(){
  for(let i=0;i<12;i++){
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = (20 + Math.random()*60) + '%';
    heart.style.top = (40 + Math.random()*30) + '%';
    heart.style.fontSize = (18 + Math.random()*28) + 'px';
    heart.textContent = '❤️';
    document.body.appendChild(heart);
    const dx = (Math.random()*200 - 100);
    const dy = -(150 + Math.random()*250);
    heart.animate([
      { transform: 'translateY(0) scale(0.8)', opacity:1 },
      { transform: `translate(${dx}px, ${dy}px) scale(1.2)`, opacity:0 }
    ], { duration: 2500 + Math.random()*1500, easing:'ease-out' });
    setTimeout(()=> heart.remove(), 3500);
  }
}

surpriseBtn.addEventListener('click', ()=>{
  // ensure music plays
  audio.play().catch(()=>{});
  startConfetti();
  spawnHearts();
});

// initial
slides[0].classList.add('active');
