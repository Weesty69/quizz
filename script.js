const quizz = [
    {
        question: "En quelle année est née Michael Jackson ?",
        reponses: [
            {choix: "1984", correct: false},
            {choix: "1958", correct: true},
            {choix: "1942", correct: false},
            {choix: "1964", correct: false},
        ]
    },
    {
        question: "En quelle année perd-t-il la vie ?",
        reponses: [
            {choix: "2007", correct: false},
            {choix: "2006", correct: false},
            {choix: "1789", correct: false},
            {choix: "2009", correct: true},
        ]
    },
    {
        question: "Qui est nommé le roi de la pop ?",
        reponses: [
            {choix: "Michael Jackson", correct: true},
            {choix: "MJ", correct: true},
            {choix: "Michael", correct: true},
            {choix: "Jackson", correct: true},
        ]
    },
    {
        question: "Quel titre n'est pas de MJ ?",
        reponses: [
            {choix: "Scarface", correct: true},
            {choix: "Billie Jean", correct: false},
            {choix: "Smooth Criminal", correct: false},
            {choix: "Beat it", correct: false},
        ]
    },
    {
        question: "Combien d'enfant a MJ ?",
        reponses: [
            {choix: "2", correct: false},
            {choix: "9", correct: false},
            {choix: "0", correct: false},
            {choix: "3", correct: true},
        ]
    },
];

var choix = document.querySelectorAll('.choix');

function commencer(){ //Lancement du quizz.
    cacher();
    questionSuivante();
};
document.getElementById("jouer").addEventListener("click", commencer);

var jeu = document.getElementById("jeu");

function cacher(){ //Transition entre le menu principale et la première question.
    document.getElementById("commencer").classList.add("cacher");
    jeu.classList.remove("cacher");
};

/*Fonction vérifiant si la réponse sélectionnée est la bonne.
Vérifie si l'attribut "data-correct" contient la valeur "true".
Ajoute un point au score si c'est la bonne réponse.
Change la couleur du score actuel en fonction du choix.
*/
function check(e){
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    if(correct){
        p+=100;
        document.getElementById("actualScore").style.color= "green"
    }else{
        document.getElementById("actualScore").style.color= "red"
    }
};choix.forEach(button=>button.addEventListener("click", check));

/*Affiche la question suivante.
-Change de question en rajoutant 1 à la variable "q".
-La boucle for change les choix de réponse en fonction de la question.
-La boucle if à l'interieur de la boucle for joute l'attribut "data-true" au bouton de la bonne réponse.
*/

let q = 0; //Variable des index des questions.

function changeReponse(){ //Ajoute le texte des reponses correspondant à leur question dans les boutons.
    for(i=0;i<4;i++){
        let choisir = document.getElementById("choix" + [i]);
        choisir.innerHTML = quizz[q].reponses[i].choix;
        if(quizz[q].reponses[i].correct){
            choisir.dataset.correct = quizz[q].reponses[i].correct;
        };
    };
};


let p = 0; //Variable pour compter les points.
var couleur = document.getElementById("score");

function questionSuivante(){ 
    choix.forEach(button=>button.removeAttribute('data-correct'));
    if(q<quizz.length){
        document.getElementById("question").innerHTML = quizz[q].question;
        changeReponse();
        document.getElementById("actualScore").innerHTML = "Points: " + p
        q++;
    }else{
        point();
        if(p>300){
            couleur.style.backgroundColor="green"
        }else if(p==300){
            couleur.style.backgroundColor="orange"
        }else{
            couleur.style.backgroundColor="red"
        }
    };
};choix.forEach(b=>b.addEventListener("click", questionSuivante));

var message = document.getElementById("message");

function point(){ //Affiche le score finale.
    jeu.classList.add("cacher");
    document.getElementById("final").classList.remove("cacher");
    let scoreFinal = document.createTextNode(p + "/500");
    let score = document.getElementById("score");
    score.appendChild(scoreFinal);
    if(p==500){
        message.innerHTML = "Vous etes un connaisseur !";
    }else if(p==400){
        message.innerHTML = "Presque à la perfection";
    }else if(p==300){
        message.innerHTML = "Oui ça peut passer mais moyen";
    }else if(p==200){
        message.innerHTML = "Un peu d'effort sérieux";
    }else if(p==100){
        message.innerHTML = "T'a eu bon qu'à la question où toutes les réponses étaient vraies";
    };
};