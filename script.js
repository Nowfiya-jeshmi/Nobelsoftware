const cursor = document.querySelector(".cursor-glow");

if (cursor) {
  window.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menu) {
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", open);
  });
}

document.querySelectorAll(".nav a").forEach(a =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el =>
  observer.observe(el)
);


// ==========================================
// NUMBER COUNTER ANIMATION
// ==========================================

const counters = document.querySelectorAll("[data-count]");

const countObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (!entry.isIntersecting) return;

    const el = entry.target;

    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";

    const duration = 1500;
    const start = performance.now();

    const isDecimal =
      String(el.dataset.count).includes(".");

    function update(now) {

      const progress = Math.min(
        (now - start) / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      const value =
        target * eased;

      if (isDecimal) {

        el.textContent =
          value.toFixed(1) + suffix;

      } else {

        el.textContent =
          Math.floor(value) + suffix;

      }

      if (progress < 1) {

        requestAnimationFrame(update);

      } else {

        el.textContent =
          isDecimal
            ? target.toFixed(1) + suffix
            : target + suffix;

      }

    }

    requestAnimationFrame(update);

    countObserver.unobserve(el);

  });

}, {
  threshold: 0.6
});


counters.forEach(el => {
  countObserver.observe(el);
});


// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", e => {

    const target =
      document.querySelector(
        link.getAttribute("href")
      );

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


// =========================================================
// TECHNOLOGY STACK FILTER
// =========================================================

const techFilters =
  document.querySelectorAll(".tech-filter");

const technologyCards =
  document.querySelectorAll(".technology-card");


function showCategory(category) {

  technologyCards.forEach(card => {

    if (card.dataset.category === category) {

      card.style.display = "flex";

      card.style.animation = "none";

      card.offsetHeight;

      card.style.animation =
        "techCardIn .35s ease both";

    } else {

      card.style.display = "none";

    }

  });

}


techFilters.forEach(filter => {

  filter.addEventListener("click", () => {

    techFilters.forEach(button => {
      button.classList.remove("active");
    });

    filter.classList.add("active");

    showCategory(
      filter.dataset.category
    );

  });

});


showCategory("frontend");


// ==========================================
// DARK / LIGHT THEME TOGGLE
// ==========================================

const themeToggle =
  document.getElementById("themeToggle");

const themeIcon =
  document.querySelector(".theme-icon");


if (themeToggle && themeIcon) {

  const savedTheme =
    localStorage.getItem("theme");


  if (savedTheme === "light") {

    document.body.classList.add("light");

    themeIcon.textContent = "☾";

  } else {

    document.body.classList.remove("light");

    themeIcon.textContent = "☼";

  }


  themeToggle.addEventListener("click", () => {

    const isLight =
      document.body.classList.toggle("light");


    themeIcon.textContent =
      isLight ? "☾" : "☼";


    localStorage.setItem(
      "theme",
      isLight ? "light" : "dark"
    );

  });

}


// =========================================================
// 🤖 NOBEL AI REAL AI ASSISTANT
// =========================================================

(() => {

  const robot =
    document.getElementById("nobelAI");

  const robotButton =
    document.getElementById("aiRobotButton");

  const chat =
    document.getElementById("aiChat");

  const closeButton =
    document.getElementById("aiClose");

  const form =
    document.getElementById("aiChatForm");

  const input =
    document.getElementById("aiInput");

  const messages =
    document.getElementById("aiMessages");

  const currentSectionEl =
    document.getElementById(
      "aiCurrentSection"
    );

  const contextEl =
    document.getElementById(
      "aiContextText"
    );

  const eyes =
    document.querySelectorAll(
      ".ai-eye i"
    );


  // ---------------------------------------------------------
  // Check robot elements
  // ---------------------------------------------------------

  if (
    !robot ||
    !robotButton ||
    !chat ||
    !form ||
    !input ||
    !messages
  ) {
    return;
  }


  // =========================================================
  // ROBOT EYE TRACKING
  // =========================================================

  const trackRobotEyes = (x, y) => {

    const rect =
      robotButton.getBoundingClientRect();

    const centerX =
      rect.left +
      rect.width / 2;

    const centerY =
      rect.top +
      rect.height / 2;


    const dx =
      Math.max(
        -1,
        Math.min(
          1,
          (x - centerX) / 180
        )
      );


    const dy =
      Math.max(
        -1,
        Math.min(
          1,
          (y - centerY) / 180
        )
      );


    eyes.forEach(eye => {

      eye.style.transform =
        `translate(
          ${dx * 4}px,
          ${dy * 3}px
        )`;

    });

  };


  window.addEventListener(
    "mousemove",
    e => {

      trackRobotEyes(
        e.clientX,
        e.clientY
      );

    },
    {
      passive: true
    }
  );


  // =========================================================
  // CURRENT SECTION DETECTION
  // =========================================================

  const sectionNames = {

    home: "Home",

    services: "Services",

    about: "Solutions",

    process: "Process",

    technologies: "Technologies",

    industries: "Industries",

    contact: "Contact"

  };


  const sections = [
    ...document.querySelectorAll(
      "main section[id]"
    )
  ];


  let currentSection = "home";


  const updateSectionContext = id => {

    currentSection =
      id || "home";


    const label =
      sectionNames[currentSection] ||
      currentSection.replace(
        /-/g,
        " "
      );


    if (currentSectionEl) {

      currentSectionEl.textContent =
        label;

    }


    if (contextEl) {

      contextEl.textContent =
        label;

    }

  };


  if (sections.length) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          const visible =
            entries
              .filter(
                entry =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              )[0];


          if (visible) {

            updateSectionContext(
              visible.target.id
            );

          }

        },
        {
          threshold: [
            0.15,
            0.35,
            0.55,
            0.75
          ]
        }
      );


    sections.forEach(section => {

      sectionObserver.observe(
        section
      );

    });

  }


  // =========================================================
  // ADD MESSAGE
  // =========================================================

  const addMessage = (
    text,
    type = "bot"
  ) => {

    const wrap =
      document.createElement("div");


    wrap.className =
      `ai-message ai-message-${type}`;


    if (type === "bot") {

      const avatar =
        document.createElement("span");

      avatar.className =
        "ai-avatar";

      avatar.textContent =
        "N";

      wrap.appendChild(avatar);

    }


    const content =
      document.createElement("div");


    const p =
      document.createElement("p");


    p.textContent =
      text;


    content.appendChild(p);

    wrap.appendChild(content);

    messages.appendChild(wrap);


    messages.scrollTop =
      messages.scrollHeight;

  };


  // =========================================================
  // TYPING INDICATOR
  // =========================================================

  const showTyping = () => {

    const wrap =
      document.createElement("div");


    wrap.className =
      "ai-message ai-message-bot";


    wrap.id =
      "aiTypingMessage";


    const avatar =
      document.createElement("span");


    avatar.className =
      "ai-avatar";


    avatar.textContent =
      "N";


    const bubble =
      document.createElement("p");


    bubble.className =
      "ai-typing";


    bubble.innerHTML =
      "<i></i><i></i><i></i>";


    wrap.append(
      avatar,
      bubble
    );


    messages.appendChild(
      wrap
    );


    messages.scrollTop =
      messages.scrollHeight;

  };


  const removeTyping = () => {

    document
      .getElementById(
        "aiTypingMessage"
      )
      ?.remove();

  };


  // =========================================================
  // OPEN CHAT
  // =========================================================

  const openChat = () => {

    chat.classList.add(
      "open"
    );


    chat.setAttribute(
      "aria-hidden",
      "false"
    );


    robotButton.setAttribute(
      "aria-expanded",
      "true"
    );


    setTimeout(
      () => input.focus(),
      120
    );

  };


  // =========================================================
  // CLOSE CHAT
  // =========================================================

  const closeChat = () => {

    chat.classList.remove(
      "open"
    );


    chat.setAttribute(
      "aria-hidden",
      "true"
    );


    robotButton.setAttribute(
      "aria-expanded",
      "false"
    );

  };


  robotButton.addEventListener(
    "click",
    () => {

      if (
        chat.classList.contains(
          "open"
        )
      ) {

        closeChat();

      } else {

        openChat();

      }

    }
  );


  closeButton?.addEventListener(
    "click",
    closeChat
  );


  document.addEventListener(
    "keydown",
    e => {

      if (
        e.key === "Escape" &&
        chat.classList.contains(
          "open"
        )
      ) {

        closeChat();

      }

    }
  );


  // =========================================================
  // QUICK QUESTIONS
  // =========================================================

  document
    .querySelectorAll(
      ".ai-quick-actions button"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const question =
            button.dataset.question ||
            button.textContent;


          handleQuestion(
            question
          );

        }
      );

    });


  // =========================================================
  // PAGE CONTEXT
  // =========================================================

  function getPageContext() {

    const activeSection =
      document.getElementById(
        currentSection
      );


    if (activeSection) {

      return activeSection
        .innerText
        .trim()
        .slice(0, 12000);

    }


    return document.body.innerText
      .trim()
      .slice(0, 12000);

  }


  // =========================================================
  // REAL AI REQUEST
  // =========================================================

  async function handleQuestion(
    question
  ) {

    if (!question) return;


    openChat();


    addMessage(
      question,
      "user"
    );


    showTyping();


    try {

      const response =
        await fetch(
          "/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              message:
                question,

              section:
                sectionNames[
                  currentSection
                ] ||
                currentSection,

              pageContext:
                getPageContext()

            })

          }
        );


      const data =
        await response.json();


      removeTyping();


      if (!response.ok) {

        throw new Error(
          data.error ||
          "AI request failed"
        );

      }


      addMessage(
        data.reply ||
        "I couldn't generate a response right now.",
        "bot"
      );


    } catch (error) {

      console.error(
        "Nobel AI error:",
        error
      );


      removeTyping();


      addMessage(
        "I’m having trouble connecting to my AI service right now. Please try again in a moment.",
        "bot"
      );

    }

  }


  // =========================================================
  // CHAT FORM
  // =========================================================

  form.addEventListener(
    "submit",
    e => {

      e.preventDefault();


      const question =
        input.value.trim();


      if (!question) return;


      input.value = "";


      handleQuestion(
        question
      );

    }
  );


  // =========================================================
  // GLOBAL NOBEL AI API
  // =========================================================

  window.nobelAI = {

    open: openChat,

    close: closeChat,

    currentSection:
      () => currentSection,

    ask:
      handleQuestion

  };

})();
