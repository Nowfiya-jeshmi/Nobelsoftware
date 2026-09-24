const cursor = document.querySelector(".cursor-glow");

if (cursor) {
  window.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}


// =========================================================
// MOBILE MENU
// =========================================================

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menu) {
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", open);
  });
}

document.querySelectorAll(".nav a").forEach(a => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});


// =========================================================
// SCROLL REVEAL ANIMATION
// =========================================================

const observer = new IntersectionObserver((entries, obs) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("visible");

      obs.unobserve(entry.target);

    }

  });

}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});


// =========================================================
// NUMBER COUNTER ANIMATION
// =========================================================

const counters = document.querySelectorAll("[data-count]");

const countObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (!entry.isIntersecting) return;

    const el = entry.target;

    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";

    const duration = 1500;
    const start = performance.now();

    const isDecimal = String(el.dataset.count).includes(".");

    function update(now) {

      const progress = Math.min(
        (now - start) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      const value = target * eased;

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


// =========================================================
// SMOOTH SCROLL
// =========================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", e => {

    const target = document.querySelector(
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

    showCategory(filter.dataset.category);

  });

});


// Show Frontend when page loads

showCategory("frontend");


// =========================================================
// DARK / LIGHT THEME TOGGLE
// =========================================================

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
// 🤖 NOBEL AI WEBSITE ROBOT
// =========================================================
// Website-aware assistant
// - Robot eye tracking
// - Current section detection
// - Chat window
// - Quick questions
// - Website knowledge
// - Mobile compatible
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
    document.getElementById("aiCurrentSection");

  const contextEl =
    document.getElementById("aiContextText");

  const eyes =
    document.querySelectorAll(".ai-eye i");


  // Stop if robot HTML is not present

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
  // ROBOT EYE / FACE TRACKING
  // =========================================================

  const trackRobotEyes = (x, y) => {

    const rect =
      robotButton.getBoundingClientRect();

    const centerX =
      rect.left + rect.width / 2;

    const centerY =
      rect.top + rect.height / 2;


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
        `translate(${dx * 4}px, ${dy * 3}px)`;

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
  // CURRENT WEBSITE SECTION AWARENESS
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


  const sections =
    [
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
  // NOBEL SOFTWARE WEBSITE KNOWLEDGE
  // =========================================================

  const siteKnowledge = {

    services:
      "Nobel Software provides Full Stack Web Development, DevSecOps, Cyber Security, Cloud Engineering, Network Engineering, Data Migration, On-Premises Engineering, and Managed Services & Consulting.",


    technologies:
      "The website highlights technologies and platforms across modern software, cloud and DevOps. Examples shown include React, Next.js, Node.js, GraphQL, Kubernetes, Terraform, GitOps, AWS, Azure, GCP, FinOps, Cisco, SD-WAN, VPN, VMware, Hyper-V, SAN/NAS, ETL and SQL/NoSQL.",


    industries:
      "Nobel Software presents technology solutions for multiple business and enterprise use cases. Scroll through the Industries section to see the specific industries listed on this website.",


    process:
      "The Process section explains how Nobel Software approaches project delivery from discovery and planning through engineering, security, testing, deployment and ongoing support, based on the content presented on this page.",


    solutions:
      "Nobel Software describes its differentiator as combining technology, security and engineering expertise to build reliable digital solutions. The page also highlights an experienced technology team and agile, efficient delivery.",


    contact:
      "You can reach Nobel Software through the Contact section of this website. I can take you there now if you click the Contact button in the navigation, or I can scroll there for you.",


    about:
      "Nobel Software combines technology, security and engineering expertise to build reliable digital solutions for businesses. The site emphasizes secure, scalable engineering and practical technology delivery.",


    home:
      "Nobel Software describes itself as delivering secure, scalable technology solutions across full-stack applications, cloud infrastructure, DevSecOps and cyber security."

  };


  // =========================================================
  // TEXT NORMALIZATION
  // =========================================================

  const normalize = text => {

    return text
      .toLowerCase()
      .replace(
        /[^a-z0-9\s]/g,
        " "
      )
      .replace(
        /\s+/g,
        " "
      )
      .trim();

  };


  // =========================================================
  // AI RESPONSE ENGINE
  // =========================================================

  const getAnswer = question => {

    const q =
      normalize(question);


    if (!q) {

      return "Ask me anything about Nobel Software, such as services, technologies, industries, process or contact.";

    }


    // Services

    if (
      /(service|services|what do you do|offer|solutions do you provide)/
        .test(q)
    ) {

      return siteKnowledge.services;

    }


    // Technologies

    if (
      /(technology|technologies|tech stack|stack|tools|framework|frameworks|cloud|devops)/
        .test(q)
    ) {

      return siteKnowledge.technologies;

    }


    // Industries

    if (
      /(industry|industries|sector|sectors)/
        .test(q)
    ) {

      return siteKnowledge.industries;

    }


    // Process

    if (
      /(process|how do you work|workflow|delivery|deliver)/
        .test(q)
    ) {

      return siteKnowledge.process;

    }


    // About

    if (
      /(about|company|who are you|nobel software)/
        .test(q)
    ) {

      return siteKnowledge.about;

    }


    // Contact

    if (
      /(contact|email|phone|reach|talk|connect|project|quote)/
        .test(q)
    ) {

      return siteKnowledge.contact;

    }


    // Cyber Security

    if (
      /(security|cyber|devsecops|zero trust|penetration|threat)/
        .test(q)
    ) {

      return "Cyber Security and DevSecOps are core services on this website. The services section mentions zero-trust architecture, penetration testing, threat intelligence, incident response, compliance, CI/CD security, scanning and infrastructure-as-code.";

    }


    // Full Stack

    if (
      /(full stack|web development|frontend|backend|api|microservices|react|next js|node js|graphql)/
        .test(q)
    ) {

      return "Full Stack Web Development is one of the listed services, covering high-performance frontends, backend APIs, microservices and real-time applications. The service card lists React, Next.js, Node.js and GraphQL.";

    }


    // Cloud

    if (
      /(aws|azure|gcp|cloud)/
        .test(q)
    ) {

      return "Cloud Engineering is listed as a service, including cloud strategy, migration, cost optimization and managed services across major platforms. AWS, Azure and GCP are shown on the service card.";

    }


    // Greetings

    if (
      /(hello|hi|hey|good morning|good evening)/
        .test(q)
    ) {

      return "Hi! 👋 I’m Nobel AI. I can help you explore this website and find the right section or information.";

    }


    // Thanks

    if (
      /(thank|thanks)/
        .test(q)
    ) {

      return "You’re welcome! 🤖 If you want, ask me about services, technologies, industries, process or contact.";

    }


    // Default

    return `I’m currently viewing the ${
      sectionNames[currentSection] ||
      "Home"
    } section. I can answer questions about the information on this website, especially services, solutions, process, technologies, industries and contact. Try asking “What services do you provide?”`;

  };


  // =========================================================
  // ADD CHAT MESSAGE
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


  // =========================================================
  // ROBOT BUTTON
  // =========================================================

  robotButton.addEventListener(
    "click",
    () => {

      chat.classList.contains(
        "open"
      )
        ? closeChat()
        : openChat();

    }
  );


  // Close button

  closeButton?.addEventListener(
    "click",
    closeChat
  );


  // ESC key

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
  // HANDLE USER QUESTION
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


    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          450
        )
    );


    removeTyping();


    addMessage(
      getAnswer(question),
      "bot"
    );

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

    currentSection: () =>
      currentSection,

    ask: handleQuestion

  };

})();
