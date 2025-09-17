const questionsPool = [
  {
    q: "Qual time brasileiro venceu o Major de CS:GO em 2016 ?",
    a: ["SK Gaming", "FURIA", "Imperial", "MIBR", "paiN Gaming"],
    c: 0
  },
  {
    q: "Qual jogador brasileiro é conhecido como 'Fallen'?",
    a: ["Gabriel Toledo", "Fernando Alvarenga", "Marcelo David", "Epitácio Pessoa", "Lincoln Lau"],
    c: 0
  },
  {
    q: "Qual time brasileiro tem como símbolo uma pantera?",
    a: ["FURIA", "MIBR", "Imperial", "W7M Gaming", "Red Canids"],
    c: 0
  },
  {
    q: "Qual destes jogadores NÃO é brasileiro?",
    a: ["KSCERATO", "yuurih", "coldzera", "Stewie2K", "LUCAS1"],
    c: 3
  },
  {
    q: "Qual time brasileiro foi formado por Fallen em 2022?",
    a: ["Imperial", "FURIA", "MIBR", "Red Canids", "W7M Gaming"],
    c: 0
  },
  {
    q: "Qual jogador brasileiro é conhecido como 'coldzera'?",
    a: ["Marcelo David", "Lucas Teles", "Fernando Alvarenga", "Vito Giuseppe", "Gabriel Toledo"],
    c: 0
  },
  {
    q: "Qual time brasileiro tem como símbolo um touro?",
    a: ["paiN Gaming", "FURIA", "W7M Gaming", "MIBR", "Imperial"],
    c: 2
  },
  {
    q: "Qual destes times já teve line-up 100% brasileira?",
    a: ["MIBR", "FURIA", "Imperial", "Todas as alternativas", "W7M Gaming"],
    c: 3
  },
  {
    q: "Qual jogador é conhecido como 'fer'?",
    a: ["Fernando Alvarenga", "Gabriel Toledo", "Lincoln Lau", "Epitácio Pessoa", "Marcelo David"],
    c: 0
  },
  {
    q: "Qual time brasileiro jogou a final do Major de 2018?",
    a: ["MIBR", "FURIA", "Imperial", "paiN Gaming", "Red Canids"],
    c: 0
  },
  {
    q: "Qual destes jogadores nunca jogou pela FURIA?",
    a: ["yuurih", "coldzera", "Fallen", "fer", "KSCERATO"],
    c: 1
  },
  {
    q: "Qual time brasileiro tem sede em Belo Horizonte?",
    a: ["paiN Gaming", "FURIA", "Imperial", "MIBR", "W7M Gaming"],
    c: 0
  }
];

let score = 0;
let usedIndexes = [];

function getRandomQuestionIndex() {
  let idx;
  do {
    idx = Math.floor(Math.random() * questionsPool.length);
  } while (usedIndexes.includes(idx) && usedIndexes.length < questionsPool.length);
  return idx;
}

function showQuestion() {
  document.getElementById('feedback').textContent = '';
  document.getElementById('answers').innerHTML = '';
  document.getElementById('score').textContent = `Acertos: ${score} / 10`;

  if (score >= 10) {
    document.getElementById('quiz-card').innerHTML = `
      <h1>Fim do Jogo!</h1>
      <p>Você acertou 10 perguntas! 🏆</p>
      <p>Parabéns! Resgate seu prêmio abaixo:</p>
      <button class="btn-sim" onclick="resgatarPremio()">Resgatar Prêmio</button>
    `;
    return;
  }

  const idx = getRandomQuestionIndex();
  usedIndexes.push(idx);
  const q = questionsPool[idx];

  document.getElementById('question').innerHTML = `<strong>${q.q}</strong>`;
  q.a.forEach((alt, i) => {
    const btn = document.createElement('button');
    btn.textContent = alt;
    btn.className = 'btn-sim';
    btn.style.margin = '8px';
    btn.onclick = () => checkAnswer(i, q.c);
    document.getElementById('answers').appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    score++;
    document.getElementById('feedback').textContent = 'Correto! ✅';
    setTimeout(() => {
      showQuestion();
    }, 1000);
  } else {
    document.getElementById('feedback').textContent = 'Errado! ❌ Tente novamente!';
    setTimeout(() => {
      showQuestion();
    }, 1000);
  }
  Array.from(document.getElementById('answers').children).forEach(btn => btn.disabled = true);
}

function resgatarPremio() {
  document.body.innerHTML = `
    <canvas id="fireworks-canvas"></canvas>
    <div class="premio-card">
      <h1>🎉 Parabéns! 🎉</h1>
      <p>Você foi convidado para ser padrinho!</p>
      <p>Acesse o link especial ou fale com a família para receber seu presente!</p>
    </div>
    <img id="poof-baby" src="https://www.pngkit.com/png/full/109-1095839_f-poof-poof-los-padrinos-magicos.png" alt="Poof voando" style="position:fixed;left:50vw;top:40vh;width:120px;z-index:1001;">
  `;
  startFireworks();
  animatePoof();
}

function animatePoof() {
  const poof = document.getElementById('poof-baby');
  const imgWidth = 120;
  const imgHeight = 120;
  let left = Math.random() * (window.innerWidth - imgWidth);
  let top = Math.random() * (window.innerHeight - imgHeight);
  let dx = (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3 + 2);
  let dy = (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3 + 2);

  function move() {
    left += dx;
    top += dy;

    // Bate nas paredes e muda de direção
    if (left <= 0) {
      left = 0;
      dx = Math.abs(dx);
    }
    if (left >= window.innerWidth - imgWidth) {
      left = window.innerWidth - imgWidth;
      dx = -Math.abs(dx);
    }
    if (top <= 0) {
      top = 0;
      dy = Math.abs(dy);
    }
    if (top >= window.innerHeight - imgHeight) {
      top = window.innerHeight - imgHeight;
      dy = -Math.abs(dy);
    }

    poof.style.left = left + 'px';
    poof.style.top = top + 'px';

    requestAnimationFrame(move);
  }

  // Ao tentar clicar ou passar o mouse, muda a direção aleatoriamente
  function bounceRandom() {
    dx = (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3 + 2);
    dy = (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 3 + 2);
  }

  poof.addEventListener('mouseenter', bounceRandom);
  poof.addEventListener('mousedown', bounceRandom);

  move();
}

function startFireworks() {
  const canvas = document.getElementById('fireworks-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function randomColor() {
    const colors = ['#FFD700', '#FF6347', '#00BFFF', '#32CD32', '#FF69B4', '#FF4500', '#00FFEA'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.2;
    const color = randomColor();
    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2) * (i / 40);
      const speed = Math.random() * 4 + 2;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color
      });
    }
  }

  function draw() {
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
  }

  function update() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.alpha -= 0.012;
    });
    particles = particles.filter(p => p.alpha > 0);
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  setInterval(createFirework, 700);
  loop();
}

showQuestion();