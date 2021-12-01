const slideContainer = document.querySelector(".carousel-cont");
const slide = document.querySelector(".slides");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const interval = 3000;

let slides = document.querySelectorAll(".slide");
let index = 1;
let slideId;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

document.getElementById("theme").addEventListener("click", function () {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    document.querySelectorAll("i")[0].className = "fas fa-moon";
  } else {
    document.querySelectorAll("i")[0].className = "far fa-sun";
  }
});

$(".menu-toggle").click(function () {
  $(".menu-toggle").toggleClass("active");
  $(".navbar-collapse").toggleClass("active-toggle");
  if ($("#menu-toggler").hasClass("fa-bars")) {
    $("#menu-toggler").removeClass("fas fa-bars").addClass("fas fa-times");
  } else {
    $("#menu-toggler").removeClass("fas fa-times").addClass("fas fa-bars");
  }
});

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

console.log(slides);

const startSlide = () => {
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

const getSlides = () => document.querySelectorAll(".slide");

slide.addEventListener("transitionend", () => {
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    slide.style.transition = "none";
    index = 1;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === lastClone.id) {
    slide.style.transition = "none";
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  slide.style.transition = ".7s ease-out";
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

const moveToPreviousSlide = () => {
  if (index <= 0) return;
  index--;
  slide.style.transition = ".7s ease-out";
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

slideContainer.addEventListener("mouseenter", () => {
  clearInterval(slideId);
});

slideContainer.addEventListener("mouseleave", startSlide);
nextBtn.addEventListener("click", moveToNextSlide);
prevBtn.addEventListener("click", moveToPreviousSlide);

document.body.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    moveToPreviousSlide();
  } else if (event.key === "ArrowRight") {
    moveToNextSlide();
  }
});
startSlide();
