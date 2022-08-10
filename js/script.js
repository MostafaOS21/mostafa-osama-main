function changingText(i, j) {
  let words = ["Art", "Front-end", "web", "Back-end"];
  let box = document.querySelector(".changing-text span");
  if (i === words.length) changingText(0, 0);
  let timer1 = setInterval(() => {
    if (words[i] !== undefined) {
      if (box.textContent.length < words[i].length) {
        box.textContent += words[i][j++];
      } else {
        clearInterval(timer1);
        setTimeout(() => {
          let k = box.textContent.length - 1;
          let timer2 = setInterval(() => {
            if (k === -1) {
              clearInterval(timer2);
              changingText(++i, 0);
            }
            box.textContent = box.textContent.slice(0, k--);
          }, 350);
        }, 1000);
      }
    }
  }, 350);
}

changingText(0, 0);

// Loading Screen

function loadingScreen() {
  let loadScr = document.querySelector(".loading-screen");
  setTimeout(() => {
    loadScr.style = "opacity: 0;";
    setTimeout(() => {
      loadScr.remove();
      document.body.classList.remove("loading");
    }, 300);
  }, 3000);
}

loadingScreen();

// Navbar Effect + Show On Mobile
function navBar() {
  let navBar = document.querySelector("nav");

  window.onscroll = (e) => {
    if (window.innerWidth > 830) {
      if (this.scrollY >= 300) {
        navBar.classList.add("navigate");
      } else {
        navBar.classList.remove("navigate");
      }
    } else {
      if (navBar.classList.contains("navigate")) {
        navBar.classList.remove("navigate");
      }
    }
  };

  // Show Navbar On Mobile
  let showNav = document.querySelector("i.show-menu");
  let hideNav = document.querySelector("i.hide-menu");
  showNav.addEventListener("click", () => {
    navBar.classList.add("active");
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  });
  hideNav.addEventListener("click", () => {
    navBar.classList.remove("active");
    document.body.style = "";
  });

  // Navbar Clicking
  let sectionsNavLinks = document.querySelectorAll("ul.navigate > li > a");
  sectionsNavLinks.forEach((a) => {
    a.addEventListener("click", () => {
      hideNav.click();
    });
  });
}

navBar();

// Generating Blur Balls
function blurBalls() {
  let tmp = 20;
  let bottoms = [`0%`, "10%", `20%`, `30%`, `40%`];
  let sizes = [200, 250, 300, 350, 450, 500, 600];
  for (let i = 0; i <= 10; i++) {
    let div = document.createElement("div");
    div.classList.add("blur-balls");

    div.style.animationDuration = `${tmp}s`;
    tmp += 10;

    let tmp1 = parseInt(Math.random() * bottoms.length);
    div.style.bottom = `${bottoms[tmp1]}`;

    let tmp2 = parseInt(Math.random() * sizes.length);
    div.style.width = `${sizes[tmp2]}px`;
    div.style.height = `${sizes[tmp2]}px`;

    let tmp3 = parseInt(Math.random() * 20);
    div.style.filter = `blur(${tmp3}px)`;

    document.body.appendChild(div);
  }
}

blurBalls();

// Animations Load

function animate() {
  let landingText = document.querySelector(".landpage > .text");
  let landingImg = document.querySelector(".my-image");

  window.onload = function () {
    landingText.classList.add("opacity-to-up");
    landingImg.classList.add("opacity-to-up");
  };
}

animate();

// On Screen Animation

window.addEventListener("scroll", animateOnScroll);

function animateOnScroll() {
  let sections = document.querySelectorAll("section");
  sections.forEach((sec) => {
    if (sec.classList.contains("on-screen")) sec.classList.remove("on-screen");
  });
  // About Me
  if (window.scrollY >= 590 && window.scrollY < 1137) {
    let paragraph = document.querySelector(".about-me p");
    paragraph.classList.add("opacity-scale");
    sections[1].classList.add("on-screen");
  } else {
    let paragraph = document.querySelector(".about-me p");
    if (paragraph.classList.contains("opacity-scale"));
    paragraph.classList.remove("opacity-scale");
  }

  // My Work
  if (window.scrollY >= 1137 && window.scrollY < 2245.6) {
    sections[2].classList.add("on-screen");
  } else {
    sections[2].classList.remove("on-screen");
  }

  // My Skills
  if (window.scrollY >= 2245.6) {
    sections[3].classList.add("on-screen");
  }
}

animateOnScroll();

// Work Filter
function workFilter() {
  let filterLis = document.querySelectorAll("section.my-work ul.filter li");
  let allProjects = document.querySelectorAll("section.my-work .projects .all");

  filterLis.forEach((li) => {
    li.addEventListener("click", (e) => {
      if (!e.target.classList.contains("active")) {
        // Add active class to li
        filterLis.forEach((li) => li.classList.remove("active"));
        e.target.classList.add("active");
        // Filtering Projects
        allProjects.forEach((pro) => {
          pro.style.opacity = `0`;
          setTimeout(() => {
            pro.style.display = `none`;
          }, 300);
        });
        setTimeout(() => {
          allProjects.forEach((pro) => {
            if (pro.classList.contains(e.target.classList[0])) {
              setTimeout(() => {
                pro.style.display = ``;
                setTimeout(() => {
                  pro.style = "";
                }, 50);
              }, 250);
            }
          });
        }, 400);
      }
    });
  });
}

workFilter();

fetch(" https://mostafaos21.github.io/my-skills-api/skills.json")
  .then((res) => res.json())
  .then((result) => {
    for (let val of result) appendChild(val);
  })
  .catch((issue) => console.log(issue));

function appendChild(arr) {
  let skillsConatiner = document.querySelector(".skills-container");
  // Creating Div Of The Skill
  let div = document.createElement("div");
  div.classList.add("skill");
  div.setAttribute("data-present", arr.prcentage);
  // Skill Div Styling conic-gradient
  div.style = `background: conic-gradient(${arr.color} ${
    (arr.prcentage / 100) * 360
  }deg, rgb(183, 183, 183) 0deg);`;
  // Creating Logo img
  let imgLogo = document.createElement("img");
  imgLogo.src = arr.img_src;
  // Add Width Size
  imgLogo.style = `width: ${arr.size}px;`;
  // Appending Img => Skill Div
  div.appendChild(imgLogo);
  // Appending div => Skills Conatiner
  skillsConatiner.appendChild(div);
}
