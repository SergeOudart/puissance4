var tableauEvaluation = 
    [[3, 4, 5, 7, 5, 4, 3],
    [4, 6, 8, 10, 8, 6, 4],
    [5, 8, 11, 13, 11, 8, 5],
    [5, 8, 11, 13, 11, 8, 5],
    [4, 6, 8, 10, 8, 6, 4],
    [3, 4, 5, 7, 5, 4, 3],
    [0, 0, 0, 0, 0, 0, 0]];
var copieTabJeu = Array(6);
var copieTabEval = Array(7);
var nowComp;
var comp;

class iaTest {

    constructor(difficulte, evaluation) {
        this.difficulte = difficulte;
        this.evaluation = evaluation;
    }

    casesVides(tableauJeu){
        var newTab = new Array(6);

        for(i = 0; i < 6 ; i++){
            for (j = 0; j < 5 ; j++){
                if (tableauJeu[i][j] == 0){
                    newTab[i][j] = tableauJeu[i][j]
                }
                else{
                    newTab[i][j] = 'X';            
                }
            }
        }
        return newTab;
    }

    initTableauEval(tableauJeu) {
        for(i = 0; i <= 5 ; i++ ){
            for(j = 0; j <= 6; j++ ){
                if(tableauJeu[i][j] != 0){
                    tableauEvaluation[i][j] = 0;
                }
                
            }
        }
    }

    heuristiqueFacile(tableauJeu){

        var max = 0;

        var arrReturn = new Array(2);

        this.initTableauEval(tableauJeu);

        for(i = 0; i <= 5 ; i++ ){
            for(j = 0; j <= 6; j++ ){

                if((tableauEvaluation[i][j] > max) && (tableauEvaluation[i+1][j]) == 0) {
                    max = tableauEvaluation[i][j];
                    arrReturn[0] = i;
                    arrReturn[1] = j;
                    
                }
            }
        }

        return arrReturn;
    }

    heuristiqueMoyen(tableauJeu, iaTurn){

        var profondeur = 2;

        var evaluation = 200;

        this.initTableauEval(tableauJeu);

        var evaluationVal = Array();
        var coord = Array();
        if (iaTurn) {
            comp = 1;
        } else {
            comp = 2;
        }
        var compt = 0;
        for(i = 0; i<=5; i++) {
            for(j=0;j<=6;j++) {
                if ((tableauEvaluation[i+1][j] == 0) && (tableauEvaluation[i][j] != 0)) {
                    evaluationVal[compt] = tableauEvaluation[i][j];
                    
                    coord[compt] = [i,j];

                    compt++;
                }
            }
        }
        var tabEvaluationCourante = Array();

        for(i = 0; i < coord.length;i++) {

            for (let x = 0; x<6;x++) {
                copieTabJeu[x] = Array(7).fill(0);
            }

            for(let x = 0; x<=5;x++) {
                for(j=0;j<=6;j++) {
                    var test = tableauJeu[x][j];
                    copieTabJeu[x][j] = test;
                }
            }

            for (let x = 0; x<=6;x++) {
                copieTabEval[x] = Array(7).fill(0);
            }

            for(let x = 0; x<=6;x++) {
                for(j=0;j<=6;j++) {
                    var test = tableauEvaluation[x][j];
                    copieTabEval[x][j] = test;
                }
            }

            
            this.evaluation = 200;
            this.debut(coord[i], evaluation, profondeur);
            tabEvaluationCourante[i] = this.evaluation;
            
        }

        var max = tabEvaluationCourante[0];
        var coordJouer = [];
        for(i = 0; i < tabEvaluationCourante.length; i++) {
            if(max < tabEvaluationCourante[i]) {
                max = tabEvaluationCourante[i];
                coordJouer = coord[i];
            }
        }

        return coordJouer;
        
    }

    debut(coordonnes, evaluation, profondeur) {
        var i = 1;
        copieTabJeu[coordonnes[0]][coordonnes[1]] = comp;
        this.evaluation = this.evaluation + copieTabEval[coordonnes[0]][coordonnes[1]];
        copieTabEval[coordonnes[0]][coordonnes[1]] = 0;

        while(i != profondeur) {
            this.evaluation = this.evaluation + this.central();
            i++;
        }

    }

    central() {
        if (comp == 1) { //Un coup de l'ia vient d'être joué, c'est donc au joueur de jouer
            comp = comp + 1;
            var res = this.minimax();
            return res;
        } else {    //Un coup du joueur vient d'être joué, c'est donc à l'IA
            comp = comp - 1;
            var res = this.minimax();
            
            return res;
        }
    }

    minimax() {
        
        var evaluationVal = Array();
        var coord = Array();
        var coordMin = Array();
        var max;

        var compt = 0;
        for(i = 0; i<=5; i++) {
            for(j=0;j<=6;j++) {
                if ((copieTabEval[i+1][j] == 0) && (copieTabEval[i][j] != 0)) {
                    evaluationVal[compt] = copieTabEval[i][j];
                    
                    coord[compt] = [i,j];

                    compt++;
                }
            }
        }

        //CHerche le minimum des coups possible
        max = evaluationVal[0];
        for(var i = 0; i < evaluationVal.length; i++) {
            if(max < evaluationVal[i]) {
                max = evaluationVal[i];
                coordMin = coord[i];
            }
        }

        
        
        try {
            copieTabJeu[coordMin[0]][coordMin[1]] = comp;
            copieTabEval[coordMin[0]][coordMin[1]] = 0;
        } catch(e) {
            max = 200;
        }
        

        
        

        if (comp == 1) {
            return max;
        } else {
            return (0-max);
        }

    }

    /*heuristiqueMoyen(tableauJeu, iaTurn) {
        var jeton = 0;

        this.initTableauEval(tableauJeu);

        if(iaTurn) {
            jeton = 1;
        } else {
            jeton = 2;
        }


        for (let x = 0; x<6;x++) {
            copieTabJeu[x] = Array(7).fill(0);
        }

        for (let x = 0; x<=6;x++) {
            copieTabEval[x] = Array(7).fill(0);
        }


        var evaluationAtteignable = Array();
        var coordAtteignable = Array();
        var compteur = 0;

        for(let i =0; i<=5;i++) {
            for(let j = 0; j<=6;j++) {
                if((tableauEvaluation[i+1][j] == 0) && (tableauEvaluation[i][j] != 0)) {
                    evaluationAtteignable[compteur] = tableauEvaluation[i][j];

                    coordAtteignable[compteur] = [i,j];

                    compteur++;
                }
            }
        }
        
        for(let i = 0; i < coordAtteignable.length;i++) {

            for (let x = 0; x<6;x++) {
                copieTabJeu[x] = Array(7).fill(0);
            }

            for(let x = 0; x<=5;x++) {
                for(let j=0;j<=6;j++) {
                    var test = tableauJeu[x][j];
                    copieTabJeu[x][j] = test;
                }
            }

            for (let x = 0; x<=6;x++) {
                copieTabEval[x] = Array(7).fill(0);
            }

            for(let x = 0; x<=6;x++) {
                for(let j=0;j<=6;j++) {
                    var test = tableauEvaluation[x][j];
                    copieTabEval[x][j] = test;
                }
            }

            this.evaluation = 200;
            this.premierCoup(coordAtteignable[i],jeton, copieTabJeu, copieTabEval);
            
        }
    }

    premierCoup(coordAtteignable,jeton,copieTabJeu,copieTabEval) {
        copieTabJeu[coordAtteignable[0]][coordAtteignable[1]] = jeton;
        this.evaluation = this.evaluation + copieTabEval[coordAtteignable[0]][coordAtteignable[1]];
        copieTabEval[coordAtteignable[0]][coordAtteignable[1]] = 0;

        console.log(copieTabJeu);
        console.log(copieTabEval);
    }*/

    
    // Verification match nul 

    verifNul(tableauJeu){
        var nul = true;
        for (var col = 0; col < 7 ; col ++){
            nul = nul && (tableauJeu[col][0] !== 0);
        }
        return nul;

    }


    checkVictoire(grille){
        var arr = new Array(2);

        //Balayage horizontal
        /*for (var ligne = 5; ligne >= 0; ligne--){
            for (var colonne = 0; colonne <= 6; colonne++) {
                if (grille[ligne][colonne] !== 0
                    && grille[ligne][colonne] === grille[ligne][colonne + 1]
                    && grille[ligne][colonne + 1] == 0
                    && colonne == 3) {
                        arr[0] = ligne;
                        arr[1] = colonne - 1;
                        return arr;
                    }
            }
        }*/

        for (var ligne = 5; ligne >= 0; ligne--){
            for (var colonne = 0; colonne <= 3; colonne++) {
                if (grille[ligne][colonne] !== 0
                && grille[ligne][colonne] === grille[ligne][colonne + 1]
                && grille[ligne][colonne] === grille[ligne][colonne + 2]
                && grille[ligne][colonne + 3] == 0) {
                        arr[0] = ligne;
                        arr[1] = colonne + 3;
                    return arr;
                }
            }
        }

        // Balayage verticale 
        for (ligne = 5; ligne >= 3; ligne--) {
            for (colonne = 0; colonne <= 6; colonne++) {
                if (grille[ligne][colonne] !== 0
                        && grille[ligne][colonne] === grille[ligne - 1 ][colonne]
                        && grille[ligne][colonne] === grille[ligne - 2][colonne]
                        && grille[ligne - 3][colonne] == 0) {
                            arr[0] = ligne - 3 ;
                            arr[1] = colonne;
                    return arr;
                }
            }
        }

          // Balayage diagonale 
          for (ligne = 5; ligne >= 3; ligne--) {
             for (colonne = 0; colonne <= 3; colonne++) {
       
            if (grille[ligne][colonne] !== 0
                    && grille[ligne][colonne] === grille[ligne - 1][colonne + 1]
                    && grille[ligne][colonne] === grille[ligne - 2][colonne + 2]
                    && grille[ligne - 3][colonne + 3] == 0) {
                        arr[0] = ligne - 3;
                        arr[1] = colonne + 3;
                return arr;
            }
        }
    }

       // Balayage diagonale 
       for (ligne = 5; ligne >= 3; ligne--) {
        for (colonne = 6; colonne >= 3; colonne--) {
      
            if (grille[ligne][colonne] !== 0
                    && grille[ligne][colonne] === grille[ligne - 1][colonne - 1]
                    && grille[ligne][colonne] === grille[ligne - 2][colonne - 2]
                    && grille[ligne - 3][colonne - 3] == 0) {
                        arr[0] = ligne - 3;
                        arr[1] = colonne - 3;
                return arr;
            }
        }
    }

    return 0;

    }
}

