
class Animal {
    constructor(name, color, id) {

        this.name = name;
        this.color = color;
        this.id = id
    }
    setUpdate(){
        this.name = "koń";
        this.color = "czarno-czerwony";
    }

}

let animalsArray = []

module.exports = { Animal, animalsArray };