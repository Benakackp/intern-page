// ====== Preloader ======
window.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("js-preloader");
  if (preloader) {
    preloader.classList.add("loaded");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 100);
  }
});

// ====== Sticky Header ======
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header-area");
  if (window.scrollY > 100) {
    header.classList.add("background-header");
  } else {
    header.classList.remove("background-header");
  }
});

// ====== AOS Initialization ======
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-in-out",
  });
});

// ====== Smooth Scroll for Internal Links (Fixed) ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Ignore empty or invalid anchors (like "#")
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});


// ======== Hamburger start =========
  document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });

    // Optional: close menu when a link is clicked (on mobile)
    const links = menu.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        if (menu.classList.contains("active")) {
          menu.classList.remove("active");
        }
      });
    });
  });
// ========= Hamburger end ============


// ======== Positions Rotation start =========
document.addEventListener("DOMContentLoaded", function () {
  const leftImg = document.getElementById("left-img");
  const leftTitle = document.getElementById("left-title");
  const leftDesc = document.getElementById("left-desc");
  const leftDate = document.getElementById("left-date");
  const leftContent = document.getElementById("left-content");
  const rightList = document.querySelector(".right-list ul");

  // Try to get the left-image container (fallbacks included)
  const leftImageSection = document.querySelector(".left-image") ||
                           document.getElementById("left-img") ||
                           leftContent;

  const jobs = [
    {
      title: "Web Developer",
      desc: [
        "Responsible for building, testing, and maintaining dynamic, responsive websites and web applications."
      ],
      img: "assets/images/services/Web.jpg",
      date: "01 Nov 2025",
    },
    {
      title: "AI Developer",
      desc: [
        "Develops and deploys AI models and machine learning solutions to solve real-world business problems."
      ],
      img: "assets/images/services/AI.jpg",
      date: "02 Nov 2025",
    },
    {
      title: "Digital Marketing",
      desc: [
        "Manages digital campaigns to increase brand awareness, traffic, and customer engagement."
      ],
      img: "assets/images/services/Marketing.jpg",
      date: "03 Nov 2025",
    },
    {
      title: "Business Analyst",
      desc: [
        "Identifies business needs, analyzes data, and provides insights to support strategic decision-making."
      ],
      img: "assets/images/services/BA.jpg",
      date: "04 Nov 2025",
    },
    {
      title: "UX Designer",
      desc: [
        "Creates intuitive and user-centered interfaces that enhance usability and overall user experience."
      ],
      img: "assets/images/services/UX.jpg",
      date: "05 Nov 2025",
    }
  ];

  let index = 0;
  let interval = null;
  let showAll = false;

  // RENDER RIGHT LIST
  function renderJobs() {
    rightList.innerHTML = "";
    const visibleJobs = showAll ? jobs : jobs.slice(0, 3);

    visibleJobs.forEach((job) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="left-content align-self-center">
          <h4>${job.title}</h4>
          <p>${job.desc[0]}</p>
        </div>
        <div class="right-image">
          <img src="${job.img}">
        </div>
      `;
      li.addEventListener("click", () => {
        // show clicked job immediately and pause rotation briefly
        stopRotation();
        index = jobs.indexOf(job);
        updateLeft(job);
        // restart rotation after a short delay so user sees the clicked card
        setTimeout(startRotation, 1500);
      });
      rightList.appendChild(li);
    });

    // Add View More / Less button
    const viewMoreBtn = document.createElement("button");
    viewMoreBtn.textContent = showAll ? "View Less" : "View More";
    viewMoreBtn.className = "btn btn-primary";
    viewMoreBtn.style.marginTop = "10px";
    viewMoreBtn.addEventListener("click", () => {
      showAll = !showAll;
      renderJobs();
    });

    // ensure the button sits outside the <ul> list items visually by appending
    // as the last child of the ul (your CSS will keep it looking correct)
    rightList.appendChild(viewMoreBtn);
  }

  // UPDATE LEFT SECTION
  function updateLeft(job) {
    leftContent.style.transition = "all 0.45s ease";
    leftContent.style.opacity = 0;
    leftContent.style.transform = "translateY(12px)";

    setTimeout(() => {
      leftImg.src = job.img;
      leftTitle.textContent = job.title;
      leftDate.textContent = job.date;
      // replace paragraph with bullet points
      leftDesc.innerHTML = `
        <ul style="margin-top:10px; padding-left:20px;">
          ${job.desc.map(d => `<li>${d}</li>`).join("")}
        </ul>
      `;

      leftContent.style.opacity = 1;
      leftContent.style.transform = "translateY(0)";
    }, 300);
  }
  

  // ROTATION FUNCTIONS 
  function rotateCard() {
    index = (index + 1) % jobs.length;
    updateLeft(jobs[index]);
  }

  function startRotation() {
    // prevent duplicate intervals
    if (interval) return;
    interval = setInterval(rotateCard, 3000);
    // console.log("rotation started");
  }

  function stopRotation() {
    if (interval) {
      clearInterval(interval);
      interval = null;
      // console.log("rotation stopped");
    }
  }

  // INITIAL SETUP
  renderJobs();
  updateLeft(jobs[index]);
  startRotation();

  // Robust Hover / Pointer Events to Pause Rotation
  // Attach to the container and also to image & content as fallbacks
  const hoverTargets = new Set();
  if (leftImageSection) hoverTargets.add(leftImageSection);
  if (leftImg) hoverTargets.add(leftImg);
  if (leftContent) hoverTargets.add(leftContent);

  hoverTargets.forEach((el) => {
    // pointerenter/pointerleave are more consistent with nested elements than mouseenter sometimes
    el.addEventListener("pointerenter", stopRotation, { passive: true });
    el.addEventListener("pointerleave", startRotation, { passive: true });
  });

  // Extra fallback: if nothing above is found, listen for mousemove over document and pause when cursor is over left image bounds
  if (!leftImageSection) {
    document.addEventListener("mousemove", function (e) {
      const imgRect = leftImg.getBoundingClientRect();
      const inside = e.clientX >= imgRect.left &&
                     e.clientX <= imgRect.right &&
                     e.clientY >= imgRect.top &&
                     e.clientY <= imgRect.bottom;
      if (inside) stopRotation();
      else startRotation();
    });
  }
});

//=========== Positions rotation end =============


// ========== SERVICES START ================

document.addEventListener("DOMContentLoaded", function () {
  const skillBars = Array.from(document.querySelectorAll(".skill-bar"));

  // animate single bar: fill width and count up number
  function animateBar(bar) {
    const fill = bar.querySelector(".skill-fill");
    const percentElem = bar.querySelector(".skill-percent");
    const target = Math.min(100, parseInt(bar.getAttribute("data-percent"), 10) || 0);

    // set width (CSS transition will animate)
    requestAnimationFrame(() => {
      fill.style.width = target + "%";
    });

    // count up animation
    let start = null;
    const duration = 1400; // ms
    const initial = 0;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      const current = Math.round(initial + (target - initial) * progress);
      percentElem.textContent = current + "%";
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        percentElem.textContent = target + "%";
      }
    }
    window.requestAnimationFrame(step);

    // mark as done
    bar.dataset.animated = "true";
  }

  // IntersectionObserver callback
  function onIntersect(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        if (bar.dataset.animated !== "true") {
          animateBar(bar);
        }
      }
    });
  }

  // Use IntersectionObserver when available
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.15
    });
    skillBars.forEach(bar => observer.observe(bar));
  } else {
    // Fallback: scroll event check once
    function checkOnScroll() {
      skillBars.forEach(bar => {
        if (bar.dataset.animated === "true") return;
        const rect = bar.getBoundingClientRect();
        if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 80) {
          animateBar(bar);
        }
      });
    }
    window.addEventListener("scroll", checkOnScroll, { passive: true });
    checkOnScroll();
  }
});

// =============== SERVICES END ===============


// ========== PERKS AND BENIFITS START ================

document.querySelectorAll(".hex").forEach((hex) => {
  hex.addEventListener("mouseenter", () => {
    hex.style.boxShadow = "0 0 20px rgba(255,255,255,0.3)";
  });
  hex.addEventListener("mouseleave", () => {
    hex.style.boxShadow = "none";
  });
});


// ========== PERKS AND BENIFITS END ================

