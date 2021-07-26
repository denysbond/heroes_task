import axios from 'axios';
import Heroes from "./heroes.handlebars";
const url = "https://api.opendota.com";

(async () => {
  const heroes = await axios.get(`${url}/api/heroes`);
  const heroesDetails = await axios.get(`${url}/api/heroStats`);
  const content = document.getElementById("content");
  const list = document.createElement("ul");
  heroes.data.forEach((_hero, index) => {
    const hero = Heroes({ nameHero: _hero.localized_name, srcImg: `${url}${heroesDetails.data[index].img }`});
    const li = document.createElement("li");
    li.innerHTML = hero;
    list.append(li);
  });
  content.append(list);
})();