import Dropdown from "../dropdown.handlebars";
import HeroesList from "../partials/heroes-list.handlebars";
import axios from "axios";

const url = "https://api.opendota.com";
const divDropdown = document.createElement("div");

document.querySelector("#btn_dropdown").addEventListener("click", () => {
  content.innerHTML = "";

  content.insertAdjacentHTML("afterbegin", Dropdown());
  dropdown.append(divDropdown);
  getDropdown();

  async function getDropdown() {
    const heroes = await axios.get(`${url}/api/heroes`);
    const heroesDetails = await axios.get(`${url}/api/heroStats`);

    divDropdown.innerHTML = HeroesList({
      heroes: heroes.data.map((_hero, index) => ({
        nameHero: _hero.localized_name,
        srcImg: `${url}${heroesDetails.data[index].img}`,
      })),
    });

    let selectHeader = document.querySelector(".select__header");
    let select = document.querySelector(".select");
    let hero = Array.from(document.getElementsByClassName("hero"));
    let selectBody = document.querySelector(".select__body");
    let footer = document.querySelector("footer");

    selectHeader.addEventListener("click", selectToggle);

    hero.forEach((item) => {
      let createSelectItem = document.createElement("div");
      createSelectItem.classList.add("select__item");
      createSelectItem.append(item);
      selectBody.append(createSelectItem);
      item.classList.add("drop");
    });

    let selectItem = document.querySelectorAll(".select__item");
    selectItem.forEach((item) => {
      item.addEventListener("click", (e) => {
        let target = e.target;
        if ((target = item)) {
          select.classList.remove("is-active");
          selectHeader.innerHTML = "";
          selectHeader.append(item);
          footer.classList.remove("is-active");
        }
      });
    });

    function selectToggle() {
      this.parentElement.classList.toggle("is-active");
      footer.classList.toggle("is-active");
    }
  }
});
