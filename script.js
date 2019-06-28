// Aight, let's try to populate this sucker
fetch("recipes.json")
  .then(response => {
    return response.json();
  })
  .then(json => {
    console.log(json);
    loadRecipes(json);
  })
  .catch(err => {
    console.log(err);
  });


console.log("here I am, once again...");
console.log("忘れないで");



// Some stuff I guess
const c_RECIPE_CARD = "recipe-card";
const c_RECIPE_DESCRIPTION = "recipe-description";
const c_TITLE = "title";
const c_TRI_RIGHT = "triangle-right";
const c_TRI_LEFT = "triangle-left";
const c_RECIPE_INFO = "recipe-info";
const c_RECIPE_INSTRUCTIONS = "recipe-instructions";
const c_HIDDEN = "hidden";
const c_NOTE = "note";





function loadRecipes(recipes) {
  var contentContainer = document.getElementsByClassName("main-content")[0];
  console.log(contentContainer);

  // Just go through each of the recipes and spit out a new child
  // But this will be a little different because we're just filling it in?
  // Eh, we could actually build a new one, lol
  recipes["recipes"].forEach(recipe => {
    addRecipe(contentContainer, recipe);
  });
}

function addRecipe(container, recipe) {
  // Well, I suppose we ought to build it, lol
  
  // Description
  let description = builRecipeDescription(recipe);

  // Instructions
  let instructions = builRecipeInstructions(recipe);


  // create the parent and add the children
  let card = document.createElement("div");
  card.classList.add(c_RECIPE_CARD);

  card.appendChild(description);
  card.appendChild(instructions);

  container.appendChild(card);
}


function builRecipeDescription(recipe) {
  let description = document.createElement("div");
  description.classList.add(c_RECIPE_DESCRIPTION);

  // Title
  description.appendChild(buildTitle(recipe));

  // Info
  description.appendChild(buildRecipeInfo(recipe));

  // Break lol
  description.appendChild(document.createElement("br"));

  // Ingredients
  description.appendChild(buildIngredients(recipe));


  // Button or w/e
  // TODO: lol


  return description;
}



function builRecipeInstructions(recipe) {
  let instructions = document.createElement("div");

  instructions.classList.add(c_RECIPE_INSTRUCTIONS);
  instructions.classList.add(c_HIDDEN);

  return instructions;
}





// Recipe Description Helper Functions
function buildIngredients(recipe) {
  let listWrapper = document.createElement("div");

  let label = document.createElement("h2");
  label.textContent = "Ingredients:";

  let list = document.createElement("ul");

  // Iterate over the ingredients
  recipe.ingredients.forEach(ingredient => {
    let ingredientDescription = createIngredientBlurb(ingredient);
    list.appendChild(ingredientDescription);
  });

  listWrapper.appendChild(list);

  return listWrapper;
}

function createIngredientBlurb(ingredient) {
  let item = document.createElement("li");

  let amount = ingredient["amount-low"];
  if (ingredient["amount-high"] && ingredient["amount-low"] !== ingredient["amount-high"]) {
    amount = amount + "-" + ingredient["amount-high"];
  }

  if (ingredient["units"]) {
    amount += " " + ingredient["units"];
  }

  let name = ingredient["name"];

  let processing = "";
  if (ingredient["processing"]) {
    processing = ingredient["processing"];
  }
  

  // add elements as text content
  let description = document.createTextNode(amount + " " + name);
  
  if (processing) {
    description.textContent += ", " + processing;
  }

  item.appendChild(description);


  // Add notes last as a span child
  if (ingredient["notes"]) {
    let notesSpan = document.createElement("span");
    notesSpan.classList.add(c_NOTE);

    notesSpan.textContent = " (" + ingredient["notes"] + ")";

    item.appendChild(notesSpan);
  }

  return item;
}



function buildRecipeInfo(recipe) {
  let info = document.createElement("div");
  info.classList.add(c_RECIPE_INFO);

  // Create the basic info panel
  let textWrapper = document.createElement("div");

  let time = recipe["time"];

  let servings = recipe["servings-low"];
  if (recipe["servings-low"] !== recipe["servings-high"]) {
    servings = servings + "-" + recipe["servings-high"];
  }

  let source = "N/A";
  if (recipe["source"]) {
    source = recipe["source"];
  }


  textWrapper.appendChild(buildLeadingStrong("Time:", time));
  textWrapper.appendChild(buildLeadingStrong("Servings:", servings));
  textWrapper.appendChild(buildLeadingStrong("Source:", source));

  info.appendChild(textWrapper);

  // add the image
  if (recipe["image"]) {
    let image = document.createElement("img");
    image.setAttribute("src", recipe["image"]);

    info.appendChild(image);
  }

  // All done!
  return info;
}

function buildLeadingStrong(heading, content) {
  let text = document.createElement("p");

  let strong = document.createElement("strong");
  strong.textContent = heading;

  text.appendChild(strong);
  text.appendChild(document.createTextNode(" " + content));

  return text;
}


function buildTitle(recipe) {
  let title = document.createElement("div");
  title.classList.add(c_TITLE);

  // Create the triangles and header info
  let triRight = document.createElement("div");
  triRight.classList.add(c_TRI_RIGHT);

  let triLeft = document.createElement("div");
  triLeft.classList.add(c_TRI_LEFT);

  let header = document.createElement("h2");
  header.textContent = recipe["title"];


  // Add them children
  title.appendChild(triRight);
  title.appendChild(header);
  title.appendChild(triLeft);

  return title;
}














// Recipe Instructions helper functions









