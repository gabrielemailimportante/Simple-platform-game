//Trazendo elementos de interface e criando canvas
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

canvas.addEventListener('click', () => canvas.focus());
canvas.setAttribute('tabindex', '0');

//Definições do personagem
const player = {
  x: 80,
  y: 300,
  w: 32,
  h: 48,
  vx: 0,
  vy: 0,
  speed: 3.5,
  jumpStrength: 14,
  onGround: false
};

//Física
const gravity = 0.5;
const friction = 0.88;

//Plataformas
const platforms = [
  {x: 0,   y: H - 14, w: W,   h: 14},
  {x: 140, y: 400,   w: 180, h: 14},
  {x: 360, y: 320,   w: 140, h: 14},
  {x: 560, y: 240,   w: 200, h: 14},
  {x: 780, y: 160,   w: 100, h: 14},
  {x: 40,  y: 260,   w: 120, h: 14}
];

//Flags e eventos das teclas
const keys = {
  left:false,
  right:false,
  up:false
};

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowRight') keys.right = true;
  if (e.key === 'ArrowUp') keys.up = true;
  if (e.key === 'r' || e.key === 'R') reset();
});

window.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
  if (e.key === 'ArrowUp') keys.up = false;
});

//Desenhando elementos do cenário
function draw() {

  //Fundo
  ctx.clearRect(0,0,W,H);

  //Plataformas
  for (const p of platforms) {
    ctx.fillStyle = '#6b4f2a';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.strokeRect(p.x + 0.5, p.y + 0.5, p.w - 1, p.h - 1);
  }
  ctx.save();

  //Player
  ctx.translate(player.x + player.w/2, player.y + player.h/2);
  const tilt = Math.max(-0.15, Math.min(0.15, player.vx / 25));
  ctx.rotate(tilt);
  ctx.fillStyle = '#FFFFFF';

  //Olhos
  roundRect(ctx, -player.w/2, -player.h/2, player.w, player.h, 6, true);
  ctx.fillStyle = '#000000';
  ctx.fillRect(-6, -6, 4, 4);
  ctx.fillRect(6, -6, 4, 4);
  ctx.restore();
}

//Colisão do personagem com as plataformas
function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

//Método para o reset ao pressionar a tecla R - Ver Evento
function reset() {
  player.x = 80; player.y = 300; player.vx = 0; player.vy = 0; player.onGround = false;
}

//Movimentação e Update a cada frame do jogo
function update() {

  //Para Esquerda e Direita
  if (keys.left) player.vx = Math.max(player.vx - 0.7, -player.speed*1.6);
  if (keys.right) player.vx = Math.min(player.vx + 0.7, player.speed*1.6);
  if (!keys.left && !keys.right) player.vx *= friction;

  player.x += player.vx;
  for (const p of platforms) {
    const a = {x: player.x, y: player.y, w: player.w, h: player.h};
    if (rectsOverlap(a, p)) {
      if (player.vx > 0) player.x = p.x - player.w - 0.01;
      else if (player.vx < 0) player.x = p.x + p.w + 0.01;
      player.vx = 0;
    }
  }

  //Pulo
  if (keys.up && player.onGround) {
    player.vy = -player.jumpStrength;
    player.onGround = false;
  }

  //Peso
  player.vy += gravity;
  if (player.vy > 25) player.vy = 25;


  player.y += player.vy;
  player.onGround = false;
  for (const p of platforms) {
    const a = {x: player.x, y: player.y, w: player.w, h: player.h};
    if (rectsOverlap(a, p)) {
      if (player.vy > 0) {
        player.y = p.y - player.h - 0.01;
        player.vy = 0;
        player.onGround = true;
      } else if (player.vy < 0) {
        player.y = p.y + p.h + 0.01;
        player.vy = 0;
      }
    }
  }

  //Limitação nas laterais
  if (player.x < 0) { player.x = 0; player.vx = 0; }
  if (player.x + player.w > W) { player.x = W - player.w; player.vx = 0; }
  if (player.y > H) reset();
}

//Desenhando Personagem
function roundRect(ctx, x, y, width, height, radius, fill) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  if (fill) ctx.fill(); else ctx.stroke();
}

//Criando loop dos frames
let last = 0;

function loop(ts) {
  const dt = Math.min(32, ts - last);
  last = ts;
  update(dt/1000);
  draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);