import Grid from "../grid.handlebars";
import HeroesList from "../partials/heroes-list.handlebars";
import axios from "axios";
import NotFound from "../notFound.handlebars";

const url = "https://api.opendota.com";
const divGrid = document.createElement("div");

document.querySelector("#btn_grid").addEventListener("click", () => {
  content.innerHTML = "";
  content.insertAdjacentHTML("afterbegin", Grid());

  getGrid();

  async function getGrid() {
    const heroes = await axios.get(`${url}/api/heroes`);
    const heroesDetails = await axios.get(`${url}/api/heroStats`);

    divGrid.innerHTML = HeroesList({
      heroes: heroes.data.map((_hero, index) => ({
        nameHero: _hero.localized_name,
        srcImg: `${url}${heroesDetails.data[index].img}`,
      })),
    });

    grid.append(divGrid);
    let hero = Array.from(document.getElementsByClassName("hero"));
    console.log(hero);

    let gridBtn = document.querySelector(".grid_btn");

    gridBtn.addEventListener("click", updateContent);

    function updateContent() {
      let gridText = document.querySelector(".grid_text");
      let inpValue = gridText.value;

      let takeHero = [];

      hero.forEach((item) => {
        if (item.innerText === inpValue) {
          takeHero.push(item);
        }
      });

      if (takeHero.length == 0) {
        grid.insertAdjacentHTML("afterbegin", NotFound());
      } else if (takeHero.length > 0) {
        grid.innerHTML = "";
        grid.append(divGrid);
        grid.append(takeHero[0]);
      }

      gridBtn.disabled = true;
      divGrid.classList.add("hide");
      let h = document.querySelector("h1");

      gridText.addEventListener("input", () => {
        grid.innerHTML = "";
        grid.append(divGrid);
        divGrid.classList.remove("hide");
        gridBtn.disabled = false;
        takeHero[0].remove();
      });
    }
  }
});
