const {Animal, animalsArray} = require("./model");
let counter = 0;
module.exports = {
    add: (data) => {
        // utwórz obiekt klasy Animal
        // dodaj do animalsArray
        console.log(data);
        
        let newAnimal = new Animal(data["name"], data["color"], counter);
        animalsArray.push(newAnimal);
        console.log(animalsArray)
        // return newAnimal;
        counter++;
    },
    delete: (id) => {
        animalsArray.forEach((animal, i) => {
            if(animal.id == id){
                animalsArray.splice(i, 1);
            }
        });
    },
    update: (id) => {
        // update po id elementu animalsArray
        animalsArray.forEach((animal, i) => {
            if(animal.id == id){
                animal.setUpdate();
            }
        });
    },
    getall: () => {
        return animalsArray
    }

}