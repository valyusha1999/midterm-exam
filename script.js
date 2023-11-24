const items = [
  {
    title: "Машинка Бублик",
    description: "Для активной игры!",
    tags: ["девочкам", "мальчикам"],
    price: 2.34,
    img: "./img/car.jpg",
    rating: 4.4,
  },
  {
    title: "Кубики Потешные зверушки",
    description: "Поможет в развитии интеллекта!",
    tags: ["девочкам", "мальчикам"],
    price: 3.30,
    img: "./img/cubes.jpg",
    rating: 4.1,
  },
  {
    title: "Кубики Фрукты",
    description: "Отвлечет вашего малыша!",
    tags: ["девочкам", "мальчикам"],
    price: 3.89,
    img: "./img/cubesFruits.jpg",
    rating: 5.0,
  },
  {
    title: "Бластер Снайпер",
    description: "Подойдет для парной игры!",
    tags: ["мальчикам"],
    price: 11.84,
    img: "./img/gun.jpg",
    rating: 4.7,
  },
  {
    title: "Мыльные пузыри Enchantimals",
    description: "Дуй и лови",
    tags: ["девочкам", "мальчикам"],
    price: 1.36,
    img: "./img/bubbles.jpg",
    rating: 4.9,
  },
  {
    title: "Лопатка для игры в песочнице",
    description: "Для песочницы!",
    tags: ["девочкам", "мальчикам"],
    price: 2.44,
    img: "./img/shovel.jpg",
    rating: 3.2,
  },
  {
    title: "Шнуровка Кеды",
    description: "Развивает моторику",
    tags: ["девочкам", "мальчикам"],
    price: 9.37,
    img: "./img/lacing.jpg",
    rating: 2.9,
  },
  {
    title: "Погремушка Звёздочка",
    description: "Для самых маленьких",
    tags: ["девочкам", "мальчикам"],
    price: 2.52,
    img: "./img/beanbag.jpg",
    rating: 3.4,
  },
  {
    title: "Мягкая игрушка Дракон Роман",
    description: "Для сладких снов!",
    tags: ["девочкам", "мальчикам"],
    price: 12.01,
    img: "./img/dragon.jpg",
    rating: 4.8,
  },
  {
    title: "Мягкая игрушка Единорог Ли Ли",
    description: "Разноцветный друг",
    tags: ["девочкам"],
    price: 25.10,
    img: "./img/unicorn.jpg",
    rating: 3.2,
  },
  {
    title: "Развивающая игрушка Тетрис",
    description: "Развивает логику!",
    tags: ["девочкам", "мальчикам"],
    price: 11.54,
    img: "./img/tetris.jpg",
    rating: 3.7,
  },
  {
    title: "Игровой набор Деревянные дорожные знаки",
    description: "Для изучения правил дорожного движения",
    tags: ["девочкам", "мальчикам"],
    price: 13.67,
    img: "./img/road_signs.jpg",
    rating: 4.1,
  },
];

let filter = [...items];

const div = document.querySelector("#shop-items");
const template = document.querySelector("#item-template");

const nothingFound = document.querySelector("#nothing-found");

function findItems(arr) {
  nothingFound.textContent = "";
  div.innerHTML = "";
  arr.forEach((item) => {
    div.append(crewShopItem(item));
  });
  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
}

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
}

findItems(filter.sort((a, b) => sortByAlphabet(a, b)));


function crewShopItem(shopItem) {
  const { title, description, tags, img, price, rating } = shopItem;
  const item = template.content.cloneNode(true);
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector("img").src = img;
  item.querySelector(".price").textContent = `${price}P`;

  const ratingContainer = item.querySelector(".rating");

  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const tagsHolder = item.querySelector(".tags");

  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsHolder.append(element);
  });

  return item;
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();

  filter = items.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );
  filter.sort((a, b) => sortByAlphabet(a, b));
  findItems(filter);
  sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("keydown", function(event) {
  if (event.key == 'Enter') {
    applySearch
  }
});
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "expensive": {
      filter.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      filter.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      filter.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      filter.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }
  findItems(filter);
});
