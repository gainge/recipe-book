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
const c_OPTIONAL = "optional";
const c_EXPANDED = "expanded";

const s_COOK_BUTTON = "Start Cooking!";




function expandRecipe(recipeID) {
  let recipeCard = document.getElementById(recipeID);

  if (!recipeCard) return;

  // Now we just expand it or someting lol
  recipeCard.classList.add(c_EXPANDED);
  let description = recipeCard.getElementsByClassName(c_RECIPE_INSTRUCTIONS)[0];

  if (description) {
    description.classList.remove(c_HIDDEN);
  } else {
    alert("Corrupted Document Structure!");
  }

}

function closeRecipe(recipeID) {
  let recipeCard = document.getElementById(recipeID);

  if (!recipeCard) return;

  // Now we just expand it or someting lol
  recipeCard.classList.remove(c_EXPANDED);
  let description = recipeCard.getElementsByClassName(c_RECIPE_INSTRUCTIONS)[0];

  if (description) {
    description.classList.add(c_HIDDEN);
  } else {
    alert("Corrupted Document Structure!");
  }
}



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
  // Set unique ID for recipe
  if (!recipe.id) {
    recipe.id = uuid();
  }
  
  // Description
  let description = builRecipeDescription(recipe);

  // Instructions
  let instructions = builRecipeInstructions(recipe);


  // create the parent and add the children
  let card = document.createElement("div");
  card.classList.add(c_RECIPE_CARD);
  card.id = recipe.id;

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
  let cookButton = document.createElement("button");
  cookButton.innerText = s_COOK_BUTTON;
  let targetID = recipe.id;
  cookButton.onclick = () => expandRecipe(targetID);

  description.appendChild(cookButton);

  return description;
}



function builRecipeInstructions(recipe) {
  let instructions = document.createElement("div");

  instructions.classList.add(c_RECIPE_INSTRUCTIONS);
  instructions.classList.add(c_HIDDEN);

  // Construct Header
  let header = document.createElement("h2");
  header.innerText = "Instructions:";

  let close = document.createElement('i');
  close.classList.add('material-icons');
  close.innerText = "close";

  let targetID = recipe.id;

  close.onclick = () => closeRecipe(targetID);

  header.appendChild(close);

  instructions.appendChild(header);

  // Build the list of instructions
  instructions.appendChild(buildInstructionsList(recipe.instructions));


  return instructions;
}





// Recipe Description Helper Functions
function buildIngredients(recipe) {
  let listWrapper = document.createElement("div");

  let label = document.createElement("h2");
  label.textContent = "Ingredients:";

  listWrapper.appendChild(label);

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
  if (!ingredient["required"]) {
    item.classList.add(c_OPTIONAL);
  }

  let amount = convertToMeasurement(parseFloat(ingredient["amount-low"]));
  item.appendChild(amount);
  if (ingredient["amount-high"] && ingredient["amount-low"] !== ingredient["amount-high"]) {
    let high = convertToMeasurement(parseFloat(ingredient["amount-high"]));
    item.appendChild(document.createTextNode("-"));
    item.appendChild(high);
  }

  if (ingredient["units"]) {
    item.appendChild(document.createTextNode(" " + ingredient["units"]));
  }

  let name = ingredient["name"];

  let processing = "";
  if (ingredient["processing"]) {
    processing = ingredient["processing"];
  }
  

  // add elements as text content
  let description = document.createTextNode(" " + name);
  
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

  let source = document.createTextNode("N/A");
  if (recipe["source"]) {
    // Parse the URL
    let url = recipe["source"];
    let parts = url.match('http[s]*:\/\/(www\.[a-zA-Z0-9]+\.[a-zA-Z]+)\/.*');
    if (parts) {
      source = document.createElement("a");
      source.setAttribute("href", parts[0]);
      source.textContent = parts[1];
    } else {
      source = document.createTextNode(url);
    }
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
  text.appendChild(document.createTextNode(" "));
  
  if (typeof content == "object") {
    text.appendChild(content);
  } else {
    text.appendChild(document.createTextNode(content));
  }
  

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
// TODO: for binding, could pass in a list of ingredients mapped to by their ids or something
// Then we could do the hover light up thing
// I really think that effect would be worth it
function createInstructionBlurb(instruction) {
  let item = document.createElement("li");

  item.innerText = instruction;

  return item;
}


function buildInstructionsList(instructions) {
  let listWrapper = document.createElement("div");

  // Construct Instruction Enumeration
  let list = document.createElement("ol");

  // Iterate over the ingredients
  instructions.forEach(instruction => {
    let instructionElement = createInstructionBlurb(instruction);
    list.appendChild(instructionElement);
  });



  listWrapper.appendChild(list);

  return listWrapper;
}














// Misc Helper Functions
function convertToMeasurement(val) {
  // We're basically just going to be turning it into an impartial fraction
  let remainder = parseFloat((val % 1).toFixed(4));
  let integerPart = parseInt(val);

  if (integerPart == val) {
    return document.createTextNode(val);
  } else {
    // Things get more interesting
    let len = remainder.toString().length - 2;

    let denominator = Math.pow(10, len);
    let numerator = remainder * denominator;

    let divisor = gcd(numerator, denominator);

    numerator /= divisor;
    denominator /= divisor;

    let fraction = document.createElement("span");
    if (val > 1) {
      fraction.appendChild(document.createTextNode(integerPart));
    }

    // Now to add the fraction :)
    let num = document.createElement("sup");
    num.textContent = numerator;

    let denom = document.createElement("sub");
    denom.textContent = denominator;

    // Add the fraction parts into our node
    fraction.appendChild(num);
    fraction.appendChild(document.createTextNode("/"));
    fraction.appendChild(denom);

    return fraction;
  }
}

function uuid() {
  return Math.floor(Math.random(0xFFFF) * 0xFFFF);
}




// GDC javascript help from online
function gcd(a, b) {
  if (b < 0.0000001) return a;

  return gcd(b, Math.floor(a % b));
};