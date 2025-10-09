// 'use client';
// import { useEffect, useRef, useState } from "react";

// export default function NotFound() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [canvasSize] = useState({ width: 800, height: 300 });
//   const [gameStats, setGameStats] = useState({ score: 0, highScore: 0 });
//   const [glitchEffect, setGlitchEffect] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
    
//     const context = canvas.getContext("2d");
//     if (!context) return;
    
//     // Now we know ctx is not null, so we can safely use it
//     const ctx: CanvasRenderingContext2D = context;

//     // Enhanced game constants
//     const GROUND_Y = 220;
//     const GRAVITY = 0.8;
//     const JUMP_POWER = -16;
//     const BASE_SPEED = 7;
//     const SPEED_INCREMENT = 0.08;
//     const MIN_OBSTACLE_GAP = 180;
//     const MAX_OBSTACLE_GAP = 380;
//     const NIGHT_THRESHOLD = 300;

//     // Particle system for effects
//     let particles: Array<{
//       x: number;
//       y: number;
//       vx: number;
//       vy: number;
//       life: number;
//       maxLife: number;
//       type: string;
//       size: number;
//       alpha?: number;
//     }> = [];
    
//     let stars: Array<{
//       x: number;
//       y: number;
//       size: number;
//       twinkle: number;
//     }> = [];

//     // Enhanced dino states
//     const DINO_STATES = {
//       RUNNING: 'running',
//       JUMPING: 'jumping',
//       DUCKING: 'ducking',
//       DEAD: 'dead',
//     };

//     // Enhanced obstacle types with visual improvements
//     const OBSTACLE_TYPES = {
//       CACTUS_SMALL: { 
//         width: 25, 
//         height: 45, 
//         draw: drawEnhancedSmallCactus,
//         color: '#2d5a27'
//       },
//       CACTUS_LARGE: { 
//         width: 45, 
//         height: 55, 
//         draw: drawEnhancedLargeCactus,
//         color: '#2d5a27'
//       },
//       PTERODACTYL: { 
//         width: 55, 
//         height: 35, 
//         draw: drawEnhancedPterodactyl, 
//         flying: true, 
//         yOffset: () => Math.random() * 60 + 40,
//         color: '#8b4513'
//       },
//       METEOR: {
//         width: 30,
//         height: 30,
//         draw: drawMeteor,
//         flying: true,
//         yOffset: () => Math.random() * 100 + 20,
//         color: '#ff4500'
//       }
//     };

//     // Game state
//     let dino = {
//       x: 90,
//       y: GROUND_Y - 45,
//       width: 45,
//       height: 45,
//       vy: 0,
//       state: DINO_STATES.RUNNING as keyof typeof DINO_STATES,
//       legFrame: 0,
//       duckHeight: 25,
//       trail: [] as Array<{ x: number; y: number; alpha: number }>,
//     };

//     let obstacles: Array<{
//       x: number;
//       y: number;
//       width: number;
//       height: number;
//       draw: Function;
//       frame: number;
//       color: string;
//       flying?: boolean;
//     }> = [];
    
//     let clouds: Array<{
//       x: number;
//       y: number;
//       speed: number;
//       size: number;
//     }> = [];
    
//     let frame = 0;
//     let speed = BASE_SPEED;
//     let score = 0;
//     let highScore = 0;
//     let gameOver = false;
//     let isPaused = false;
//     let lastObstacleX = canvas.width;
//     let isNight = false;
//     let groundOffset = 0;

//     // Initialize stars for night mode
//     for (let i = 0; i < 50; i++) {
//       stars.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * 150,
//         size: Math.random() * 2 + 1,
//         twinkle: Math.random() * 100
//       });
//     }

//     // Enhanced audio with Web Audio API
//     let audioCtx: AudioContext | null = null;
    
//     const initAudio = () => {
//       if (!audioCtx) {
//         try {
//           audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
//         } catch (e) {
//           console.log('Audio not supported');
//         }
//       }
//     };

//     const playJumpSound = () => {
//       if (!audioCtx) return;
//       try {
//         const oscillator = audioCtx.createOscillator();
//         const gainNode = audioCtx.createGain();
//         oscillator.type = 'square';
//         oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
//         oscillator.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.1);
//         gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
//         gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
//         oscillator.connect(gainNode);
//         gainNode.connect(audioCtx.destination);
//         oscillator.start();
//         oscillator.stop(audioCtx.currentTime + 0.1);
//       } catch (e) {
//         console.log('Audio error');
//       }
//     };

//     const playCollisionSound = () => {
//       if (!audioCtx) return;
//       try {
//         const oscillator = audioCtx.createOscillator();
//         const gainNode = audioCtx.createGain();
//         oscillator.type = 'sawtooth';
//         oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
//         oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.3);
//         gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime);
//         gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
//         oscillator.connect(gainNode);
//         gainNode.connect(audioCtx.destination);
//         oscillator.start();
//         oscillator.stop(audioCtx.currentTime + 0.3);
//       } catch (e) {
//         console.log('Audio error');
//       }
//     };

//     const playScoreSound = () => {
//       if (!audioCtx) return;
//       try {
//         const oscillator = audioCtx.createOscillator();
//         const gainNode = audioCtx.createGain();
//         oscillator.type = 'sine';
//         oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
//         gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
//         gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
//         oscillator.connect(gainNode);
//         gainNode.connect(audioCtx.destination);
//         oscillator.start();
//         oscillator.stop(audioCtx.currentTime + 0.2);
//       } catch (e) {
//         console.log('Audio error');
//       }
//     };

//     // Enhanced drawing functions
//     function drawEnhancedDino() {
//       ctx.save();
      
//       // Draw speed trail
//       if (dino.state === DINO_STATES.RUNNING && !gameOver) {
//         dino.trail.push({ x: dino.x, y: dino.y, alpha: 1 });
//         if (dino.trail.length > 8) dino.trail.shift();
        
//         dino.trail.forEach((point, i) => {
//           point.alpha -= 0.15;
//           ctx.globalAlpha = point.alpha;
//           ctx.fillStyle = isNight ? '#00ffff' : '#ff6b6b';
//           ctx.fillRect(point.x - 5, point.y + 20, 10, 3);
//         });
//         ctx.globalAlpha = 1;
//       }

//       // Main dino body with gradient
//       const gradient = ctx.createLinearGradient(dino.x, dino.y, dino.x + dino.width, dino.y + dino.height);
//       gradient.addColorStop(0, isNight ? '#00ffff' : '#4CAF50');
//       gradient.addColorStop(1, isNight ? '#0080ff' : '#2E7D32');
      
//       ctx.fillStyle = gradient;
//       ctx.strokeStyle = isNight ? '#ffffff' : "#000";
//       ctx.lineWidth = 3;

//       // Enhanced dino shape
//       ctx.beginPath();
//       // Head
//       ctx.arc(dino.x + 35, dino.y + 12, 12, 0, Math.PI * 2);
//       ctx.fill();
      
//       // Body
//       ctx.fillRect(dino.x + 15, dino.y + 20, 25, 20);
      
//       // Tail
//       ctx.beginPath();
//       ctx.moveTo(dino.x + 5, dino.y + 25);
//       ctx.lineTo(dino.x + 15, dino.y + 30);
//       ctx.lineTo(dino.x + 10, dino.y + 35);
//       ctx.closePath();
//       ctx.fill();

//       // Eyes with glow effect
//       ctx.fillStyle = isNight ? '#ffff00' : "#000";
//       if (isNight) {
//         ctx.shadowColor = '#ffff00';
//         ctx.shadowBlur = 10;
//       }
      
//       if (dino.state === DINO_STATES.DEAD) {
//         // X eyes
//         ctx.strokeStyle = '#ff0000';
//         ctx.lineWidth = 4;
//         ctx.beginPath();
//         ctx.moveTo(dino.x + 28, dino.y + 8);
//         ctx.lineTo(dino.x + 34, dino.y + 14);
//         ctx.moveTo(dino.x + 34, dino.y + 8);
//         ctx.lineTo(dino.x + 28, dino.y + 14);
//         ctx.moveTo(dino.x + 38, dino.y + 8);
//         ctx.lineTo(dino.x + 44, dino.y + 14);
//         ctx.moveTo(dino.x + 44, dino.y + 8);
//         ctx.lineTo(dino.x + 38, dino.y + 14);
//         ctx.stroke();
//       } else {
//         ctx.fillRect(dino.x + 30, dino.y + 8, 4, 4);
//         ctx.fillRect(dino.x + 38, dino.y + 8, 4, 4);
//       }

//       ctx.shadowBlur = 0;

//       // Enhanced legs with animation
//       if (dino.state === DINO_STATES.DUCKING) {
//         dino.height = dino.duckHeight;
//         dino.y = GROUND_Y - dino.duckHeight;
//         // Duck pose
//         ctx.fillStyle = gradient;
//         ctx.fillRect(dino.x, dino.y + 10, 50, 15);
//       } else if (dino.state === DINO_STATES.RUNNING) {
//         const legOffset = Math.sin(frame * 0.3) * 8;
//         ctx.strokeStyle = isNight ? '#00ffff' : '#2E7D32';
//         ctx.lineWidth = 6;
//         ctx.beginPath();
//         ctx.moveTo(dino.x + 20, dino.y + dino.height);
//         ctx.lineTo(dino.x + 20 + legOffset, dino.y + dino.height + 15);
//         ctx.moveTo(dino.x + 30, dino.y + dino.height);
//         ctx.lineTo(dino.x + 30 - legOffset, dino.y + dino.height + 15);
//         ctx.stroke();
//       }

//       ctx.restore();
//     }

//     function drawEnhancedSmallCactus(x: number, y: number, width: number, height: number) {
//       const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
//       gradient.addColorStop(0, isNight ? '#4a9eff' : '#228B22');
//       gradient.addColorStop(1, isNight ? '#1e40af' : '#006400');
      
//       ctx.fillStyle = gradient;
//       ctx.fillRect(x + width / 3, y, width / 3, height);
//       ctx.fillRect(x, y + height / 2, width / 2, height / 4);
//       ctx.fillRect(x + width / 2, y + height / 3, width / 2, height / 3);
      
//       // Add spikes
//       ctx.fillStyle = isNight ? '#ffffff' : '#000';
//       for (let i = 0; i < 3; i++) {
//         ctx.fillRect(x + 5 + i * 8, y + 10 + i * 8, 3, 3);
//       }
//     }

//     function drawEnhancedLargeCactus(x: number, y: number, width: number, height: number) {
//       const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
//       gradient.addColorStop(0, isNight ? '#4a9eff' : '#228B22');
//       gradient.addColorStop(1, isNight ? '#1e40af' : '#006400');
      
//       ctx.fillStyle = gradient;
//       ctx.fillRect(x + width / 3, y, width / 2, height);
//       ctx.fillRect(x, y + height / 3, width / 2, height / 2);
//       ctx.fillRect(x + width / 2, y + height / 4, width / 2, height / 2);
      
//       // Enhanced spikes
//       ctx.fillStyle = isNight ? '#ffffff' : '#000';
//       for (let i = 0; i < 5; i++) {
//         ctx.fillRect(x + 3 + i * 8, y + 5 + i * 6, 4, 4);
//       }
//     }

//     function drawEnhancedPterodactyl(x: number, y: number, width: number, height: number, frameNum: number) {
//       const wingFlap = Math.sin(frameNum * 0.3) * 8;
      
//       ctx.save();
//       ctx.fillStyle = isNight ? '#ff6b6b' : '#8b4513';
      
//       // Body
//       ctx.fillRect(x + width / 3, y + height / 3, width / 3, height / 2);
      
//       // Wings with animation
//       ctx.beginPath();
//       ctx.moveTo(x, y + wingFlap);
//       ctx.lineTo(x + width / 3, y + height / 2);
//       ctx.lineTo(x + width / 2, y + height + wingFlap / 2);
//       ctx.closePath();
//       ctx.fill();
      
//       ctx.beginPath();
//       ctx.moveTo(x + width, y + wingFlap);
//       ctx.lineTo(x + width * 2/3, y + height / 2);
//       ctx.lineTo(x + width / 2, y + height + wingFlap / 2);
//       ctx.closePath();
//       ctx.fill();
      
//       // Eye
//       ctx.fillStyle = isNight ? '#ffff00' : '#ff0000';
//       ctx.fillRect(x + width / 2, y + height / 3, 4, 4);
      
//       ctx.restore();
//     }

//     function drawMeteor(x: number, y: number, width: number, height: number, frameNum: number) {
//       ctx.save();
      
//       // Meteor trail
//       const trailLength = 40;
//       const gradient = ctx.createLinearGradient(x - trailLength, y, x, y);
//       gradient.addColorStop(0, 'rgba(255, 69, 0, 0)');
//       gradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.5)');
//       gradient.addColorStop(1, 'rgba(255, 69, 0, 1)');
      
//       ctx.fillStyle = gradient;
//       ctx.fillRect(x - trailLength, y + height / 2 - 5, trailLength, 10);
      
//       // Meteor body with glow
//       ctx.shadowColor = '#ff4500';
//       ctx.shadowBlur = 15;
//       ctx.fillStyle = '#ff4500';
//       ctx.beginPath();
//       ctx.arc(x + width / 2, y + height / 2, width / 2, 0, Math.PI * 2);
//       ctx.fill();
      
//       // Inner core
//       ctx.shadowBlur = 0;
//       ctx.fillStyle = '#ffff00';
//       ctx.beginPath();
//       ctx.arc(x + width / 2, y + height / 2, width / 4, 0, Math.PI * 2);
//       ctx.fill();
      
//       ctx.restore();
//     }

//     function createParticle(x: number, y: number, type: string) {
//       particles.push({
//         x, y,
//         vx: (Math.random() - 0.5) * 10,
//         vy: (Math.random() - 0.5) * 10,
//         life: 30,
//         maxLife: 30,
//         type,
//         size: Math.random() * 5 + 2,
//         alpha: 1
//       });
//     }

//     function updateParticles() {
//       particles.forEach(p => {
//         p.x += p.vx;
//         p.y += p.vy;
//         p.life--;
//         p.alpha = p.life / p.maxLife;
//       });
//       particles = particles.filter(p => p.life > 0);
//     }

//     function drawParticles() {
//       particles.forEach(p => {
//         ctx.save();
//         ctx.globalAlpha = p.alpha || 1;
//         if (p.type === 'explosion') {
//           ctx.fillStyle = '#ff4500';
//         } else if (p.type === 'jump') {
//           ctx.fillStyle = isNight ? '#00ffff' : '#4CAF50';
//         }
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.restore();
//       });
//     }

//     function drawEnhancedCloud(x: number, y: number, size: number = 1) {
//       ctx.save();
//       const cloudColor = isNight ? "#444" : "#f0f0f0";
//       ctx.fillStyle = cloudColor;
      
//       if (isNight) {
//         ctx.shadowColor = '#444';
//         ctx.shadowBlur = 5;
//       }
      
//       ctx.beginPath();
//       ctx.arc(x, y, 15 * size, 0, Math.PI * 2);
//       ctx.arc(x + 25 * size, y, 20 * size, 0, Math.PI * 2);
//       ctx.arc(x + 50 * size, y, 15 * size, 0, Math.PI * 2);
//       ctx.arc(x + 25 * size, y - 10 * size, 15 * size, 0, Math.PI * 2);
//       ctx.fill();
//       ctx.restore();
//     }

//     function drawEnhancedGround() {
//       ctx.save();
      
//       // Ground line with glow effect
//       if (isNight) {
//         ctx.shadowColor = '#00ffff';
//         ctx.shadowBlur = 5;
//         ctx.strokeStyle = "#00ffff";
//       } else {
//         ctx.strokeStyle = "#333";
//       }
      
//       ctx.lineWidth = 3;
//       ctx.beginPath();
//       ctx.moveTo(0, GROUND_Y);
//       ctx.lineTo(canvas.width, GROUND_Y);
      
//       // Animated ground pattern
//       for (let i = -groundOffset % 60; i < canvas.width; i += 60) {
//         const waveHeight = Math.sin((i + groundOffset) / 30) * 3;
//         ctx.moveTo(i, GROUND_Y);
//         ctx.lineTo(i + 30, GROUND_Y + waveHeight);
//         ctx.lineTo(i + 45, GROUND_Y + waveHeight / 2);
//       }
//       ctx.stroke();
//       ctx.restore();
//     }

//     function drawNightSky() {
//       if (!isNight) return;
      
//       // Dark gradient sky
//       const gradient = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
//       gradient.addColorStop(0, '#0a0a2e');
//       gradient.addColorStop(1, '#16213e');
//       ctx.fillStyle = gradient;
//       ctx.fillRect(0, 0, canvas.width, GROUND_Y);
      
//       // Animated stars
//       stars.forEach(star => {
//         star.twinkle += 2;
//         const alpha = (Math.sin(star.twinkle / 20) + 1) / 2;
//         ctx.save();
//         ctx.globalAlpha = alpha;
//         ctx.fillStyle = '#ffffff';
//         ctx.shadowColor = '#ffffff';
//         ctx.shadowBlur = star.size * 2;
//         ctx.beginPath();
//         ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.restore();
//       });
      
//       // Moon
//       ctx.save();
//       ctx.fillStyle = '#ffffcc';
//       ctx.shadowColor = '#ffffcc';
//       ctx.shadowBlur = 20;
//       ctx.beginPath();
//       ctx.arc(canvas.width - 80, 40, 25, 0, Math.PI * 2);
//       ctx.fill();
//       ctx.restore();
//     }

//     function drawUI() {
//       ctx.save();
      
//       // Score display with glow effect
//       ctx.font = "bold 24px 'Courier New', monospace";
//       if (isNight) {
//         ctx.shadowColor = '#00ffff';
//         ctx.shadowBlur = 10;
//         ctx.fillStyle = '#00ffff';
//       } else {
//         ctx.fillStyle = '#333';
//       }
      
//       ctx.fillText(`SCORE: ${score.toString().padStart(5, '0')}`, 20, 40);
//       ctx.fillText(`HI: ${highScore.toString().padStart(5, '0')}`, 20, 70);
      
//       // Speed indicator
//       const speedPercent = Math.min((speed - BASE_SPEED) / (BASE_SPEED * 2), 1);
//       ctx.fillStyle = `hsl(${120 - speedPercent * 120}, 80%, 50%)`;
//       ctx.fillRect(canvas.width - 150, 20, speedPercent * 100, 10);
//       ctx.strokeStyle = isNight ? '#fff' : '#333';
//       ctx.strokeRect(canvas.width - 150, 20, 100, 10);
//       ctx.fillStyle = isNight ? '#fff' : '#333';
//       ctx.font = '12px Arial';
//       ctx.fillText('SPEED', canvas.width - 150, 45);
      
//       if (isPaused) {
//         ctx.fillStyle = isNight ? '#ff6b6b' : '#ff0000';
//         ctx.font = "bold 30px Arial";
//         ctx.fillText("⏸ PAUSED", canvas.width / 2 - 80, canvas.height / 2);
//       }
      
//       ctx.restore();
//     }

//     function spawnEnhancedObstacle() {
//       const types = Object.values(OBSTACLE_TYPES);
//       let type;
      
//       // Increase meteor chance at night
//       if (isNight && Math.random() < 0.3) {
//         type = OBSTACLE_TYPES.METEOR;
//       } else {
//         type = types[Math.floor(Math.random() * (types.length - 1))];
//       }
      
//       const obs = {
//         x: canvas.width,
//         y: type.flying ? GROUND_Y - type.height - (type.yOffset ? type.yOffset() : 0) : GROUND_Y - type.height,
//         width: type.width,
//         height: type.height,
//         draw: type.draw,
//         frame: 0,
//         color: type.color,
//         flying: type.flying
//       };
//       obstacles.push(obs);
//       lastObstacleX = canvas.width;
//     }

//     function spawnEnhancedCloud() {
//       clouds.push({ 
//         x: canvas.width, 
//         y: Math.random() * 80 + 30, 
//         speed: speed / 3,
//         size: Math.random() * 0.5 + 0.8
//       });
//     }

//     function checkCollision() {
//       obstacles.forEach(obs => {
//         const dinoHitbox = {
//           x: dino.x + 12,
//           y: dino.y + 8,
//           width: dino.width - 24,
//           height: dino.height - 12,
//         };
        
//         const obsHitbox = { 
//           x: obs.x + 5, 
//           y: obs.y + 5, 
//           width: obs.width - 10, 
//           height: obs.height - 10 
//         };
        
//         if (
//           dinoHitbox.x < obsHitbox.x + obsHitbox.width &&
//           dinoHitbox.x + dinoHitbox.width > obsHitbox.x &&
//           dinoHitbox.y < obsHitbox.y + obsHitbox.height &&
//           dinoHitbox.y + dinoHitbox.height > obsHitbox.y
//         ) {
//           gameOver = true;
//           dino.state = DINO_STATES.DEAD;
//           playCollisionSound();
          
//           // Explosion effect
//           for (let i = 0; i < 15; i++) {
//             createParticle(dino.x + dino.width / 2, dino.y + dino.height / 2, 'explosion');
//           }
          
//           // Trigger glitch effect
//           setGlitchEffect(true);
//           setTimeout(() => setGlitchEffect(false), 1000);
//         }
//       });
//     }

//     // Input handling
//     let keys = new Set<string>();
    
//     const handleKeyDown = (e: KeyboardEvent) => {
//       keys.add(e.code);
//       initAudio();
      
//       if (e.code === 'Space' || e.code === 'ArrowUp') {
//         e.preventDefault();
//         if (gameOver) {
//           restart();
//         } else if (dino.state !== DINO_STATES.JUMPING && dino.state !== DINO_STATES.DUCKING) {
//           dino.vy = JUMP_POWER;
//           dino.state = DINO_STATES.JUMPING;
//           playJumpSound();
          
//           // Jump particles
//           for (let i = 0; i < 5; i++) {
//             createParticle(dino.x + dino.width / 2, dino.y + dino.height, 'jump');
//           }
//         }
//       }
      
//       if (e.code === 'ArrowDown') {
//         if (dino.state === DINO_STATES.RUNNING) {
//           dino.state = DINO_STATES.DUCKING;
//         }
//       }
      
//       if (e.code === 'KeyP') {
//         isPaused = !isPaused;
//       }
//     };

//     const handleKeyUp = (e: KeyboardEvent) => {
//       keys.delete(e.code);
//       if (e.code === 'ArrowDown' && dino.state === DINO_STATES.DUCKING) {
//         dino.state = DINO_STATES.RUNNING;
//         dino.height = 45;
//         dino.y = GROUND_Y - 45;
//       }
//     };

//     const handleTouch = (e: TouchEvent) => {
//       e.preventDefault();
//       initAudio();
      
//       if (gameOver) {
//         restart();
//       } else if (dino.state !== DINO_STATES.JUMPING) {
//         dino.vy = JUMP_POWER;
//         dino.state = DINO_STATES.JUMPING;
//         playJumpSound();
        
//         for (let i = 0; i < 5; i++) {
//           createParticle(dino.x + dino.width / 2, dino.y + dino.height, 'jump');
//         }
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);
//     canvas.addEventListener("touchstart", handleTouch);

//     const animate = () => {
//       if (isPaused && !gameOver) {
//         requestAnimationFrame(animate);
//         return;
//       }

//       // Clear with background
//       if (isNight) {
//         drawNightSky();
//       } else {
//         const skyGradient = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
//         skyGradient.addColorStop(0, '#87CEEB');
//         skyGradient.addColorStop(1, '#E0F6FF');
//         ctx.fillStyle = skyGradient;
//         ctx.fillRect(0, 0, canvas.width, GROUND_Y);
//       }

//       // Spawn clouds
//       if (frame % 180 === 0) spawnEnhancedCloud();
      
//       // Update and draw clouds
//       clouds.forEach(cloud => {
//         cloud.x -= cloud.speed;
//         drawEnhancedCloud(cloud.x, cloud.y, cloud.size);
//       });
//       clouds = clouds.filter(cloud => cloud.x + 100 > 0);

//       // Ground
//       groundOffset += speed;
//       drawEnhancedGround();

//       // Dino physics and animation
//       if (dino.state === DINO_STATES.JUMPING) {
//         dino.vy += GRAVITY;
//         dino.y += dino.vy;
//         if (dino.y >= GROUND_Y - dino.height) {
//           dino.y = GROUND_Y - dino.height;
//           dino.vy = 0;
//           dino.state = keys.has('ArrowDown') ? DINO_STATES.DUCKING : DINO_STATES.RUNNING;
          
//           // Landing particles
//           for (let i = 0; i < 3; i++) {
//             createParticle(dino.x + Math.random() * dino.width, dino.y + dino.height, 'jump');
//           }
//         }
//       }

//       drawEnhancedDino();

//       // Spawn obstacles
//       const gap = MIN_OBSTACLE_GAP + Math.random() * (MAX_OBSTACLE_GAP - MIN_OBSTACLE_GAP);
//       if (canvas.width - lastObstacleX > gap) {
//         spawnEnhancedObstacle();
//       }

//       // Update and draw obstacles
//       obstacles.forEach(obs => {
//         obs.x -= speed;
//         obs.frame++;
//         ctx.fillStyle = obs.color;
//         obs.draw(obs.x, obs.y, obs.width, obs.height, obs.frame);
//       });
//       obstacles = obstacles.filter(obs => obs.x + obs.width > 0);

//       // Collision detection
//       if (!gameOver) {
//         checkCollision();
//       }

//       // Update particles
//       updateParticles();
//       drawParticles();

//       // Game logic updates
//       if (!gameOver) {
//         const newScore = Math.floor(frame / 5);
//         if (newScore > score && newScore % 100 === 0) {
//           playScoreSound();
//           // Milestone celebration particles
//           for (let i = 0; i < 20; i++) {
//             createParticle(dino.x + dino.width / 2, dino.y, 'jump');
//           }
//         }
        
//         score = newScore;
//         if (score > highScore) {
//           highScore = score;
//           setGameStats({ score, highScore });
//         }
        
//         // Increase difficulty
//         if (score % 100 === 0) {
//           speed += SPEED_INCREMENT;
//         }
        
//         // Toggle night mode
//         isNight = score > NIGHT_THRESHOLD;
//       }

//       // Draw game over screen
//       if (gameOver) {
//         ctx.save();
        
//         // Game over overlay with animation
//         const pulse = Math.sin(frame * 0.2) * 0.3 + 0.7;
//         ctx.globalAlpha = 0.8;
//         ctx.fillStyle = isNight ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
        
//         ctx.globalAlpha = pulse;
//         ctx.fillStyle = '#ff4444';
//         ctx.font = "bold 36px 'Courier New', monospace";
//         ctx.textAlign = 'center';
//         ctx.shadowColor = '#ff4444';
//         ctx.shadowBlur = 20;
//         ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);
        
//         ctx.shadowBlur = 0;
//         ctx.globalAlpha = 1;
//         ctx.fillStyle = isNight ? '#fff' : '#333';
//         ctx.font = "20px 'Courier New', monospace";
//         ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2);
//         ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 25);
//         ctx.font = "16px Arial";
//         ctx.fillText("Press SPACE or tap to restart", canvas.width / 2, canvas.height / 2 + 55);
        
//         ctx.textAlign = 'left';
//         ctx.restore();
        
//         frame++;
//         requestAnimationFrame(animate);
//         return;
//       }

//       // Draw UI
//       drawUI();

//       frame++;
//       requestAnimationFrame(animate);
//     };

//     const restart = () => {
//       dino = { 
//         ...dino, 
//         y: GROUND_Y - 45, 
//         vy: 0, 
//         state: DINO_STATES.RUNNING, 
//         height: 45,
//         trail: []
//       };
//       obstacles = [];
//       clouds = [];
//       particles = [];
//       frame = 0;
//       speed = BASE_SPEED;
//       score = 0;
//       gameOver = false;
//       isNight = false;
//       groundOffset = 0;
//       lastObstacleX = canvas.width;
//       setGameStats({ score: 0, highScore });
//     };

//     // Start the game
//     animate();

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//       canvas.removeEventListener("touchstart", handleTouch);
//       if (audioCtx) {
//         audioCtx.close();
//       }
//     };
//   }, [canvasSize]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
//         <div className="absolute top-40 right-32 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
//         <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-300 rounded-full animate-bounce"></div>
//         <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
//       </div>

//       {/* Glitch effect overlay */}
//       {glitchEffect && (
//         <div className="absolute inset-0 bg-red-500 opacity-20 animate-pulse z-10"></div>
//       )}

//       <div className="flex flex-col items-center justify-center min-h-screen p-8 relative z-20">
//         {/* Animated 404 title */}
//         <div className="text-center mb-8">
//           <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse mb-4">
//             404
//           </h1>
//           <div className="relative">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 animate-bounce">
//               PAGE NOT FOUND
//             </h2>
//             <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 animate-pulse"></div>
//           </div>
//         </div>

//         {/* Futuristic game container */}
//         <div className="relative group">
//           <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
//           <div className="relative bg-black/20 backdrop-blur-xl rounded-xl p-6 border border-white/10">
//             <canvas
//               ref={canvasRef}
//               width={canvasSize.width}
//               height={canvasSize.height}
//               className="rounded-lg shadow-2xl border-2 border-cyan-400/50"
//               style={{ 
//                 background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
//                 filter: glitchEffect ? 'hue-rotate(180deg) saturate(2)' : 'none'
//               }}
//             />
//           </div>
//         </div>

//         {/* Enhanced game instructions */}
//         <div className="mt-8 text-center">
//           <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 max-w-2xl">
//             <p className="text-lg text-cyan-300 mb-4 font-semibold">
//               🎮 ENHANCED DINO SURVIVAL CHALLENGE
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
//               <div className="space-y-2">
//                 <p><span className="text-cyan-400">SPACE/↑</span> - Jump</p>
//                 <p><span className="text-purple-400">↓</span> - Duck/Slide</p>
//                 <p><span className="text-pink-400">P</span> - Pause</p>
//               </div>
//               <div className="space-y-2">
//                 <p><span className="text-yellow-400">📱</span> Tap to jump on mobile</p>
//                 <p><span className="text-green-400">🌙</span> Night mode at 300pts</p>
//                 <p><span className="text-red-400">☄️</span> Watch for meteors!</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats display */}
//         <div className="mt-6 flex gap-6">
//           <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-lg px-4 py-2 border border-cyan-400/30">
//             <p className="text-cyan-300 text-sm">Current Score</p>
//             <p className="text-2xl font-bold text-white">{gameStats.score}</p>
//           </div>
//           <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-lg px-4 py-2 border border-purple-400/30">
//             <p className="text-purple-300 text-sm">High Score</p>
//             <p className="text-2xl font-bold text-white">{gameStats.highScore}</p>
//           </div>
//         </div>

//         {/* Navigation hint */}
//         <div className="mt-12 text-center">
//           <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer">
//             <span className="text-white/70 group-hover:text-white transition-colors">
//               Lost? Let's get you back home
//             </span>
//             <svg className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//             </svg>
//           </div>
//         </div>

//         {/* Floating action button for mobile */}
//         <button 
//           className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center md:hidden"
//           onClick={() => {
//             const canvas = canvasRef.current;
//             if (canvas) {
//               canvas.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));
//             }
//           }}
//         >
//           <span className="text-white text-2xl">🦕</span>
//         </button>
//       </div>

//       {/* Ambient animations */}
//       <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-pink-500/5 rounded-full blur-3xl animate-spin"></div>
//       </div>
//     </div>
//   );
// }