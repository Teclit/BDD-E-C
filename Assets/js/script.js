var albumBD = [];
var articleApanier = [];

/****************Nav Button Class Active *****************/
var accueilNav = document.querySelector("#accueil");
var listNav = document.querySelector("#liste");
var propoNav = document.querySelector("#propos");
var pnierNav = document.querySelector("#pnier");
var seconNav = document.querySelector("#secon");

// console.log(accueilNav);
// console.log(listNav);



/**********************************************/

//INput: none
//OutPut: new Map=> objet
function init() {
    var card = {};
    for (let value of albums.values()){
        var titreMp = value.titre;
        var numeroMp = value.numero;
        var serieMp = value.idSerie;
        var auteurMp = value.idAuteur; 
        var prixMp = value.prix;
        var imageUrlMp = value.imageUrl;
    // recupere auteur nom
        for (let [auteurId, auteurNom] of auteurs) {
            if(auteurMp == auteurId ) {
                auteurMp = auteurNom.nom;
            }
        }
    // recupere serie nom
        for (var [serieId, serieNom] of series) {
            if(serieMp == serieId) {
                serieMp = serieNom.nom;
            }
        }

        card = {
            titre: titreMp,
            numero:  numeroMp,
            serie: serieMp,
            auteur:  auteurMp, 
            prix : prixMp,
            imageUrl :  imageUrlMp
        }
        albumBD.push(card);
        //console.log(card);
        bdList(card);
    }
    console.log(albumBD);
}
init() 


//INPUT:  objet BD series card
//OUTPUT: Affichage BDcard 
function bdList(bdserie) {
    var divCardList =document.getElementById("app");
    var divCol = document.createElement('div');
        divCol.className = "col";
        //divCol.setAttribute("data-id", bdserie.numero); 
        divCol.innerHTML = `
            <div class="card">
                <div class="card-body text-center">
                    <img src="Assets/albumsMini/${bdserie.serie}-${bdserie.numero}-${bdserie.titre}.jpg"
                    class="mb-1" alt="${bdserie.titre}"  style="height: 13rem;">
                    <h5 class="card-title">${bdserie.titre}</h5>
                    <p> ${bdserie.auteur}</p>
                    <p> ${bdserie.serie}</p>
                    <h5>${bdserie.prix}€</h5>
                    <a href="#" class="btn btn-lg" id="voirBtn"> Voir  </a>
                    <a href="#" class="btn btn-danger " id="ajouterBtn"> Ajouter</a>
                </div>
            </div>
        `;
        divCardList.append(divCol);        
        var ajouteBtn = divCol.querySelector('#ajouterBtn');
        var voirBtn = divCol.querySelector('#voirBtn');
        
        ajouteBtn.addEventListener('click',  this.ajouteArticle.bind(this));
        voirBtn.addEventListener('click',   this.voirArticle.bind(this));
}


//Ajouter un article au panier et récuperer les informations
function ajouteArticle() {
    var bdAjouteInfos = event.target.parentElement;
    //var imageBd = bdAjouteInfos.children[0];
    var titreBd = bdAjouteInfos.children[1];
    var auteurBd = bdAjouteInfos.children[2];
    var serieBd = bdAjouteInfos.children[3];
    var prixBd = bdAjouteInfos.children[4];
    
    var bdAjouteAPanier = {
        //image: imageBd.innerHTML,
        titre: titreBd.innerHTML, 
        auteur: auteurBd.innerHTML, 
        serie: serieBd.innerHTML,
      //  numero: numeroBd.innerHTML, 
        prix: prixBd.innerHTML
    }
    articleApanier.push(bdAjouteAPanier);
    panierAjoute(articleApanier);
}



//Voir un Article en detail
function voirArticle() { 
     //console.log(event.target.parentElement);
    var bdAvoirInfo = event.target.parentElement;
    var imageBd =  bdAvoirInfo.children[0].innerHTML;
    var titreBd =  bdAvoirInfo.children[1];
    var auteurBd =  bdAvoirInfo.children[2];
    var serieBd =  bdAvoirInfo.children[3];
    var numeroBd =  bdAvoirInfo.children[4];
    var prixBd =  bdAvoirInfo.children[5];
    console.log(bdAvoirInfo);
    
    var bdVoir = {
        image: imageBd.innerHTML,
        titre: titreBd.innerHTML, 
        auteur: auteurBd.innerHTML, 
        serie: serieBd.innerHTML,
        numero: numeroBd.innerHTML, 
        prix: prixBd.innerHTML
    }
    var voirArticle = document.getElementById("voir");
    console.log(voirArticle)
}

// VARIABLE GLOBAL DU PANIER
var nbArticle= document.getElementById("panierArticle");
var panierNB = document.getElementById("montantTotal");
var totalMontant = 0;

//Afficher Articler Ajouter au Panier
function panierAjoute(articleTab) {
    var nbtotalPrix = [];
    nbArticle.innerHTML = articleTab.length;

    var panier = document.getElementById("modalPnierItems");
    var itempanier = document.createElement("tr");
    for(let elem of articleTab){
        nbtotalPrix.push(parseFloat(elem.prix));
        // console.log(parseFloat(elem.prix));
            itempanier.innerHTML =`
                <td>${elem.titre}</td>
                <td>${elem.auteur}</td>
                <td>${elem.serie}</td>
                <td>${elem.prix}</td>
                <td><button class="btn btn-sm btn-lg" id="voirPanier">voir</button></td>
                <td><button class="btn btn-sm  btn-danger" id="retirerPanier">Rétirer</button></td>
                `;   

            var voirModal = itempanier.querySelector('#voirPanier');
            var retirerModal = itempanier.querySelector('#retirerPanier');
            // console.log(voirModal);
            // console.log(retirerModal);
            retirerModal.addEventListener('click',  this.retirerArticle.bind(this));
            voirModal.addEventListener('click',   this.voirArticle.bind(this));

        panier.append(itempanier);
        montantTotal(nbtotalPrix);
    }
}

//Montant Total Article Ajouter au Panier
function montantTotal(prixTableau) {
    var totalM = 0;
    for(let item of prixTableau){
        totalM += item;
    }
    totalMontant = totalM;
    panierNB.innerHTML = totalM.toFixed(2);
    
}

//SUPPRIME ARTICLE DE PANIER
function retirerArticle(){
    var panierArticle = event.target.parentElement.parentElement;
    var prixSupprimer = parseFloat(panierArticle.children[3].innerHTML);
    var sommeTotal = totalMontant - prixSupprimer ;
   // totalMontant = sommeTotal;
    panierNB.innerHTML = sommeTotal.toFixed(2);

    console.log(prixSupprimer);
    while (panierArticle.hasChildNodes()) {
        panierArticle.removeChild(panierArticle.firstChild);
    }
}

//Montant Total Article Ajouter au Panier Apres Rétirer Un Article
/****************************btn et btn ********************************/





