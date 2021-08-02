import axios from "axios";
import HeroesList from "./heroes-list.handlebars";
import Slider from "../slider.handlebars";
// import { changeContent } from "../slider.js";
const url = "https://api.opendota.com";
const div = document.createElement("div");
// div.classList.add("list");

(async () => {
  const heroes = await axios.get(`${url}/api/heroes`);
  const heroesDetails = await axios.get(`${url}/api/heroStats`);

  div.innerHTML = HeroesList({
    heroes: heroes.data.map((_hero, index) => ({
      nameHero: _hero.localized_name,
      srcImg: `${url}${heroesDetails.data[index].img}`,
    })),
  });

  // const content = document.getElementById("content");

  // const list = document.createElement("ul");
  // heroes.data.forEach((_hero, index) => {
  //   const hero = Heroes({
  //     nameHero: _hero.localized_name,
  //     srcImg: `${url}${heroesDetails.data[index].img}`,
  //   });
  //   const li = document.createElement("li");
  //   li.innerHTML = hero;
  //   list.append(li);
  // });
  const grid_inp = document.querySelector(".inp");
  grid_inp.classList.add("hide");

  document.querySelector("#btn_slider").addEventListener("click", () => {
    grid_inp.classList.add("hide");
    content.insertAdjacentHTML("afterbegin", Slider());
    document.querySelector("#btn_slider").disabled = true;

    content.append(div);
    div.classList.add("hide");

    let hero = Array.from(document.getElementsByClassName("hero"));
    console.log(hero);

    let viewport = document.getElementById("viewport").offsetWidth;

    let btnNext = document.getElementById("next");

    let btnPrev = document.getElementById("prev");

    let slider = document.querySelector("div.slider");

    let viewSlide = 0;

    btnNext.addEventListener("click", function () {
      if (viewSlide < 121) {
        viewSlide++;
      } else {
        viewSlide = 0;
      }

      slider.style.left = -viewSlide * viewport + "px";
    });

    btnPrev.addEventListener("click", function () {
      if (viewSlide > 0) {
        viewSlide--;
      } else {
        viewSlide = 121;
      }

      slider.style.left = -viewSlide * viewport + "px";
    });
    hero.forEach((item) => {
      let divSlide = document.createElement("div");
      divSlide.classList.add("slide");
      divSlide.append(item);
      slider.append(divSlide);
    });
  });

  document.querySelector("#btn_grid").addEventListener("click", () => {
    content.innerHTML = "";
    // div.classList.remove("hide");
    content.append(div);
    grid_inp.classList.remove("hide");
    // div.classList.remove("slider");let grid_inp = document.querySelector(".grid_text");
    document.querySelector("#btn_slider").disabled = false;
    let hero = Array.from(document.getElementsByClassName("hero"));

    let grid_btn = document.querySelector(".grid_btn");

    grid_btn.addEventListener("click", updateContent);

    function updateContent() {
      let gridText = document.querySelector(".grid_text");
      let inpValue = gridText.value;
      const takeHero = hero.filter((item) => item.innerText === inpValue);
      // console.log(takeHero);
      div.classList.add("hide");
      content.append(takeHero[0]);

      gridText.addEventListener("input", () => {
        div.classList.remove("hide");
        content.removeChild(takeHero[0]);
      });
    }
  });
})();
