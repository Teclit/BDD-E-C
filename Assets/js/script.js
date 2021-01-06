//Tableau BD List et Panier
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
    for (let[key, value] of albums){
        var bdID = key;
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
            ID: bdID,
            titre: titreMp,
            numero:  numeroMp,
            serie: serieMp,
            auteur:  auteurMp, 
            prix : prixMp,
            imageUrl :  imageUrlMp
        }
        albumBD.push(card);
        bdList(card);
    }
   // console.log(albumBD);
}
init() 


//INPUT:  objet BD series card
//OUTPUT: Affichage BDcard 
function bdList(bdserie) {
    var divCardList =document.getElementById("app");
    var divCol = document.createElement('div');
        divCol.className = "col"; 
        divCol.innerHTML = `
            <div class="card">
                <div class="card-body text-center" data-id="${bdserie.ID}">
                    <img src="Assets/albums/${bdserie.serie}-${bdserie.numero}-${bdserie.titre}.jpg"
                    alt="${bdserie.titre}"  style="height:9rem; width:100%">
                    <h6>${bdserie.titre}</h6>
                    <p> ${bdserie.auteur}</p>
                    <p> ${bdserie.serie}</p>
                    <h6>${bdserie.prix}€</h6>
                    <a href="#voir" class="btn btn-xs tbg-light" id="voirBtn"> Voir  </a>
                    <a href="#" class="btn btn-xs bg-danger " id="ajouterBtn"> Ajouter </a>
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
    //console.log(bdAjouteInfos);
    var dataID = bdAjouteInfos.getAttribute('data-id');
    //console.log(dataID);
    bdLocaleStorage(dataID);
}


function bdLocaleStorage(tab) {
    articleApanier.push(tab);
   // console.log(articleApanier);
    localStorage.setItem (`panier`,JSON.stringify(articleApanier));
    panierAjoute();
    
}

//Voir un Article en detail
function voirArticle() { 
    var divList = document.getElementById("listbd");
    var artimg = document.getElementById("voir");
    divList.style.display ="none";
    artimg.style.display ="block";

    var voirImgDV = document.getElementById("voirImg");
    var voirInfoDV = document.getElementById("voirInfos");
    // console.log(voirImgDV);
    // console.log(voirInfoDV);

    var bdAjouteInfos = event.target.parentElement;
    var dataID = bdAjouteInfos.getAttribute('data-id');
    //console.log(dataID);
    //console.log(bdAjouteInfos);

    for(let valeur of albumBD.values()){
        if(dataID === valeur.ID){
            var idAff = valeur.ID;
            var titreAff = valeur.titre;            
            var numAff = valeur.numero;
            var serieAff = valeur.serie;
            var auteurAff = valeur.auteur;
            var prixAff = valeur.prix;
        }   
    }
    voirImgDV.innerHTML =`
                    <img src="Assets/albums/${serieAff}-${numAff}-${titreAff}.jpg"
                    class="img-thumbnail" alt=${titreAff}" style="max-width:70%">
            `;

    voirInfoDV.innerHTML =`
                <div class="card">
                    <div class="card-body text-center" data-id=${idAff}>
                        <h5 class="card-title text-center">${titreAff}</h5>
                        <p class="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Vestibulum rhoncus est pellentesque elit. Odio eu
                        feugiat pretium nibh ipsum consequat nisl. Non nisi est 
                        sit amet facilisis. Euismod quis viverra nibh cras pulvinar 
                        mattis nunc sed. Pretium fusce id velit ut tortor pretium viverra 
                        suspendisse potenti. Urna duis convallis convallis tellus 
                        id interdum velit laoreet. Nam at lectus urna duis convallis convallis.
                        Nulla malesuada pellentesque elit eget gravida cum sociis natoque.
                        Habitasse platea dictumst vestibulum rhoncus est pellentesque elit 
                        ullamcorper. Mauris nunc congue nisi vitae suscipit tellus. 
                        Semper quis lectus nulla at volutpat diam ut venenatis. Sed 
                        sed risus pretium quam. Dignissim diam quis enim lobortis 
                        scelerisque. Urna nunc id cursus metus. Magna eget est lorem dolor sit.
                        Tortor at auctor urna nunc id cursus. Sem nulla pharetraipsum
                        diam sit. Integer enim neque volutpat ac tincidunt vitae.
                        </p>
                        <br>
                        <ul>
                            <li><strong>Par</strong>: ${auteurAff}</li>
                            <li><strong>Serie</strong>: ${serieAff}</li>
                            <li><strong>Prix</strong>: ${prixAff}€</li>
                            
                        </ul>
                        <button class="btn btn-xs bg-danger" id="ajoutIfoBtn">Ajouter</button>
                    </div> 
                </div>
                `;
                var infovoirBtn = document.getElementById("ajoutIfoBtn");
                infovoirBtn.addEventListener('click',  this.ajouteArticle.bind(this));

}



// VARIABLE GLOBAL DU PANIER
var nbArticle= document.getElementById("panierArticle");
var panierTotalMontant= document.getElementById("montantTotal");
var totalMontant = 0;

//Afficher Articler Ajouter au Panier //Montant Total Article Ajouter au Panier
function panierAjoute() {
    var panierBD =JSON.parse(localStorage.getItem('panier'));
    nbArticle.innerHTML = panierBD.length;
   // console.log(panierBD);

    for(let valeur of albumBD.values()){
        for(let cle of panierBD){
            if(cle === valeur.ID) {
                var panierRow = valeur;
                
            }
        }
    } 
    var panier = document.getElementById("modalPnierItems");
    var itempanier = document.createElement("tr");
        itempanier.setAttribute("data-id", panierRow.ID);
        itempanier.innerHTML =`
            <td>${panierRow.titre}</td>
            <td>${panierRow.serie}</td>
            <td>${panierRow.prix}€</td>
            <td data-id=${panierRow.ID}><button class="btn btn-xs tbg-light" id="voirPanier"data-bs-dismiss="modal" >Voir</button></td>
            <td data-id=${panierRow.ID}><button class="btn btn-xs  bg-danger" id="retirerPanier">Retirer</button>
            </td>
            `;   

        var voirModal = itempanier.querySelector('#voirPanier');
        var retirerModal = itempanier.querySelector('#retirerPanier');
        
        totalMontant += parseFloat(panierRow.prix);
        panierTotalMontant.innerHTML = totalMontant.toFixed(2);
        retirerModal.addEventListener('click',  this.retirerArticle.bind(this));
        voirModal.addEventListener('click',   this.voirArticle.bind(this));
        panier.append(itempanier);
}

//SUPPRIME ARTICLE DE PANIER 
function retirerArticle(){
    var articleRetirer = event.target.parentElement.parentElement;
    //console.log(articleRetirer);
    var removeId = articleRetirer.getAttribute('data-id');
    console.log(removeId);
    console.log(articleApanier);

    while (articleRetirer.hasChildNodes()) {
        articleRetirer.removeChild(articleRetirer.firstChild);
        for(let i=0; i<articleApanier.length; i++) {
            if( removeId === articleApanier[i]){
                articleApanier.splice(i);
                nbArticle.innerHTML = articleApanier.length;
            }
        }
    }

    for(let valeur of albumBD.values()){
        if(valeur.ID === removeId){
            totalMontant -= parseFloat(valeur.prix);
            panierTotalMontant.innerHTML = totalMontant.toFixed(2);
            console.log(valeur);
        }
    }
}






