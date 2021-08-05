import axios from "axios";
import HeroesList from "../partials/heroes-list.handlebars";
import Slider from "../slider.handlebars";

const url = "https://api.opendota.com";
const divSlide = document.createElement("div");

document.querySelector("#btn_slider").addEventListener("click", () => {
  content.innerHTML = "";
  content.insertAdjacentHTML("afterbegin", Slider());
  getSlider();

  async function getSlider() {
    const heroes = await axios.get(`${url}/api/heroes`);
    const heroesDetails = await axios.get(`${url}/api/heroStats`);

    divSlide.innerHTML = HeroesList({
      heroes: heroes.data.map((_hero, index) => ({
        nameHero: _hero.localized_name,
        srcImg: `${url}${heroesDetails.data[index].img}`,
      })),
    });

    content.append(divSlide);

    let hero = Array.from(document.getElementsByClassName("hero"));

    let viewport = document.getElementById("viewport").offsetWidth;
    console.log(viewport);

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
  }
});
