// Khaled-Adel Tetbirt (20161653)

// Ce programme sert a imprimer une grille
// construite avec des "+", "-", et "|", et
// ou tous les elements d'un tableau donne
// se situent.

var fs = require("fs");

var readFile = function (path) {
 return fs.readFileSync(path).toString();
};

var writeFile = function (path, texte) {
 fs.writeFileSync(path, texte);
};

var print = function (x) {
 console.log(x);
};

// La fonction writeOnFile sert a ecrire
// sur un fichier qui existe deja.

var writeOnFile = function (existingPath, texte) {
	writeFile(existingPath, readFile(existingPath) + texte)
};

// La fonction inverserMatrice s'occupe de transposer une matrice
// afin de plus tard pouvoir comparer les longueurs de chaque
// element d'une colonne.

function inverserMatrice(tableau) {
  return tableau.reduce((prev, next) => next.map((x, i) =>
    (prev[i] || []).concat(next[i])
  ), []);
};

// La fonction plusGrand s'occupe de trouver la longueur
// maximale des elements de chaque rangees d'une matrice 
// donnee.

var plusGrand = function (tableau) {
    var max = Array(tableau[0].length).fill(0);
    
    // Comme en realite on veut les valeurs maximales
    // des elements des colonnes et non des rangees,
    // on fait appel a la fonction inverserMatrice.
    
    var tab1 = inverserMatrice(tableau);
    tab1.forEach(function(x,i) {
        tempo = "";
        x.forEach(function(y) {
            if (String(y).length > String(tempo).length) {
                tempo = String(y);
            }
        })
        max[i] = max[i] + tempo.length
    })
    
    // On retourne un array qui possede autant d'elements
    // qu'il n'y avait de colonnes dans le tableau initial.
    
    return(max);
};

// textDispenser est une fonction simple qui genere
// un string d'autant d'iterations du caractere que l'on veut.

var textDispenser = function (text, number) {
    return(Array(number).fill(text).join(""));
};

// grilleMat s'occupe d'imprimer le resultat final.

var grilleMat = function (tableau) {
    var info = plusGrand(tableau);
    var resultat = "";
    tableau.forEach(function(x,i) {
        
        // La premiere boucle forEach sert a print les 
        // contours en "+" et "-".
        
        x.forEach(function(y,n) {
            if(n < tableau[0].length - 1) {
                resultat = resultat + "+" + textDispenser("-",info[n]);
            }
            else {
                resultat = resultat + "+" + textDispenser("-",info[n]) + "+";
            }
        })
        resultat = resultat + "\n";
        
        // La deuxieme boucle forEach sert a print les 
        // elements du tableau et leurs espaces et "|" correspondants.
        
        x.forEach(function(y,n) {
            if(n < tableau[0].length - 1) {
                resultat = resultat + "|" + textDispenser(" ", (info[n] - String(y).length)) + y;
            }
            else {
                resultat = resultat + "|" + textDispenser(" ", (info[n] - String(y).length)) + y + "|";
            }
        })
        resultat = resultat + "\n"
    })
    
    // Impression de la derniere ligne de contour.
    
    info.forEach(function(x,i) {
        if(i < info.length - 1) {
                resultat = resultat + "+" + textDispenser("-",info[i]);
            }
            else {
                resultat = resultat + "+" + textDispenser("-",info[i]) + "+";
            }
    })
    return(resultat);
}

var assert = function (x) {
    console.assert(x);
}

var testUnitaires = function() {
    assert( inverserMatrice([[1,2],[3,4]])[0][1] == 3 );
    assert( inverserMatrice([[1,2],[3,4]])[1][0] == 2 );
    assert( inverserMatrice([[1,2],[3,4]])[0][0] == 1 );
    
    assert( plusGrand([["oranges", 5], ["kiwis", 1000]])[0] = 7);
    assert( plusGrand([["oranges", 5], ["kiwis", 1000]])[1] = 4);
    assert( plusGrand([["oranges", 5], ["kiwis", 1000], ["dinosaurs", 1000]])[0] = 9);
    
    assert( textDispenser("-", 3) == "---");
    assert( textDispenser("+", 5) == "+++++");
    assert( textDispenser(" ", 3) == "   ");
    
    assert(grilleMat([["oranges", 5], ["kiwis", 1000]]) == "+-------+----+\n|oranges|" +   
           "   5|\n+-------+----+\n|  kiwis|1000|\n+-------+----+");
           
    assert(grilleMat([["oranges", 5], ["kiwis", 1000], ["kiwis", 1000]]) == "+-------+----+\n|oranges|" +   
           "   5|\n+-------+----+\n|  kiwis|1000|\n+-------+----+\n|  kiwis|1000|\n+-------+----+");
    
    assert(grilleMat([["oranges", 5]]) == "+-------+-+\n|oranges|5|\n+-------+-+");
}

testUnitaires();

writeFile("texte.txt" ,(grilleMat([["oranges", 5], ["kiwis", 1000], ["Un ou deux kiwis", 1000]])));