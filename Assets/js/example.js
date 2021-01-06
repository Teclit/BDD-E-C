//SUPPRIME ARTICLE DE PANIER
function retirerArticle(){
    var panierArticle = event.target.parentElement.parentElement;
    prixSupprimer = panierArticle.children[0];
    console.log(prixSupprimer);
   // var sommeTotal = totalMontant - prixSupprimer ;
   // totalMontant = sommeTotal;
   // panierNB.innerHTML = sommeTotal.toFixed(2);

    // while (panierArticle.hasChildNodes()) {
    //     panierArticle.removeChild(panierArticle.firstChild);
    // }
}

//****************************** */
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
                <td>${elem.serie}</td>
                <td>${elem.prix}</td>
                <td><button class="btn btn-xs tbg-light" id="voirPanier">voir</button></td>
                <td>   <button class="btn btn-xs  bg-danger" id="retirerPanier">Rétirer</button>
                </td>
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
/************************** */
function panierAfficheLs(value, key){
    console.log(value);
    console.log(key);
}
/****************** */
// Ajoute function
function ajouteArticle() {
    var bdAjouteInfos = event.target.parentElement;
    console.log(bdAjouteInfos);
    var dataAttribute = bdAjouteInfos.getAttribute('data-id');
    console.log(dataAttribute);

    var titreBd = bdAjouteInfos.children[1];
    var auteurBd = bdAjouteInfos.children[2];
    var serieBd = bdAjouteInfos.children[3];
    var prixBd = bdAjouteInfos.children[4];
    
    var bdAjouteAPanier = {
    
        titre: titreBd.innerHTML, 
        auteur: auteurBd.innerHTML, 
        serie: serieBd.innerHTML,
        prix: prixBd.innerHTML
    }

    panierLocaleStorage(bdAjouteAPanier);
}