
    const dinos = [
    {
        "species": "Triceratops",
        "weight": 13000,
        "height": 114,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "First discovered in 1889 by Othniel Charles Marsh"
    },
    {
        "species": "Tyrannosaurus Rex",
        "weight": 11905,
        "height": 144,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "The largest known skull measures in at 5 feet long."
    },
    {
        "species": "Anklyosaurus",
        "weight": 10500,
        "height": 55,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Anklyosaurus survived for approximately 135 million years."
    },
    {
        "species": "Brachiosaurus",
        "weight": 70000,
        "height": 372,
        "diet": "herbavor",
        "where": "North America",
        "when": "Late Jurasic",
        "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
    },
    {
        "species": "Stegosaurus",
        "weight": 11600,
        "height": 79,
        "diet": "herbavor",
        "where": "North America, Europe, Asia",
        "when": "Late Jurasic to Early Cretaceous",
        "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
    },
    {
        "species": "Elasmosaurus",
        "weight": 16000,
        "height": 59,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
    },
    {
        "species": "Pteranodon",
        "weight": 44,
        "height": 20,
        "diet": "carnivor",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
    },
    {
        "species": "Pigeon",
        "weight": 0.5,
        "height": 9,
        "diet": "herbavor",
        "where": "World Wide",
        "when": "Holocene",
        "fact": "All birds are living dinosaurs."
    }
]
    const dinoArray = [];

    //References to HTML elements
    const form = document.getElementById('dino-compare');
    const button = document.getElementById("btn");


    //Dino factory function with functional mixins
    //All objects created close over the facts array and name
    function DinoMaker(dinoPropObj){ 
       const facts = [];
       let species = dinoPropObj.species;
       facts.push(dinoPropObj.weight);
       facts.push(dinoPropObj.height);
       facts.push(dinoPropObj.diet);
       facts.push(dinoPropObj.where);
       facts.push(dinoPropObj.when);
       facts.push(dinoPropObj.fact); 

       return Object.assign({},{
            addFact : function(){

            },
            showName : function(){
                return species;
            },
            randomFact : function(){
                if (facts.length > 0) {
                    let i = Math.floor(Math.random() * facts.length);
                    let fact = facts.splice(i,1); //get and delete from array
                    return(fact[0]);
                }else{
                    return('Sorry - No more facts available!');
                }
            },
            selectFact : function(indexNum){
                if (indexNum >= 0 && indexNum < facts.length){
                    return facts[indexNum];
                }else{
                    return('Sorry - Incorrect fact number!'); 
                }
           }
       });
    }

    // Create Dino Objects
    for(i = 0; i < dinos.length; i++){
       dinoArray[i] = DinoMaker(dinos[i]);
    }
     console.log(dinoArray[0].showName());
    
    //Create the human object
     button.addEventListener("click", function(){
       let name = form.name.value;
       let feet = form.feet.value;
       let inches = form.inches.value;
       let weight = form.weight.value;
       let diet = form.diet.value; 
      
       console.log(`${name} ${feet} ${inches} ${weight} ${diet}`)
    })
   

    
    

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
