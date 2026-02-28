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
const API_URL = "https://portfolio-pied-nine-18.vercel.app/chat";

let AI_CHAT_LOADED = false;
// Load history from previous session or start fresh
let chatHistory =
  JSON.parse(sessionStorage.getItem("ankit_chat_history")) || [];
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
        font-family:Poppins, sans-serif;
        font-weight:700;
        font-size:1.1rem;
        border-bottom:2px solid rgba(255,255,255,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      ">
        <i class="fas fa-robot"></i>
        Ankit's AI Assistant
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
        <div class="ai-msg bot">
          Hi! Ask me about Ankit's skills, projects, internship, or achievements.
        </div>
      </div>

      <div id="ai-typing" style="display:none; padding:0 18px 12px;">
        <span class="ai-typing-dots" style="display:inline-flex; gap:6px; align-items:center;">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        </span>
      </div>

      <div id="ai-suggestions" style="
        display:flex;
        gap:8px;
        padding:0 18px 12px;
        overflow-x:auto;
      ">
        <button class="ai-pill" type="button" data-q="What are Ankit's skills?">🎯 Skills</button>
        <button class="ai-pill" type="button" data-q="Tell me about Ankit's projects.">🚀 Projects</button>
        <button class="ai-pill" type="button" data-q="What is tech stack used by Ankit?">💻 Tech Stack</button>
        <button class="ai-pill" type="button" data-q="Tell me about Ankit's Internship?">🏢 Internship</button>
        <button class="ai-pill" type="button" data-q="Tell me about Ankit's education and background.">🎓 Education</button>
      </div>

      <div style="
        flex-shrink:0;
        display:flex;
        gap:8px;
        padding:12px;
        background:var(--bg2);
        border-top:2px solid var(--border);
        align-items: center; /* Ensures the mic icon aligns perfectly with the buttons */
      ">
        <input id="ai-input" type="text" placeholder="Ask about my projects..."
          style="
            flex:1;
            min-width: 0;
            padding:10px 14px;
            border-radius:999px;
            border:2px solid var(--border);
            outline:none;
            background:rgba(255,255,255,0.06);
            color:var(--text);
            font-family:Inter, sans-serif;
          "
        />

        <button id="mic-btn" type="button" title="Speak your question" 
          style="
            background: transparent;
            border: none;
            color: var(--text);
            font-size: 1.2rem;
            cursor: pointer;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.3s ease;
          ">
          <i class="fa-solid fa-microphone"></i>
        </button>

        <button id="ai-clear" type="button"
          style="
            padding:10px 14px;
            border-radius:999px;
            border:2px solid var(--border);
            cursor:pointer;
            font-weight:800;
            background:transparent;
            color:var(--text);
            white-space: nowrap;
          "
        >Clear</button>

        <button id="ai-send" type="button"
          style="
            padding:10px 14px;
            border-radius:999px;
            border:none;
            cursor:pointer;
            font-weight:800;
            color:#0a0a0a;
            background:linear-gradient(45deg,var(--accent1),var(--accent2));
            white-space: nowrap;
          "
        >Send</button>
      </div>
    </div>
  `;

  const input = document.getElementById("ai-input");
  const sendBtn = document.getElementById("ai-send");
  const clearBtn = document.getElementById("ai-clear");
  // Handle Suggestion Pill Clicks
  const suggDiv = document.getElementById("ai-suggestions");
  if (suggDiv) {
    suggDiv.querySelectorAll(".ai-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (input) {
          input.value = btn.getAttribute("data-q");
          sendAIChat(); // Instantly send the message
        }
      });
    });
  }

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

// 3) Send message with Streaming and History Support
async function sendAIChat() {
  const input = document.getElementById("ai-input");
  const box = document.getElementById("ai-chat-box");
  const typing = document.getElementById("ai-typing");

  if (!input || !box) return;

  const q = input.value.trim();
  if (!q) return;

  // 1. Add User Message to UI
  addAIMessage(q, "user");
  input.value = "";

  // 2. Setup Bot Message Placeholder for Streaming
  // We create the message element early so we can append text to it live
  const botMsgDiv = document.createElement("div");
  botMsgDiv.className = "ai-msg bot";
  const botText = document.createElement("div");
  botText.className = "ai-msg-text";
  botMsgDiv.appendChild(botText);
  box.appendChild(botMsgDiv);

  // Show typing indicator initially
  if (typing) typing.style.display = "block";
  box.scrollTop = box.scrollHeight;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: q,
        history: chatHistory,
      }),
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    // Hide typing once stream starts
    if (typing) typing.style.display = "none";

    // 3. Handle the Stream
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let fullAnswer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullAnswer += chunk;

      // LIVE FORMATTING
      // LIVE FORMATTING
      let formattedText = fullAnswer
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(
          /^###?\s+(.*)$/gm,
          "<strong style='font-size: 1.05em; color: var(--accent1); display: block; margin-top: 6px;'>$1</strong>",
        )
        .replace(/^- /gm, "• ")
        // UPDATED: Now hides both IMG and ACTION tags instantly
        .replace(/\[(?:IMG|ACTION):[^\]]*\]?/gi, "");

      botText.innerHTML = formattedText;
      box.scrollTop = box.scrollHeight;
    } // <-- End of the while loop
    // 2. Completely scrub the tags from the final answer for memory and TTS

    // --- NEW: EXTRACT TAG AND SCRUB MEMORY ---
    // 1. Find the tag (Case insensitive, handles weird spacing)
    const tagMatch = fullAnswer.match(/\[IMG:\s*([^\]]+)\]/i);

    // 2. Completely scrub the tag from the final answer so it doesn't go into history or the speaker
    // 2. Completely scrub the tags from the final answer for memory and TTS
    const cleanAnswer = fullAnswer
      .replace(/\[(?:IMG|ACTION):[^\]]*\]?/gi, "")
      .trim();
    // --- RICH MEDIA INJECTION LOGIC ---
    const projectMedia = {
      "brain-tumor": {
        img: "assets/brain.webp",
        title: "Brain Tumor Detection",
        modal: "modal-brain-tumor",
      },
      "heal-bridge": {
        img: "assets/heal.webp",
        title: "Heal-Bridge AI",
        modal: "modal-heal-bridge",
      },
      "groq-chat": {
        img: "assets/chat.webp",
        title: "Groq LLM Chatbot",
        modal: "modal-groq-chat",
      },
      gait: {
        img: "assets/gait.webp",
        title: "Gait Biometrics",
        modal: "modal-gait",
      },
      "food-delivery": {
        img: "assets/food.webp",
        title: "Delivery Time Prediction",
        modal: "modal-food-delivery",
      },
      churn: {
        img: "assets/cust.webp",
        title: "Customer Churn Prediction",
        modal: "modal-churn",
      },
      "student-performance": {
        img: "assets/stu.webp",
        title: "Student Performance Prediction",
        modal: "modal-student-performance",
      },
    };

    if (tagMatch) {
      const projectKey = tagMatch[1].trim().toLowerCase(); // Normalize the string
      const project = projectMedia[projectKey];

      if (project) {
        // Build the SLEEK, COMPACT image card
        const mediaCard = document.createElement("div");
        mediaCard.style.cssText =
          "margin-top: 12px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border); background: rgba(255,255,255,0.03); display: flex; align-items: center; gap: 12px; padding: 8px 12px;";

        mediaCard.innerHTML = `
          <img src="${project.img}" alt="${project.title}" style="width: 120px; height: 40px; object-fit: cover; border-radius: 4px; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.1);">
          <div style="flex: 1; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--text); line-height: 1.2;">${project.title}</span>
            <button class="ai-pill" onclick="document.getElementById('${project.modal}').showModal()" style="margin: 0; padding: 5px 10px; font-size: 0.75rem; cursor: pointer; border: 1px solid var(--accent1); color: var(--accent1); background: transparent; border-radius: 999px; white-space: nowrap; flex-shrink: 0;">View Details</button>
          </div>
        `;
        botText.appendChild(mediaCard);
      }
    }

    // --- NEW: RESUME DROP INJECTION LOGIC ---
    const actionMatch = fullAnswer.match(/\[ACTION:\s*([^\]]+)\]/i);

    if (actionMatch && actionMatch[1].trim().toLowerCase() === "resume") {
      const resumeCard = document.createElement("div");

      // SLEEK, COMPACT STYLING: Tighter padding and gap
      resumeCard.style.cssText =
        "margin-top: 12px; border-radius: 8px; padding: 8px 12px; border: 1px dashed var(--accent1); background: rgba(0, 255, 136, 0.05); display: flex; align-items: center; justify-content: space-between; gap: 10px;";

      resumeCard.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; overflow: hidden;">
          <div style="font-size: 1.4rem; color: var(--accent1); flex-shrink: 0;">
            <i class="fa-solid fa-file-pdf"></i>
          </div>
          <div style="min-width: 0;">
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Ankit_Resume.pdf</div>
            <div style="font-size: 0.7rem; color: rgba(255,255,255,0.6);">PDF • 120 KB</div>
          </div>
        </div>
        
        <a href="frontend/docs/Ankit Sharma Resume.pdf" target="_blank" download style="text-decoration: none; flex-shrink: 0;">
          <button class="ai-pill" style="margin: 0; padding: 5px 10px; font-size: 0.75rem; font-weight: 700; cursor: pointer; border: none; color: #0a0a0a; background: var(--accent1); border-radius: 4px; white-space: nowrap;">
            <i class="fa-solid fa-download"></i> Save
          </button>
        </a>
      `;
      botText.appendChild(resumeCard);
    }
    // --- END RESUME DROP ---

    // --- INJECT THE SPEAKER BUTTON INLINE ---
    const speakerBtn = document.createElement("button");
    speakerBtn.className = "speaker-btn";
    // ... (the rest of your code continues normally below this)
    speakerBtn.title = "Listen to answer";
    speakerBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';

    speakerBtn.onclick = function () {
      // Use the CLEAN answer so it doesn't read the tag out loud!
      speakText(cleanAnswer, this);
    };

    botText.appendChild(speakerBtn);
    box.scrollTop = box.scrollHeight;

    // 4. Update Chat History with the CLEAN answer
    chatHistory.push({ role: "user", content: q });
    chatHistory.push({ role: "assistant", content: cleanAnswer });

    // --- MINIMAL FIX: Sliding Window (Keep only last 6 messages / 3 interactions) ---
    if (chatHistory.length > 6) {
      chatHistory = chatHistory.slice(-6);
    }
    sessionStorage.setItem("ankit_chat_history", JSON.stringify(chatHistory));
  } catch (err) {
    if (typing) typing.style.display = "none";
    botText.innerText = "Error: " + (err.message || "Connection failed.");
    console.error("Streaming Error:", err);
  }
}

function clearAIChat() {
  const box = document.getElementById("ai-chat-box");
  if (!box) return;

  chatHistory = []; // <-- Reset History

  box.innerHTML = `
    <div class="ai-msg bot">
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

  if (type === "bot") {
    let formattedText = text
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Make Headers slightly larger and accent colored
      .replace(
        /^###?\s+(.*)$/gm,
        "<strong style='font-size: 1.1em; color: var(--accent1); display: block; margin-top: 8px;'>$1</strong>",
      )
      // Clean up bullet points to have a proper break
      .replace(/^- (.*)$/gm, "<br>• $1");

    div.innerHTML = formattedText;
  } else {
    div.textContent = text;
  }

  box.appendChild(div);
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

// ========== HERO SEARCH BAR TEXT ROTATION ==========
const placeholderTexts = [
  "Ask me about Ankit's ML projects...",
  "What is Ankit's tech stack?",
  "Tell me about the Brain Tumor detection model...",
  "What did Ankit do at his CodingJr Internship?",
];
let placeholderIndex = 0;
const typingTextEl = document.querySelector(".ai-typing-text");

if (typingTextEl) {
  setInterval(() => {
    // Fade out
    typingTextEl.style.opacity = 0;

    setTimeout(() => {
      // Change text and fade back in after 400ms
      placeholderIndex = (placeholderIndex + 1) % placeholderTexts.length;
      typingTextEl.textContent = placeholderTexts[placeholderIndex];
      typingTextEl.style.opacity = 0.9;
    }, 400);
  }, 3500); // Cycles every 3.5 seconds
}

// --- SPEECH TO TEXT (Continuous Toggle Logic) ---
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  // CRITICAL FIX: Set to true so it doesn't stop when you pause
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-IN";

  let isRecording = false; // Track if the mic is currently on

  // Listen for the mic button click
  document.addEventListener("click", function (event) {
    const micBtnClicked = event.target.closest("#mic-btn");

    if (micBtnClicked) {
      if (!isRecording) {
        recognition.start(); // Turn ON if it's off
      } else {
        recognition.stop(); // Turn OFF if it's already on
      }
    }
  });

  recognition.onstart = () => {
    isRecording = true;
    const micBtn = document.getElementById("mic-btn");
    const aiInput = document.getElementById("ai-input");

    if (micBtn) micBtn.classList.add("recording");
    if (aiInput) aiInput.placeholder = "Listening... (Click mic again to stop)";
  };

  recognition.onresult = (event) => {
    const aiInput = document.getElementById("ai-input");
    if (!aiInput) return;

    // Because it is continuous, we string together all the phrases you say
    let finalTranscript = "";
    for (let i = 0; i < event.results.length; i++) {
      finalTranscript += event.results[i][0].transcript + " ";
    }

    aiInput.value = finalTranscript.trim();
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    isRecording = false;
    const aiInput = document.getElementById("ai-input");
    const micBtn = document.getElementById("mic-btn");

    if (micBtn) micBtn.classList.remove("recording");
    if (aiInput) aiInput.placeholder = "Error listening. Try typing.";
  };

  recognition.onend = () => {
    isRecording = false;
    const micBtn = document.getElementById("mic-btn");
    const aiInput = document.getElementById("ai-input");

    if (micBtn) micBtn.classList.remove("recording");
    if (aiInput && aiInput.placeholder.includes("Listening")) {
      aiInput.placeholder = "Ask about my projects...";
    }
  };
} else {
  console.warn("Speech Recognition API is not supported in this browser.");
}

// --- TEXT TO SPEECH (Speaker Logic) ---
let currentUtterance = null;

// This forces the browser to load voices in the background so they are ready
window.speechSynthesis.getVoices();

function speakText(text, buttonElement) {
  // If playing, stop it
  if (buttonElement.classList.contains("playing")) {
    window.speechSynthesis.cancel();
    buttonElement.classList.remove("playing");
    buttonElement.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    return;
  }

  // 1. Cancel anything else
  window.speechSynthesis.cancel();

  // 2. Reset all speaker icons
  document.querySelectorAll(".speaker-btn").forEach((btn) => {
    btn.classList.remove("playing");
    btn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  });

  // 3. Clean text
  let cleanText = text.replace(/[*#_]/g, "").replace(/•/g, ". ");

  // 4. Create speech
  currentUtterance = new SpeechSynthesisUtterance(cleanText);
  currentUtterance.rate = 1.0;

  // 5. Find voice
  const voices = window.speechSynthesis.getVoices();
  const bestVoice = voices.find(
    (v) =>
      v.lang.includes("en-IN") ||
      v.name.includes("India") ||
      v.name.includes("UK"),
  );
  if (bestVoice) {
    currentUtterance.voice = bestVoice;
  }

  // 6. UI Update: Change to Stop Icon
  buttonElement.classList.add("playing");
  buttonElement.innerHTML = '<i class="fa-solid fa-circle-stop"></i>';

  // 7. On end, reset to Volume icon
  currentUtterance.onend = () => {
    buttonElement.classList.remove("playing");
    buttonElement.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  };

  window.speechSynthesis.speak(currentUtterance);
}
