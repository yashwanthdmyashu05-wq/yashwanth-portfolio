/**
 * ============================================================================
 * FUTURISTIC TERMINAL & HACKER AESTHETIC ENGINE
 * Professional Software Engineer Portfolio - Yashwanth
 * ============================================================================
 * 
 * Includes:
 * 1. Web Audio API Synthesizer (Terminal Keystrokes & Command Chimes)
 * 2. High-Performance Digital Matrix Rain Canvas Stream
 * 3. Terminal Typewriter Engine (Hero Dynamic Titles)
 * 4. CRT Scanline & Visual Effects Toggles
 * 5. Skills Matrix Category Filter Engine
 * 6. Projects & Repository Click Connectors
 * 7. AI Portfolio Assistant Engine (Interactive Chat, CLI Parser & API Hook)
 * 8. Contact Transmission Form & Validation
 * 9. Keyboard Shortcuts & Accessibility Navigation
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // GLOBAL STATE MANAGEMENT
  // --------------------------------------------------------------------------
  const state = {
    audioEnabled: true,
    crtEnabled: true,
    matrixEnabled: true,
    isMobileMenuOpen: false,
    audioCtx: null,
    isAiTyping: false
  };

  // DOM Elements Cache
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const crtToggleBtn = document.getElementById('crtToggleBtn');
  const matrixToggleBtn = document.getElementById('matrixToggleBtn');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mainNavbar = document.getElementById('mainNavbar');
  const navBackdrop = document.getElementById('navBackdrop');
  const clockDisplay = document.getElementById('clockDisplay');
  const typewriterText = document.getElementById('typewriterText');
  const matrixCanvas = document.getElementById('matrixCanvas');

  // AI Assistant DOM Elements
  const aiChatForm = document.getElementById('aiChatForm');
  const aiChatInput = document.getElementById('aiChatInput');
  const chatMessagesStream = document.getElementById('chatMessagesStream');
  const aiChatDisplay = document.getElementById('aiChatDisplay');
  const aiTypingIndicator = document.getElementById('aiTypingIndicator');
  const clearChatBtn = document.getElementById('clearChatBtn');
  const quickChipBtns = document.querySelectorAll('.quick-chip-btn');

  // Contact Form DOM Elements
  const contactForm = document.getElementById('contactForm');
  const contactSuccessBanner = document.getElementById('contactSuccessBanner');
  const dismissAlertBtn = document.getElementById('dismissAlertBtn');

  // Skills Filter DOM Elements
  const cliFilterBtns = document.querySelectorAll('.cli-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  // ==========================================================================
  // 01. WEB AUDIO SYNTHESIZER (Terminal Keystrokes & Cyber Blips)
  // ==========================================================================

  function getAudioContext() {
    if (!state.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        state.audioCtx = new AudioCtx();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
    return state.audioCtx;
  }

  // Soft mechanical terminal keystroke blip
  function playKeyClickSound() {
    if (!state.audioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800 + Math.random() * 200, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.025);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch (e) {
      // Graceful fallback for restricted audio policies
    }
  }

  // Command Execute / Select Chime
  function playCommandExecuteSound() {
    if (!state.audioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.05); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.1); // G5

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {}
  }

  // Toggle Switch Chirp
  function playToggleChirp(pitchUp = true) {
    if (!state.audioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      const startFreq = pitchUp ? 440 : 880;
      const endFreq = pitchUp ? 880 : 440;

      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.06);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {}
  }

  // Toggle Sound State
  function toggleAudio() {
    state.audioEnabled = !state.audioEnabled;
    localStorage.setItem('terminal_audio_pref', state.audioEnabled ? 'true' : 'false');
    if (soundToggleBtn) {
      soundToggleBtn.setAttribute('aria-pressed', state.audioEnabled ? 'true' : 'false');
      soundToggleBtn.querySelector('.tool-icon').textContent = state.audioEnabled ? '🔊' : '🔇';
      soundToggleBtn.querySelector('.tool-label').textContent = state.audioEnabled ? 'AUDIO: ON' : 'AUDIO: OFF';
    }
    playToggleChirp(state.audioEnabled);
  }

  // Toggle CRT Scanlines
  function toggleCrt() {
    state.crtEnabled = !state.crtEnabled;
    document.body.classList.toggle('scanlines-enabled', state.crtEnabled);
    localStorage.setItem('terminal_crt_pref', state.crtEnabled ? 'true' : 'false');
    if (crtToggleBtn) {
      crtToggleBtn.setAttribute('aria-pressed', state.crtEnabled ? 'true' : 'false');
      crtToggleBtn.querySelector('.tool-icon').textContent = state.crtEnabled ? '⚡' : '🚫';
      crtToggleBtn.querySelector('.tool-label').textContent = state.crtEnabled ? 'CRT: ON' : 'CRT: OFF';
    }
    playToggleChirp(state.crtEnabled);
  }

  // Toggle Matrix Background
  function toggleMatrix() {
    state.matrixEnabled = !state.matrixEnabled;
    document.body.classList.toggle('matrix-disabled', !state.matrixEnabled);
    localStorage.setItem('terminal_matrix_pref', state.matrixEnabled ? 'true' : 'false');
    if (matrixToggleBtn) {
      matrixToggleBtn.setAttribute('aria-pressed', state.matrixEnabled ? 'true' : 'false');
      matrixToggleBtn.querySelector('.tool-label').textContent = state.matrixEnabled ? 'MATRIX: ON' : 'MATRIX: OFF';
    }
    playToggleChirp(state.matrixEnabled);
  }

  // ==========================================================================
  // 02. DIGITAL MATRIX RAIN CANVAS BACKGROUND
  // ==========================================================================
  function initMatrixRain() {
    if (!matrixCanvas) return;
    const ctx = matrixCanvas.getContext('2d');
    if (!ctx) return;

    let width = (matrixCanvas.width = window.innerWidth);
    let height = (matrixCanvas.height = window.innerHeight);

    // Characters: Katakana, Binary, Hex, Latin
    const chars = '01ABCDEFXYZ01010101<>{}[]!#$*%&=+~';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);

    function handleResize() {
      width = matrixCanvas.width = window.innerWidth;
      height = matrixCanvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    }
    window.addEventListener('resize', handleResize);

    let lastTime = 0;
    const fps = 30;
    const frameInterval = 1000 / fps;

    function renderMatrix(currentTime) {
      requestAnimationFrame(renderMatrix);
      if (!state.matrixEnabled) return;

      const elapsed = currentTime - lastTime;
      if (elapsed < frameInterval) return;
      lastTime = currentTime - (elapsed % frameInterval);

      ctx.fillStyle = 'rgba(6, 8, 11, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Alternate cyan and neon green matrix code characters
        ctx.fillStyle = i % 5 === 0 ? '#00f0ff' : '#00ff66';

        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    requestAnimationFrame(renderMatrix);
  }

  // ==========================================================================
  // 03. HERO TYPEWRITER ANIMATION ENGINE
  // ==========================================================================
  const typewriterTitles = [
    'Full-Stack Software Engineer',
    'Distributed Systems Architect',
    'Cloud & Infrastructure Developer',
    'Microservices & Low-Latency API Engineer',
    'Open-Source Contributor & Tech Builder'
  ];

  let currentTitleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typewriterDelay = 120;

  function runTypewriter() {
    if (!typewriterText) return;

    const currentTitle = typewriterTitles[currentTitleIndex];

    if (isDeleting) {
      typewriterText.textContent = currentTitle.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typewriterDelay = 50;
    } else {
      typewriterText.textContent = currentTitle.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typewriterDelay = 95;
    }

    if (!isDeleting && currentCharIndex === currentTitle.length) {
      // Pause at end of completed word
      typewriterDelay = 2200;
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      // Move to next title
      isDeleting = false;
      currentTitleIndex = (currentTitleIndex + 1) % typewriterTitles.length;
      typewriterDelay = 400;
    }

    setTimeout(runTypewriter, typewriterDelay);
  }

  // ==========================================================================
  // 04. REAL-TIME SYSTEM CLOCK
  // ==========================================================================
  function updateClock() {
    if (!clockDisplay) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockDisplay.textContent = `${hours}:${minutes}:${seconds} LOC`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // ==========================================================================
  // 05. SKILLS MATRIX FILTERING ENGINE
  // ==========================================================================
  cliFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playKeyClickSound();
      cliFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filter === 'all' || cardCategory === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ==========================================================================
  // 06. PROJECTS LINK EXPLANATION & CONNECTOR LOGIC
  // ==========================================================================
  /**
   * Project Cards Connector Explanation:
   * --------------------------------------------------------------------------
   * Each project card is styled as an authentic terminal window and includes:
   * 1. Direct code inspection button (`VIEW_CODE`) linking to Yashwanth's GitHub repo.
   * 2. Live production demo button (`LIVE_DEMO`) linking to deployed apps.
   * 3. Accessible aria labels and keyboard focusability (tabindex="0").
   */
  document.querySelectorAll('.project-term-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      playKeyClickSound();
    });
  });

  // ==========================================================================
  // 07. SECTION 10: AI PORTFOLIO ASSISTANT (AI_PORTFOLIO_ASSISTANT.exe)
  // ==========================================================================
  /**
   * AI Knowledge Base & Simulated Neural Parser:
   * Accurately answers questions concerning:
   * - Yashwanth's core skills, languages, and frameworks
   * - Featured software projects and system architecture
   * - Career timeline (2024 to 2026+) and education
   * - Availability for hire and contact information
   * - Built-in CLI commands (help, skills, projects, clear, etc.)
   */
  const aiKnowledgeBase = {
    bio: `Yashwanth is a passionate Full-Stack Software Engineer & Systems Architect based in Bangalore, India. He builds high-concurrency microservices, robust cloud infrastructure, and responsive web applications with deep focus on clean architecture, security, and performance.`,
    skills: `Yashwanth's technical competencies include:\n• Languages: TypeScript, JavaScript (ESNext), Python 3, Go, C++, SQL\n• Frameworks: React, Next.js, Node.js, Express, FastAPI\n• Datastores: PostgreSQL, Redis (Caching), MongoDB\n• DevOps & Cloud: Docker, Kubernetes, AWS (EC2, S3, Lambda), Git CI/CD, Linux`,
    projects: `Key Featured Projects:\n1. CyberMesh Cloud Orchestrator (Next.js, Docker, Redis, WebSockets) - Microservice mesh telemetry.\n2. NexusQL API Gateway (Go, Node.js, GraphQL, Redis) - High-throughput reverse proxy.\n3. Sentinel AI Vulnerability Scanner (Python, FastAPI, AST) - Automated CVE & secret auditor.\n4. KernelTrace Profiler (C++, eBPF, Linux) - Real-time kernel telemetry dashboard.\n5. CryptoVault Key Manager (TypeScript, AES-256-GCM, RSA) - HSM key lifecycle management.\n6. WebAudio Cyber Synth (Vanilla JS, Web Audio API) - Real-time browser frequency engine.`,
    experience: `Career Milestones Timeline:\n> 2024: Started Engineering (CS & Systems foundation, algorithms, C++)\n> 2025: Completed Major Project (CyberMesh Cloud Orchestrator)\n> 2026: Software Engineering Internship (Scalable microservices, database optimization, CI/CD)\n> 2026: Cloud Solutions Architecture Certification (AWS VPC, IAM, serverless)`,
    education: `Education: Bachelor of Computer Science & Engineering. Rigorous coursework in Distributed Systems, Operating System Kernels, Database Internals, and Computer Networks.`,
    hire: `Yashwanth is currently OPEN to Software Engineering roles, Full-Stack opportunities, and distributed systems engineering internships. You can send a direct dispatch via the contact console below or email directly at yashwanth@example.com!`,
    contact: `You can reach Yashwanth through:\n• Direct Dispatch: Use the contact form at #contact\n• GitHub: https://github.com/yashwanth\n• LinkedIn: https://linkedin.com/in/yashwanth\n• X/Twitter: https://x.com/yashwanth_dev\n• Email: yashwanth@example.com`
  };

  /**
   * ========================================================================
   * IMPORTANT: HOW TO INTEGRATE AN EXTERNAL AI API (e.g. OpenAI / Claude)
   * ========================================================================
   * 
   * SECURITY WARNING:
   * Never store private API keys (such as `OPENAI_API_KEY`) in frontend
   * client-side code! Anyone inspecting the browser console or network tab
   * can steal exposed API keys.
   * 
   * TO HOOK UP A REAL AI BACKEND:
   * 1. Create a secure serverless endpoint (e.g., Next.js `/api/chat`,
   *    an AWS Lambda function, or an Express.js backend).
   * 2. Store your `OPENAI_API_KEY` securely in `.env.local` or environment
   *    variables on the server.
   * 3. Replace the simulated call below with:
   * 
   *    ```javascript
   *    async function callRealBackendAi(prompt) {
   *      const response = await fetch('/api/chat', {
   *        method: 'POST',
   *        headers: { 'Content-Type': 'application/json' },
   *        body: JSON.stringify({ message: prompt })
   *      });
   *      const data = await response.json();
   *      return data.reply;
   *    }
   *    ```
   * ========================================================================
   */
  async function generateAiResponse(userPrompt) {
    const query = userPrompt.toLowerCase().trim();

    // 1. Built-in Terminal Commands
    if (query === 'help') {
      return `AVAILABLE TERMINAL COMMANDS:\n• help     - Display this command manual\n• skills   - Print technical skill runtimes\n• projects - List featured open-source repositories\n• timeline - View chronological career logs\n• contact  - View transmission coordinates\n• whoami   - Print visitor session telemetry\n• clear    - Clear terminal buffer\n• matrix   - Toggle digital rain background\n• ping     - Measure simulated socket roundtrip`;
    }

    if (query === 'clear' || query === 'cls') {
      clearChatHistory();
      return null;
    }

    if (query === 'whoami') {
      return `USER_TELEMETRY:\n• Caller: Guest Engineer / Evaluator\n• Host: yashwanth-portfolio-v2026\n• Role: Technical Reviewer\n• Security Clearance: Granted`;
    }

    if (query === 'matrix') {
      toggleMatrix();
      return `Matrix digital stream state toggled: ${state.matrixEnabled ? 'ACTIVE' : 'MUTED'}`;
    }

    if (query === 'ping') {
      return `PING yashwanth.dev (127.0.0.1): 56 data bytes\n64 bytes from yashwanth.dev: icmp_seq=0 ttl=64 time=12.4 ms\n--- round-trip: min/avg/max = 10.1/12.4/14.8 ms ---`;
    }

    if (query === 'sudo' || query.startsWith('sudo ')) {
      return `[PERMISSION DENIED] User is not in sudoers file. This incident has been logged and reported to root@yashwanth-os.`;
    }

    // 2. Intelligent Context Pattern Matching
    if (query.includes('skill') || query.includes('language') || query.includes('tech stack') || query.includes('technolog') || query.includes('stack')) {
      return aiKnowledgeBase.skills;
    }

    if (query.includes('project') || query.includes('repo') || query.includes('cybermesh') || query.includes('sentinel') || query.includes('work')) {
      return aiKnowledgeBase.projects;
    }

    if (query.includes('experience') || query.includes('timeline') || query.includes('career') || query.includes('intern') || query.includes('history')) {
      return aiKnowledgeBase.experience;
    }

    if (query.includes('education') || query.includes('degree') || query.includes('college') || query.includes('university') || query.includes('study')) {
      return aiKnowledgeBase.education;
    }

    if (query.includes('hire') || query.includes('availab') || query.includes('job') || query.includes('open') || query.includes('contract') || query.includes('role')) {
      return aiKnowledgeBase.hire;
    }

    if (query.includes('contact') || query.includes('email') || query.includes('touch') || query.includes('reach') || query.includes('linkedin') || query.includes('github')) {
      return aiKnowledgeBase.contact;
    }

    if (query.includes('who is') || query.includes('about') || query.includes('who are you') || query.includes('yashwanth')) {
      return aiKnowledgeBase.bio;
    }

    // Default Fallback
    return `Query received: "${userPrompt}"\n\nYashwanth is a Full-Stack Software Engineer with strong skills in TypeScript, Next.js, Node.js, Python, Docker, and PostgreSQL. Would you like to review his [skills], examine his [projects], inspect his [timeline], or discuss his [hire] availability?`;
  }

  // Append Message to Chat Display
  function appendChatMessage(sender, text, isUser = false) {
    if (!chatMessagesStream || !text) return;

    const entry = document.createElement('div');
    entry.className = `chat-entry ${isUser ? 'user-entry' : 'bot-entry'}`;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    entry.innerHTML = `
      <div class="entry-meta">
        <span class="entry-sender ${isUser ? 'text-cyan' : 'text-neon-green'}">${sender}:</span>
        <span class="entry-time text-dim">${timeStr}</span>
      </div>
      <div class="entry-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}">
        <p style="white-space: pre-wrap;">${escapeHtml(text)}</p>
      </div>
    `;

    chatMessagesStream.appendChild(entry);
    aiChatDisplay.scrollTop = aiChatDisplay.scrollHeight;
  }

  // Clear Chat History
  function clearChatHistory() {
    if (!chatMessagesStream) return;
    chatMessagesStream.innerHTML = '';
    appendChatMessage('[AI_ASSISTANT @ NEURAL_CORE]', 'Terminal buffer cleared. System ready for new commands.');
    playCommandExecuteSound();
  }

  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', clearChatHistory);
  }

  // Handle Chat Input Form Submit
  if (aiChatForm && aiChatInput) {
    aiChatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const prompt = aiChatInput.value.trim();
      if (!prompt || state.isAiTyping) return;

      playKeyClickSound();
      appendChatMessage('[VISITOR @ TERMINAL]', prompt, true);
      aiChatInput.value = '';

      // Show Typing Indicator
      state.isAiTyping = true;
      if (aiTypingIndicator) {
        aiTypingIndicator.style.display = 'flex';
        aiChatDisplay.scrollTop = aiChatDisplay.scrollHeight;
      }

      // Simulated network and generation delay (400ms - 900ms)
      const simulatedDelay = 500 + Math.random() * 400;

      setTimeout(async () => {
        const responseText = await generateAiResponse(prompt);

        if (aiTypingIndicator) {
          aiTypingIndicator.style.display = 'none';
        }
        state.isAiTyping = false;

        if (responseText) {
          appendChatMessage('[AI_ASSISTANT @ NEURAL_CORE]', responseText, false);
          playCommandExecuteSound();
        }
      }, simulatedDelay);
    });
  }

  // Quick Prompt Chips Click
  quickChipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query');
      if (aiChatInput && query) {
        aiChatInput.value = query;
        aiChatForm.dispatchEvent(new Event('submit'));
      }
    });
  });

  // ==========================================================================
  // 08. CONTACT DISPATCH TRANSMISSION FORM
  // ==========================================================================
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.textContent = '>> Error: Caller identity name is required.';
        isValid = false;
      } else {
        nameError.textContent = '';
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = '>> Error: Valid return transmission email required.';
        isValid = false;
      } else {
        emailError.textContent = '';
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.textContent = '>> Error: Transmission payload message cannot be empty.';
        isValid = false;
      } else {
        messageError.textContent = '';
      }

      if (!isValid) {
        playToggleChirp(false);
        return;
      }

      // Submit Success
      playCommandExecuteSound();
      if (contactSuccessBanner) {
        contactSuccessBanner.style.display = 'flex';
        contactSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      contactForm.reset();
    });
  }

  if (dismissAlertBtn && contactSuccessBanner) {
    dismissAlertBtn.addEventListener('click', () => {
      contactSuccessBanner.style.display = 'none';
      playKeyClickSound();
    });
  }

  // ==========================================================================
  // 09. NAVIGATION & MOBILE DRAWER LOGIC
  // ==========================================================================
  function toggleMobileMenu() {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
    mainNavbar.classList.toggle('mobile-active', state.isMobileMenuOpen);
    navBackdrop.classList.toggle('active', state.isMobileMenuOpen);
    mobileNavToggle.setAttribute('aria-expanded', state.isMobileMenuOpen ? 'true' : 'false');
    playToggleChirp(state.isMobileMenuOpen);
  }

  function closeMobileMenu() {
    if (!state.isMobileMenuOpen) return;
    state.isMobileMenuOpen = false;
    mainNavbar.classList.remove('mobile-active');
    navBackdrop.classList.remove('active');
    mobileNavToggle.setAttribute('aria-expanded', 'false');
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', toggleMobileMenu);
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Active Nav Link Scrollspy (IntersectionObserver)
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  function setActiveNavLink(sectionId) {
    navLinks.forEach(link => {
      const match = link.getAttribute('data-section') === sectionId;
      link.classList.toggle('active', match);
      if (match) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNavLink(entry.target.id);
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    });

    sections.forEach(sec => observer.observe(sec));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      playKeyClickSound();
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      playCommandExecuteSound();
    });
  }

  // Resume Download Button Simulation
  const viewResumeBtn = document.getElementById('viewResumeBtn');
  if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      playCommandExecuteSound();
      alert('>> STDOUT: cat resume_yashwanth.pdf\n\nYashwanth - Software Engineer & Systems Architect\nCore Stack: TypeScript, Python, Go, Next.js, Node.js, Docker, AWS, PostgreSQL\nContact: yashwanth@example.com\n\n(A PDF resume download can be linked here)');
    });
  }

  // ==========================================================================
  // 10. GLOBAL KEYBOARD SHORTCUTS
  // ==========================================================================
  document.addEventListener('keydown', (e) => {
    // If typing inside an input or textarea, avoid triggering hotkeys
    const isEditing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);

    if (e.key === '/' && !isEditing) {
      e.preventDefault();
      if (aiChatInput) {
        aiChatInput.focus();
        aiChatInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        playKeyClickSound();
      }
    } else if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

  // Top Bar Controls Bindings
  if (soundToggleBtn) soundToggleBtn.addEventListener('click', toggleAudio);
  if (crtToggleBtn) crtToggleBtn.addEventListener('click', toggleCrt);
  if (matrixToggleBtn) matrixToggleBtn.addEventListener('click', toggleMatrix);

  // Helper: HTML Escape
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ==========================================================================
  // 11. INITIALIZATION & PREFERENCES RESTORATION
  // ==========================================================================
  function init() {
    // Restore saved audio preference
    const savedAudio = localStorage.getItem('terminal_audio_pref');
    if (savedAudio === 'false') {
      state.audioEnabled = false;
      if (soundToggleBtn) {
        soundToggleBtn.setAttribute('aria-pressed', 'false');
        soundToggleBtn.querySelector('.tool-icon').textContent = '🔇';
        soundToggleBtn.querySelector('.tool-label').textContent = 'AUDIO: OFF';
      }
    }

    // Restore saved CRT preference
    const savedCrt = localStorage.getItem('terminal_crt_pref');
    if (savedCrt === 'false') {
      state.crtEnabled = false;
      document.body.classList.remove('scanlines-enabled');
      if (crtToggleBtn) {
        crtToggleBtn.setAttribute('aria-pressed', 'false');
        crtToggleBtn.querySelector('.tool-icon').textContent = '🚫';
        crtToggleBtn.querySelector('.tool-label').textContent = 'CRT: OFF';
      }
    }

    // Restore saved Matrix preference
    const savedMatrix = localStorage.getItem('terminal_matrix_pref');
    if (savedMatrix === 'false') {
      state.matrixEnabled = false;
      document.body.classList.add('matrix-disabled');
      if (matrixToggleBtn) {
        matrixToggleBtn.setAttribute('aria-pressed', 'false');
        matrixToggleBtn.querySelector('.tool-label').textContent = 'MATRIX: OFF';
      }
    }

    // Launch matrix rain and typewriter
    initMatrixRain();
    runTypewriter();
  }

  // Start on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
