class noeudArbre {

    constructor(value) {
        this.value = value;
        this.enfants = [];
    }


    toString() {
        return this.value;
    }

    returnFilsChoisit(c) {
        return this.enfants[c];
    }

    getFils() {
        childs = [];
        this.enfants.forEach(element => {
            
        });
    }
}