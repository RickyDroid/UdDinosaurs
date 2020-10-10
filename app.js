
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
    const dataObjs = [];
    let humanObj = {};
    //References to HTML elements
    const form = document.getElementById('dino-compare');
    const table = document.getElementById('table-compare');
    const button = document.getElementById("btn");
    const buttonFacts = document.getElementById("btnFacts");

    //Dino factory function 
    //All objects created close over the facts array and dino data
    function DinoMaker(dinoPropObj){ 
       const facts = [];
       //Dino data
       let species = dinoPropObj.species; 
       let weight = parseInt(dinoPropObj.weight);
       let height = parseInt(dinoPropObj.height); 
       let diet = dinoPropObj.diet;   
       let where = dinoPropObj.where;  
       let when = dinoPropObj.when;   
       //Add fact to facts array 
       facts.push(dinoPropObj.fact);   
       if (dinoPropObj.species !== 'Pigeon'){ //don't add more facts to pigean
           facts.push(`I weight ${weight} lbs`);
           facts.push(`My height is ${height} inches`);
           facts.push(`My diet is ${diet}`);
           facts.push(`My location is ${where}`);
           facts.push(`I am here in the ${when} period`);
       }  
        function getData(d){
            let retData;
            switch (d.toLowerCase()) {
                case 'species': retData = species; break; 
                case 'weight': retData = weight; break;
                case 'height': retData = height; break;
                case 'diet': retData = diet; break;
                case 'where': retData = where; break; 
                case 'when': retData = when; break;     
            }
            return retData;
        };
        function addFact(fact){
            facts.push(fact);
        };
        function randomFact(){
            if (facts.length > 0) {
                let i = Math.floor(Math.random() * facts.length);
                let fact = facts.splice(i,1); //get and delete from array
                return(fact[0]);
            }else{
                return('Sorry - No more facts available!');
            }
        };
        //RETURN OBJECT
        return {
            //Method to return all dino data
            getData : getData, 
            //Method to add the human / dino comparison facts
            addFact : addFact,
            //Method to return random facts
            randomFact : randomFact
       };
    }
    //Create dino data objects and add to dataObjs array 
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
            let name = form.name.value;
            let feet = parseInt(form.feet.value);
            let inches = parseInt(form.inches.value);
            let weight = parseInt(form.weight.value); //lbs
            let diet = form.diet.value;
            //Method to return all person data 
            function getData(d){
                let retData;
                switch (d.toLowerCase()) {
                    case 'name': retData = name; break; 
                    case 'feet': retData = feet; break;
                    case 'inches': retData = inches; break;
                    case 'weight': retData = weight; break;
                    case 'diet': retData = diet; break; 
                }
                return retData;
            }
            function heightInInches(){
                return (feet * 12) + inches;
            } 
            //RETURN OBJECT
            return {
                //Method to return all human data 
                getData : getData,
                //Method to convert feet and inches to inches
                heightInInches : heightInInches
            }
       })() 
       humanObj = human;
    }
     
    function generateFacts(){
        for (const dino of dataObjs) {
            if (dino.getData('species').toLowerCase() !== 'pigeon'){
                compareHeight(dino);
                compareWeight(dino);  
                compareDiet(dino);            
            }
        }
    }

    function compareHeight(dinoObj){
        let dinoHeight = dinoObj.getData('height'); 
        let humanHeight = humanObj.heightInInches(); 
        let dif = Math.abs(dinoHeight - humanHeight);
        let feet = Math.round(dif / 12);
        let inches = (dif % 12);
        //Compare heights and make a fact
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
        dinoObj.addFact(newFact); 
    }
    
    function compareWeight(dinoObj){
        let dinoWeight = dinoObj.getData('weight'); 
        let humanWeight = humanObj.getData('weight'); 
        let lbs = Math.abs(dinoWeight - humanWeight);
        let newFact = '';
        //compare weights and make a fact
        if (dinoWeight === humanWeight){
            newFact = `Amazing, we are the same weight!`;
        }else if (dinoWeight > humanWeight){
            newFact = `I am ${lbs} lbs heavier then you`;
        }else{
            newFact = `I am ${lbs} lbs lighter than you}`
        }
        //Add the new fact to the current dino object
        dinoObj.addFact(newFact);
    }
   
    function compareDiet(dinoObj){
        let dinoDiet = dinoObj.getData('diet').toLowerCase(); 
        let humanDiet = humanObj.getData('diet').toLowerCase(); 
        let newFact = '';
        //compare diets and make a fact
        if (dinoDiet === humanDiet){
            newFact = `Amazing - we are both eat the same food!`
        }else{
            newFact = `I am a ${dinoDiet} and you are a ${humanDiet}`
        }
        //Add the new fact to the current dino object
        dinoObj.addFact(newFact);
    }

    //TODO - make dataObjs random order plus add human to center
    function addHuman(){
        //ramdomize the array 
        //add the human to the center element
        dataObjs.push(humanObj);
    }

     
    // Generate Tiles for each Dino in Array
    function generateTiles(){
        for(let i = 0; i < dataObjs.length; i++){
            //identify the human object
           if (dataObjs[i].hasOwnProperty('heightInInches')){
               makeHumanTile(i);
           }else{
               makeDinoTile(i);
           }
        }
    }    
        
    function makeDinoTile(i){
        let species = dataObjs[i].getData('species'); 
        let picURL = 'images/' + species.toLowerCase() + '.png';
        let fact = dataObjs[i].randomFact();
        let tile = 'tile' + i;
        let currentTile = document.getElementById(`${tile}`);
        let html = '';
        html += `<h3>${species}</h3>`;
        html += `<img src = "${picURL}">`
        html += `<p>${fact}</p>`;
        //Add tiles to the DOM
        currentTile.innerHTML = html;
    }    
            
    function makeHumanTile(i){
        let name = dataObjs[i].getData('name');
        let tile = 'tile' + i;
        let currentTile = document.getElementById(`${tile}`);
        let html = '';
        html += `<h3>${name}</h3>`;
        html += `<img src = "images/human.png">`
        //Add tiles to the DOM
        currentTile.innerHTML = html;
    }     
    

// On button click, prepare and display infographic
button.addEventListener("click", function(){
    createDinos();
    CreateHuman();
    generateFacts();
    addHuman();
    generateTiles();
    //Remove form and display table and button
    form.hidden = true;
    table.hidden = false; 
    buttonFacts.hidden = false; 
})

buttonFacts.addEventListener("click", function(){
    generateTiles();
})
