let iaTurn = false;
var tableauJeu = Array(6);
var winner = 0;
const difficulte = prompt("Choisissez votre difficulté : (1 = facile, 2 = moyen, 3 = difficile)");
var nbCoups;
switch(difficulte) {
    case "1":
        nbCoups = 1;
        break;
    case "2": 
        nbCoups = 5;
        break;
    case "3":
        nbCoups = 10;
        break;
    default:
        alert("Erreur dans le choix de la difficulté");
}


function afficherTable() {
    if(confirm('Voulez vous commencer ? (OK = oui, Annuler = non)')) {
        iaTurn = false;
    } else {
        iaTurn = true;
    }
    let b = document.body;
    let table = document.getElementById('tableJeu');

    for (i=0;i<=5;i++) {
        //Création de la table de jeu à l'écran
        let ligneJeu = document.createElement('tr');

        for (j=0;j<=6;j++) {
            let caseJeu = document.createElement('td');
            caseJeu.setAttribute("class", "case");
            caseJeu.addEventListener('click', jouer, false);
            let td = ligneJeu.appendChild(caseJeu);
            //Permet d'accéder aux coordonnées des cases cliquées
            td.dataset.column = j;
            td.dataset.ligne = i;
        }

        table.appendChild(ligneJeu);
    }

    //Création du board de jeu
    for (let i = 0; i<6;i++) {
        tableauJeu[i] = Array(7).fill(0);
    }
    //console.log(tableauJeu);
}

function fillTab(column, ligne, iaTurn) {
    var joueur;

    if (iaTurn) {
        joueur = 1;
    } else {
        joueur = 2;
    }

    let b = document.body;
    let table = document.getElementById('tableJeu');

    ligne = parseInt(ligne);
    column = parseInt(column);
    let trouve = false;
    var i = ligne;

    if (tableauJeu[ligne][column] == 0) {
        var ligneAdd = 0;
        while (!trouve) {
            for (var y = 0;y<=5;y++) {
                //Vérifie si le jeton doit être posé tout en bas de la grille
                if ((y == 5) && (!trouve) && (tableauJeu[y][column] == 0)) {
                    ligneAdd = 5;
                    trouve = true;
                }
                //Vérifie si le jeton doit être posé au dessus d'un autre
                else if(tableauJeu[y][column] != 0) {
                    ligneAdd = y-1;
                    y = 6;
                    trouve = true;
                }
            }
        }
        //console.log(tableauJeu);
    }else{
        while(tableauJeu[ligne][column] != 0){
            
            ligne --;
            ligneAdd = ligne;
        }
    }
    //console.log(tableauJeu);
    tableauJeu[ligneAdd][column] = joueur;  //Rempli le board avec les valeurs des joueurs
    fillRender(ligneAdd, column);   //Rempli la grille HTML avec le bon jeton aux bonnes coordonnées
}

function jouer() {
    if (iaTurn) {
        //Tour de l'ia de jouer
        var coordIa = iaPlay(iaTurn);
        fillTab(coordIa[1], coordIa[0], iaTurn);
    } else {
        //Tour du joueur 
        fillTab(this.dataset.column, this.dataset.ligne, iaTurn);
    }
    
}

function fillRender(ligneAdd, column) {
    let caseJeu = document.getElementById('tableJeu').rows[ligneAdd].cells[column];
    if (iaTurn) {
        caseJeu.style.backgroundColor = "yellow";
        iaTurn = false;
    }
    else if (!iaTurn) {
        caseJeu.style.backgroundColor = "red";
        iaTurn = true;
    }

    //Vérification de victoire
    isWon(iaTurn, ligneAdd, column);

    switch (winner) {
        case 1:
            alert('Yellow win');
            break;
        case 2:
            alert('Red win');
            break;
    }
}

//la constante difficulté sert à définir combien de coups l'IA doit voir à l'avance

function iaPlay(iaTurn) {  
    
    var ia = new iaTest(difficulte, 200);

    var recupe;
    var recupe1;
    var recupe2;
    var recupe3;

    recupe = ia.checkVictoire(tableauJeu);

    if (ia.difficulte == 1) {
        recupe1 = ia.heuristiqueFacile(tableauJeu);
    }

    if (ia.difficulte == 2) {
        recupe2 = ia.heuristiqueMoyen(tableauJeu, iaTurn);
        console.log(recupe2);
    }

    if (ia.difficulte == 3) {
        recupe3 = ia.heuristiqueMoyen(tableauJeu, iaTurn);
        console.log(recupe3);
    }

    if (recupe != 0){
        return recupe;
    }

    if (ia.difficulte == 1) {
        return recupe1;
    } else if (ia.difficulte == 2) {
        return recupe2;
    } else if (ia.difficulte == 3) {
        return recupe3;
    }
}

function isWon(iaTurn, ligne, column) {
    let comp;
    let count;
    let y = 0;
    let i = 0;
    if (iaTurn) {
        comp = 2;
    }
    else {
        comp = 1;
    }
    
    verifVerticale(iaTurn, ligne, column, comp);

    verifHorizontale(iaTurn, ligne, column, comp);

    verifDIagonale(iaTurn, ligne, column, comp);

    

}

function verifVerticale(iaTurn, ligne, column, comp) {
    count = 0;

    for (i = 0; i <= 5; i++) {
        count = (tableauJeu[i][column] == comp) ? count+1 : 0;

        if (count == 4) {
            winner = comp; 
        }
    }

    return count;
}

function verifHorizontale(iaTurn, ligne, column, comp) {
    count = 0;

    for (i = 0; i <= 6; i++) {
        count = (tableauJeu[ligne][i] == comp) ? count+1 : 0;

        if (count == 4) {
            winner = comp;
        }
    }

    return count;
}

function verifDIagonale(iaTurn, ligne, column, comp) {
    count = 0;

    //Vérifie les victoires en diag haute
    y = column;
    let fait;
    for (i = ligne; i >= 0; i--) {
        fait = false;
        while (!fait) {
            count = (tableauJeu[i][y] == comp) ? count+1 : 0;
            
            if (count == 4) {
                winner = comp;
            }
            
            fait = true;
        }
        y++;
    }

    count = 0;
    y = column;
    for (i = ligne; i <= 5; i++) {
        fait = false;
        while (!fait) {
            count = (tableauJeu[i][y] == comp) ? count+1 : 0;
        
            if (count == 4) {
                winner = comp;
            }
            
            fait = true;
        }
        y--;
    }

    count = 0;
    y = column;
    for (i = ligne; i >= 0; i--) {
        fait = false;
        while (!fait) {
            count = (tableauJeu[i][y] == comp) ? count+1 : 0;

            if (count == 4) {
                winner = comp;
            }
            
            fait = true;
        }
        y--;
    }

    count = 0;
    y = column;
    for (i = ligne; i <= 5; i++) {
        fait = false;
        while (!fait) {
            count = (tableauJeu[i][y] == comp) ? count+1 : 0;
            
            if (count == 4) {
                winner = comp;
            }
            
            fait = true;
        }
        y++;
    }

    return count;
}

afficherTable();