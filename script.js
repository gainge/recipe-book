// Aight, let's try to populate this sucker
fetch("recipes.json")
  .then(response => {
    return response.json();
  })
  .then(json => {
    console.log(json);
  })
  .catch(err => {
    console.log(err);
  });


console.log("here I am, once again...");
console.log("忘れないで");









