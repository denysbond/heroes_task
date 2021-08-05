import Grid from "../grid.handlebars";
import HeroesList from "../partials/heroes-list.handlebars";
import axios from "axios";

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

    // hero.classList.add("list");
    let gridBtn = document.querySelector(".grid_btn");

    gridBtn.addEventListener("click", updateContent);
    // divGrid.classList.add("hide");

    // hero.forEach((item) => {
    //   grid.append(item);
    // });

    function updateContent() {
      let gridText = document.querySelector(".grid_text");
      let inpValue = gridText.value;

      // let takeHero = hero.filter((item) => item.innerText === inpValue);
      // console.log(takeHero);
      // grid.append(takeHero[0]);
      // console.log(takeHero);

      let takeHero = [];

      hero.forEach((item) => {
        if (item.innerText === inpValue) {
          takeHero.push(item);
        }
      });
      console.log(takeHero);
      grid.append(takeHero[0]);

      gridBtn.disabled = true;
      divGrid.classList.add("hide");

      gridText.addEventListener("input", () => {
        divGrid.classList.remove("hide");
        gridBtn.disabled = false;
        takeHero[0].remove();
        console.log(takeHero);
      });
    }
  }
});
