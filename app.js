
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
       const data = [];
       const facts = [];
       //Add data to data array
       data.push(dinoPropObj.species); //index 0
       data.push(parseInt(dinoPropObj.weight)); //index 1
       data.push(parseInt(dinoPropObj.height)); //index 2
       data.push(dinoPropObj.diet);   //index 3 
       data.push(dinoPropObj.where);  //index 4
       data.push(dinoPropObj.when);   //index 5
       //Add fact to facts array
       facts.push(dinoPropObj.fact);   //index 0
       if (dinoPropObj.species !== 'Pigeon'){
           facts.push(`I weight ${data[1]} lbs`);
           facts.push(`My height is ${data[2]} inches`);
           facts.push(`My diet is ${data[3]}`);
           facts.push(`My location is ${data[4]}`);
           facts.push(`I am here in the ${data[5]} period`);
       }
       
        return Object.assign({},{
            getData : function(d){
                let retData;
                switch (d.toLowerCase()) {
                    case 'species': retData = data[0]; break; 
                    case 'weight': retData = data[1]; break;
                    case 'height': retData = data[2]; break;
                    case 'diet': retData = data[3]; break;
                    case 'where': retData = data[4]; break; 
                    case 'when': retData = data[5]; break;     
                }
                return retData;
            },
            addFact : function(fact){
                facts.push(fact);
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
            getFact : function(n){ //temo for testing
                return(facts[n])
            }
       });
    }
    //Create dino data objects and add to dataObjs array then initialise 
    function createDinos(){
        //TODO - clear dataObjs array -- IMPORTANT 
        for(i = 0; i < dinos.length; i++){
            dataObjs[i] = DinoMaker(dinos[i]);  
        }
    }
  
    //Constructor using the revealing module pattern to create
    //one human object and append to dataObjs array
    function CreateHuman(){
       let human = (function(){
            const name = form.name.value;
            const feet = parseInt(form.feet.value);
            const inches = parseInt(form.inches.value);
            const weight = parseInt(form.weight.value); //lbs
            const diet = form.diet.value; 
            function heightInInches(){
                return (feet * 12) + inches;
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
        createDinos();
        CreateHuman();
        compareHeight();
    })
   
    function compareHeight(){
        //loop though dataObjs array upto the penultimate index position 
        let lastIdxPos = dataObjs.length - 1;
       for (let i = 0; i < dataObjs.length; i++) {
           //no new facts for the pigeon or human
           if ((dataObjs[i].getData('species') === 'pigeon') || 
              (dataObjs[i].getData('species') === 'human')){
              continue;
           }
           //Height difference data
           let dinoHeight = dataObjs[i].getData('height'); 
           let humanHeight = dataObjs[lastIdxPos].heightInInches(); 
           let dif = Math.abs(dinoHeight - humanHeight);
           let feet = Math.round(dif / 12);
           let inches = (dif % 12);
           //Compare heights 
           let newFact = '';
           if (dinoHeight === humanHeight){
               newFact = `Amazing!, we are the same height`;
           }
           else if (dinoHeight > humanHeight) {
               newFact = `I am ${feet} feet and ${inches} inches taller than you`;
           }else{
               newFact = `I am ${feet} feet and ${inches} inches shorter than you`;
           } 
           //Add the new fact to the current dino object
           dataObjs[i].addFact(newFact); 
       }   
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
