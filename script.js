function tick(){
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString('en-PH',{timeZone:'Asia/Manila',hour12:true});
  document.getElementById('date').textContent = now.toLocaleDateString('en-PH',{timeZone:'Asia/Manila',month:'long',day:'numeric',year:'numeric'});
  document.getElementById('day').textContent = now.toLocaleDateString('en-PH',{timeZone:'Asia/Manila',weekday:'long'})+" • Bambang";

  const h = now.getHours();
  let greet = "Good Evening";
  if(h < 12) greet = "Good Morning";
  else if(h < 18) greet = "Good Afternoon";
  document.getElementById('greeting').textContent = greet + ", Gemma";
}
setInterval(tick,1000); tick();

let isDark = localStorage.getItem('gemmaTheme')==='dark';
function applyTheme(){
  document.body.classList.toggle('dark',isDark);
  document.getElementById('themeStatus').textContent = isDark? '🌙 Dark Purple' : '💜 Pink Light';
  document.getElementById('themeBtn').textContent = isDark? '☀️ Light' : '🌙 Dark';
}
function toggleTheme(){
  isDark =!isDark;
  localStorage.setItem('gemmaTheme', isDark? 'dark' : 'light');
  applyTheme();
  
  document.body.animate([{transform:'scale(1)'},{transform:'scale(1.02)'},{transform:'scale(1)'}],{duration:300});
}
applyTheme();

const fileInput = document.getElementById('fileInput');
const myPhoto = document.getElementById('myPhoto');
const savedPhoto = localStorage.getItem('gemmaPhoto');
if(savedPhoto) myPhoto.src = savedPhoto;

fileInput.addEventListener('change', (e)=>{
  const file = e.target.files[0];
  if(!file) return;
  if(file.size > 5*1024*1024){ alert('Masyadong malaki! Max 5MB lang 💜'); return; }
  const reader = new FileReader();
  reader.onload = (ev)=>{
    myPhoto.src = ev.target.result;
    localStorage.setItem('gemmaPhoto', ev.target.result);
    alert('💖 Photo saved! ✨');
  };
  reader.readAsDataURL(file);
});
function removePhoto(){
  localStorage.removeItem('gemmaPhoto');
  myPhoto.src = "https://i.pravatar.cc/200?img=32";
  alert('Photo removed 🗑️');
}

let visits = Number(localStorage.getItem('gemmaVisits')||0)+1;
localStorage.setItem('gemmaVisits', visits);
document.getElementById('visits').textContent = visits;

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('show');
  });
},{threshold:0.2});
reveals.forEach(r=>observer.observe(r));

const sections = document.querySelectorAll('.box');
const shortcuts = document.querySelectorAll('.shortcut');
window.addEventListener('scroll', ()=>{
  let current = '';
  sections.forEach(sec=>{
    if(window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  shortcuts.forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href') === '#'+current);
  });
});

const nameText = "🍒Gemma Faye\nA. Triste🍒";
let i = 0;
function typeWriter(){
  const el = document.getElementById('typeName');
  if(i <= nameText.length){
    el.innerHTML = nameText.slice(0,i).replace('\n','<br>') + '<span style="opacity:.5">|</span>';
    i++; setTimeout(typeWriter, 80);
  } else {
    el.innerHTML = nameText.replace('\n','<br>');
  }
}
typeWriter();

document.querySelector('.top').addEventListener('dblclick',()=>{
  alert('Hi Gemma! 💖 Keep slaying! ✨ BSINTE future designer/developer!');
});