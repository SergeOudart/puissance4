


 //Balayage horizontal _
 for (var ligne = 5; ligne >= 0; ligne--){
    for (var colonne = 0; colonne <= 3; colonne++) {
    if (grille[ligne][colonne] !== 0
        && grille[ligne][colonne] === grille[ligne][colonne + 1]
        && grille[ligne][colonne] === grille[ligne][colonne + 2]
        && grille[ligne][colonne] === grille[ligne][colonne + 3]) {
    return grille[ligne][colonne];
}
    }

        // Balayage verticale |
        for (ligne = 5; ligne >= 3; ligne--) {
            for (colonne = 0; colonne <= 6; colonne++) {
           
                if (grille[ligne][ligne] !== 0
                        && grille[ligne][colonne] === grille[ligne - 1 ][colonne]
                        && grille[ligne][colonne] === grille[ligne - 2][colonne]
                        && grille[ligne][colonne] === grille[ligne - 3][colonne]) {
                    return grille[ligne][colonne];
                }
            }
        }

          // Balayage diagonale /
          for (ligne = 5; ligne >= 3; ligne--) {
    for (colonne = 0; colonne <= 3; colonne++) {
       
            if (grille[ligne][colonne] !== 0
                    && grille[ligne][colonne] === grille[ligne - 1][colonne + 1]
                    && grille[ligne][colonne] === grille[ligne - 2][colonne + 2]
                    && grille[ligne][colonne] === grille[ligne - 3][colonne + 3]) {
                return grille[ligne][colonne];
            }
        }
    }

       // Balayage diagonale \
       for (ligne = 5; ligne >= 3; ligne--) {
       for (colonne = 6; colonne >= 3; colonne--) {
      
            if (grille[ligne][colonne] !== 0
                    && grille[ligne][colonne] === grille[ligne - 1][colonne - 1]
                    && grille[ligne][colonne] === grille[ligne - 2][colonne - 2]
                    && grille[ligne][colonne] === grille[ligne - 3][colonne - 3]) {
                return grille[ligne][colonne];
            }
        }
    }

    return 0;
}

 








function checkVictoire() {
    //Balayage horizontal _
    
    for (var colonne = 0; colonne <= 3; colonne++) {
        for (var ligne = 5; ligne >= 0; ligne--) {
            if (grille[colonne][ligne] !== 0
                    && grille[colonne][ligne] === grille[colonne + 1][ligne]
                    && grille[colonne][ligne] === grille[colonne + 2][ligne]
                    && grille[colonne][ligne] === grille[colonne + 3][ligne]) {
                return grille[colonne][ligne];
            }
        }
    }

    // Balayage verticale |
    for (colonne = 0; colonne <= 6; colonne++) {
        for (ligne = 5; ligne >= 3; ligne--) {
            if (grille[colonne][ligne] !== 0
                    && grille[colonne][ligne] === grille[colonne][ligne - 1]
                    && grille[colonne][ligne] === grille[colonne][ligne - 2]
                    && grille[colonne][ligne] === grille[colonne][ligne - 3]) {
                return grille[colonne][ligne];
            }
        }
    }

    // Balayage diagonale /
    for (colonne = 0; colonne <= 3; colonne++) {
        for (ligne = 5; ligne >= 3; ligne--) {
            if (grille[colonne][ligne] !== 0
                    && grille[colonne][ligne] === grille[colonne + 1][ligne - 1]
                    && grille[colonne][ligne] === grille[colonne + 2][ligne - 2]
                    && grille[colonne][ligne] === grille[colonne + 3][ligne - 3]) {
                return grille[colonne][ligne];
            }
        }
    }

    // Balayage diagonale \
    for (colonne = 6; colonne >= 3; colonne--) {
        for (ligne = 5; ligne >= 3; ligne--) {
            if (grille[colonne][ligne] !== 0
                    && grille[colonne][ligne] === grille[colonne - 1][ligne - 1]
                    && grille[colonne][ligne] === grille[colonne - 2][ligne - 2]
                    && grille[colonne][ligne] === grille[colonne - 3][ligne - 3]) {
                return grille[colonne][ligne];
            }
        }
    }
    return 0;
}