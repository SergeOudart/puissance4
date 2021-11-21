var tableauEvaluation = 
    [[3, 4, 5, 7, 5, 4, 3],
    [4, 6, 8, 10, 8, 6, 4],
    [5, 8, 11, 13, 11, 8, 5],
    [5, 8, 11, 13, 11, 8, 5],
    [4, 6, 8, 10, 8, 6, 4],
    [3, 4, 5, 7, 5, 4, 3],
    [0, 0, 0, 0, 0, 0, 0]];

class iaTest {

    constructor(difficulte) {
        this.difficulte = difficulte;
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

    heuristiqueFacile(tableauJeu){

        var max = 0;
        var copieTab = tableauEvaluation;

        var arrReturn = new Array(2);

        for(i = 0; i <= 5 ; i++ ){
            for(j = 0; j <= 6; j++ ){
                if(tableauJeu[i][j] != 0){
                    tableauEvaluation[i][j] = 0;
                }
                
            }
        }

        for(i = 0; i <= 5 ; i++ ){
            for(j = 0; j <= 6; j++ ){

                if((tableauEvaluation[i][j] > max) && (tableauEvaluation[i+1][j]) == 0) {
                    max = tableauEvaluation[i][j];
                    arrReturn[0] = i;
                    arrReturn[1] = j;
                    
                }
            }
        }
        console.log(tableauEvaluation);

        return arrReturn;
    }

    heuristique(tableauJeu){

        var col;
        var tab = new Array(6);

        for(i = 0; i < 6 ; i++){
            for (j = 0; j < 5 ; j++){
                if (tableauJeu[i][j] == 0){


                }
            }
        }


        return col;
    }



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
