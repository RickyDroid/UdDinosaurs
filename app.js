
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
    //Array of dinasaur objects plus one human object appended to the end
    const dataObjs = [];

    //References to HTML elements
    const form = document.getElementById('dino-compare');
    const button = document.getElementById("btn");

    //Dino factory function with functional mixins
    //All objects created close over the facts array and name
    function DinoMaker(dinoPropObj){ 
       const facts = [];
       const dinoHumanFacts = [];
       let species = dinoPropObj.species;
       facts.push(dinoPropObj.weight); //index 0
       facts.push(dinoPropObj.height); //index 1
       facts.push(dinoPropObj.diet);   //index 2 
       facts.push(dinoPropObj.where);  //index 3
       facts.push(dinoPropObj.when);   //index 4
       facts.push(dinoPropObj.fact);   //index 5

       return Object.assign({},{
            species : function(){
                return species;
            },
            addFact : function(data){
                dinoHumanFacts.push(data);
            },
            selectFactComp : function(indexNum){
                return dinoHumanFacts[indexNum];
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

    // Create dino data objects and add to dataObjs array
    function createDinos(){
        for(i = 0; i < dinos.length; i++){
            dataObjs[i] = DinoMaker(dinos[i]);
        }
    }
    createDinos();
    
    //Constructor using the revealing module pattern to create
    //one human object and append to dataObjs array
    function CreateHuman(){
       let human = (function(){
            const name = form.name.value;
            const feet = form.feet.value;
            const inches = form.inches.value;
            const weight = form.weight.value; //lbs
            const diet = form.diet.value; 
            function heightInInches(){
                return (parseInt(feet) * 12) + parseInt(inches);
            } 
           return {
              name : name,
              feet : feet,
              inches : inches,
              weight : weight,
              diet : diet,
              heightInInches : heightInInches
           }
       })() 
       //Append human object to dataObjs array at index 8
       dataObjs.push(human);
    }
    
    //Create the human object
    button.addEventListener("click", function(){
        // createDinos();
        CreateHuman();
        compareHeight();
    })
   
    
    function compareHeight(){
        //TODO --loop though dataObjs array and compare all their heights
         
        let dHeight = dataObjs[0].selectFact(1); //height of dino
        let hHeight = dataObjs[8].heightInInches(); //height of human
        let hDif = dHeight - hHeight;
        dataObjs[0].addFact(hDif); //add new fact to dino
        console.log(dataObjs[0].selectFactComp(0));
    }
    
    function compareWeight(){

    }
   
    function compareWhenBorn(){
       //TODO - Add another DOB field to form
    }

    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
