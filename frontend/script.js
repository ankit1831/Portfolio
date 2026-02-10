// script.js - All JavaScript functionality
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
  // Theme toggle (dark/light) + save choice
  const toggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      const next = isLight ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks) navLinks.classList.remove("active");
    });
  });

  // Contact form handling (AJAX to Formspree)
  const contactForm = document.querySelector("#contact-form");
  const statusEl = document.querySelector("#form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (statusEl) statusEl.textContent = "Sending...";

      const data = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: data,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          if (statusEl) statusEl.textContent = "Message sent successfully!";
          contactForm.reset();
        } else {
          const resData = await response.json().catch(() => null);
          if (resData && resData.errors) {
            if (statusEl)
              statusEl.textContent = resData.errors
                .map((e) => e.message)
                .join(", ");
          } else {
            if (statusEl)
              statusEl.textContent =
                "Oops! There was a problem submitting your form.";
          }
        }
      } catch (err) {
        if (statusEl) statusEl.textContent = "Network error. Please try again.";
      }
    });
  }

  // Project modals logic
  const projectCards = document.querySelectorAll(
    ".project-card[data-modal], .experience-card[data-modal]",
  );

  projectCards.forEach((card) => {
    const modalId = card.dataset.modal;
    const dialog = document.getElementById(modalId);
    if (!dialog) return;

    const openDialog = () => {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    };

    card.addEventListener("click", openDialog);

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDialog();
      }
    });

    const closeBtn = dialog.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
      });
    }

    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
      }
    });
  });
});

// ========== CLEAN AI CHAT WITH MEMORY ==========
const API_URL = "https://ankit-protfolio.onrender.com/chat";

let AI_CHAT_LOADED = false;
let chatHistory = []; // <-- NEW: Stores conversation history

function injectTypingDotsCSSOnce() {
  if (document.getElementById("ai-typing-dots-css")) return;

  const style = document.createElement("style");
  style.id = "ai-typing-dots-css";
  style.textContent = `
    .ai-typing-dots .dot{
      width:8px;height:8px;border-radius:50%;
      background: rgba(0,255,136,0.85);
      box-shadow: 0 0 0 2px rgba(0,255,136,0.10);
      animation: aiDotBounce 1s infinite ease-in-out;
    }
    .ai-typing-dots .dot:nth-child(2){ animation-delay: 0.15s; opacity:0.85; }
    .ai-typing-dots .dot:nth-child(3){ animation-delay: 0.30s; opacity:0.7; }

    @keyframes aiDotBounce{
      0%,80%,100% { transform: translateY(0); }
      40% { transform: translateY(-6px); }
    }
  `;
  document.head.appendChild(style);
}

function showAIChatModal() {
  const dialog = document.getElementById("ai-chat-modal");
  if (!dialog) return;

  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");

  setTimeout(() => {
    initAIChatUI();
    focusAIInput();
  }, 0);
}

function initAIChatUI() {
  if (AI_CHAT_LOADED) return;

  const shell = document.querySelector(".ai-chat-shell");
  if (!shell) return;
  injectTypingDotsCSSOnce();

  shell.innerHTML = `
    <div class="ai-chat-wrap" style="
      height:100%;
      display:flex;
      flex-direction:column;
      background:var(--bg1);
      border:2px solid var(--border);
      border-radius:14px;
      overflow:hidden;
    ">
      <div class="ai-chat-header" style="
        flex-shrink:0;
        background:linear-gradient(45deg,var(--accent1),var(--accent2));
        color:#0a0a0a;
        padding:16px 20px;
        text-align:center;
        font-family:Poppins, sans-serif;
        font-weight:700;
        font-size:1.1rem;
        border-bottom:2px solid rgba(255,255,255,0.25);
      ">
        <i class="fas fa-robot" style="margin-right:8px;"></i>
        Ankit's Portfolio AI
      </div>

      <div id="ai-chat-box" style="
        flex:1;
        overflow-y:auto;
        padding:18px;
        display:flex;
        flex-direction:column;
        gap:12px;
        background:var(--bg1);
      ">
        <div class="ai-msg bot" style="
          max-width:78%;
          align-self:flex-start;
          padding:12px 14px;
          border-radius:16px;
          border:1px solid var(--border);
          background:rgba(255,255,255,0.08);
          color:var(--text);
          line-height:1.5;
        ">
          Hi! Ask me about Ankit's skills, projects, internship, or achievements.
        </div>
      </div>

      <div id="ai-typing" style="display:none; padding:0 18px 12px;">
        <span class="ai-typing-dots" style="display:inline-flex; gap:6px; align-items:center;">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        </span>
      </div>

      <div style="
        flex-shrink:0;
        display:flex;
        gap:12px;
        padding:16px;
        background:var(--bg2);
        border-top:2px solid var(--border);
      ">
        <input id="ai-input" type="text" placeholder="Ask about my projects, skills..."
          style="
            flex:1;
            padding:12px 16px;
            border-radius:999px;
            border:2px solid var(--border);
            outline:none;
            background:rgba(255,255,255,0.06);
            color:var(--text);
            font-family:Inter, sans-serif;
          "
        />
        <button id="ai-clear" type="button"
          style="
            padding:12px 18px;
            border-radius:999px;
            border:2px solid var(--border);
            cursor:pointer;
            font-weight:800;
            background:transparent;
            color:var(--text);
          "
        >Clear</button>

        <button id="ai-send" type="button"
          style="
            padding:12px 18px;
            border-radius:999px;
            border:none;
            cursor:pointer;
            font-weight:800;
            color:#0a0a0a;
            background:linear-gradient(45deg,var(--accent1),var(--accent2));
          "
        >Send</button>
      </div>
    </div>
  `;

  const input = document.getElementById("ai-input");
  const sendBtn = document.getElementById("ai-send");
  const clearBtn = document.getElementById("ai-clear");

  if (clearBtn) clearBtn.addEventListener("click", clearAIChat);
  if (sendBtn) sendBtn.addEventListener("click", sendAIChat);
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendAIChat();
    });
  }

  AI_CHAT_LOADED = true;
}

function focusAIInput() {
  const input = document.getElementById("ai-input");
  if (input) input.focus();
}

// 3) Send message with History
async function sendAIChat() {
  const input = document.getElementById("ai-input");
  const box = document.getElementById("ai-chat-box");
  const typing = document.getElementById("ai-typing");

  if (!input || !box) return;

  const q = input.value.trim();
  if (!q) return;

  // Add User Message to UI
  addAIMessage(q, "user");
  input.value = "";

  // Show typing
  if (typing) typing.style.display = "block";
  box.scrollTop = box.scrollHeight;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 35000);

    // Send Query + History
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: q,
        history: chatHistory, // <-- Sending history here
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const data = await res.json();

    if (typing) typing.style.display = "none";

    // Add Bot Response to UI
    addAIMessage(data.answer || "No response.", "bot", data.sources || []);

    // Update History
    chatHistory.push({ role: "user", content: q });
    chatHistory.push({ role: "assistant", content: data.answer });
  } catch (err) {
    if (typing) typing.style.display = "none";
    addAIMessage("Error: " + (err.message || err), "bot");
    console.error(err);
  }
}

function clearAIChat() {
  const box = document.getElementById("ai-chat-box");
  if (!box) return;

  chatHistory = []; // <-- Reset History

  box.innerHTML = `
    <div class="ai-msg bot" style="
      max-width:78%;
      align-self:flex-start;
      padding:12px 14px;
      border-radius:16px;
      border:1px solid var(--border);
      background:rgba(255,255,255,0.08);
      color:var(--text);
      line-height:1.5;
    ">
      Hi! Ask me about Ankit's skills, projects, internship, or achievements.
    </div>
  `;
  focusAIInput();
}

function addAIMessage(text, type, sources = []) {
  const box = document.getElementById("ai-chat-box");
  if (!box) return;

  const div = document.createElement("div");
  div.className = `ai-msg ${type}`;
  div.textContent = text;

  // Basic styling
  // script.js - inside addAIMessage function
  div.style.maxWidth = "78%";
  div.style.padding = "12px 14px";
  div.style.borderRadius = "16px";
  div.style.lineHeight = "1.5";
  div.style.whiteSpace = "pre-wrap"; // <--- ADD THIS LINE HERE

  if (type === "user") {
    div.style.alignSelf = "flex-end";
    div.style.color = "#0a0a0a";
    div.style.background =
      "linear-gradient(45deg,var(--accent1),var(--accent2))";
    div.style.borderBottomRightRadius = "6px";
  } else {
    div.style.alignSelf = "flex-start";
    div.style.color = "var(--text)";
    div.style.background = "rgba(255,255,255,0.08)";
    div.style.border = "1px solid var(--border)";
    div.style.borderBottomLeftRadius = "6px";
  }

  box.appendChild(div);

  // Add sources if available
  if (type === "bot" && sources && sources.length) {
    const srcWrap = document.createElement("div");
    srcWrap.style.cssText =
      "margin-top:8px;display:flex;flex-wrap:wrap;gap:8px;opacity:0.9;";

    sources.slice(0, 4).forEach((s) => {
      const chip = document.createElement("span");
      chip.textContent = s.source_file;
      chip.title = s.snippet; // Show snippet on hover
      chip.style.cssText = `
        font-size:0.75rem;
        padding:4px 8px;
        border-radius:12px;
        border:1px solid var(--border);
        background:rgba(255,255,255,0.05);
        cursor:help;
      `;
      srcWrap.appendChild(chip);
    });
    div.appendChild(srcWrap);
  }

  box.scrollTop = box.scrollHeight;
}

// Hook buttons
document.querySelectorAll('[data-modal="ai-chat-modal"]').forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    showAIChatModal();
  });
});

// Close modal logic
const aiChatModal = document.getElementById("ai-chat-modal");
if (aiChatModal) {
  const closeBtn = aiChatModal.querySelector(".modal-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (typeof aiChatModal.close === "function") aiChatModal.close();
      else aiChatModal.removeAttribute("open");
    });
  }
  aiChatModal.addEventListener("click", (e) => {
    if (e.target === aiChatModal) {
      if (typeof aiChatModal.close === "function") aiChatModal.close();
      else aiChatModal.removeAttribute("open");
    }
  });
}
