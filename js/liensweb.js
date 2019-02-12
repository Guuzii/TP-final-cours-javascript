/* 
Activité 3
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [
    /*{
        titre: "So Foot",
        url: "http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        auteur: "annie.zette"
    }*/
];

// TODO Activité 1 :
// compléter ce fichier pour ajouter (afficher) les liens à la page web.

// TODO Activité 2 : 
// compléter ce fichier pour permettre à l'utilisateur d'ajouter des liens à la page.

// TODO Activité 3 : 
// compléter ce fichier pour connecter l’application au serveur pour récupérer les derniers liens publiés et ajouter un nouveau lien.
		// API récup des liens : https://oc-jswebsrv.herokuapp.com/api/liens
		// renvoie les derniers liens ajoutés sous forme de tableau JSON.
		// API ajout de lien : https://oc-jswebsrv.herokuapp.com/api/lien
		// attend un objet JSON représentant un lien.

/*
	ACTIVITE 1 - Affichage des liens ---------------------------------------------------------------------------------------------------------------
	------------------------------------------------------------------------------------------------------------------------------------------------
*/ 
var contenu = document.querySelector("#contenu");

function affichage() {
	// Activité 3 ----------
	ajaxGet("https://oc-jswebsrv.herokuapp.com/api/liens", function(reponse) {
		listeLiens = JSON.parse(reponse);
	});
	// Activité 3 ----------

	contenu.innerHTML = ""; // clear la div contenu

	for(i = 0; i < listeLiens.length; i++) {

		var lien = document.createElement("div"); // création d'une nouvelle balise <div>
		lien.classList.add("lien"); // définition d'une class="lien" pour notre nouvelle div

		var titreElt = document.createElement("a"); // création d'une nouvelle balise <a> qui contiendra le titre
		titreElt.style.textDecoration = "none"; // définition de différents attributs style
		titreElt.style.color = "#428bca";
		titreElt.style.fontWeight = "bold";
		titreElt.style.fontSize = "1.2em";

		var p = document.createElement("p"); // création d'une nouvelle balise <p>

		var span = document.createElement("span"); // création d'une nouvelle balise <span>
		span.style.fontWeight = "bold";
	    
		titreElt.href = listeLiens[i].url; // insertion de l'url dans le href la balise <a> créé
		titreElt.textContent = listeLiens[i].titre; // insertion du titre en contenu textuel de la balise <a>

		p.appendChild(titreElt); // insertion de la balise <a> dans <p>
		p.appendChild(document.createTextNode(" " + listeLiens[i].url)); // insertion dans <p> d'une nouvelle text node contenant l'url

		span.appendChild(document.createTextNode("Ajouté par " + listeLiens[i].auteur)); // insertion dans <span> d'une nouvelle text node contenant auteur

		lien.appendChild(p); // insertion de <p> dans <div>
		lien.appendChild(span); // insertion de <span> dans <div>
		contenu.appendChild(lien); // insertion de la <div> dans la page
	}
}

/*
	ACTIVITE 2 - Ajout de liens --------------------------------------------------------------------------------------------------------------------
	------------------------------------------------------------------------------------------------------------------------------------------------
*/

function sauvegarde() { // fonction de sauvegarde d'un nouveau lien dans le tableau
	var nouveauLien = {
		titre: titreLien.value,
		url: urlLien.value,
		auteur: auteurLien.value
	}

	// Activité 3 ----------
	ajaxPost("https://oc-jswebsrv.herokuapp.com/api/lien", nouveauLien, function() {
		// Affichage du message de confirmation
		confirmation.textContent = " Le lien \"" + titreLien.value + "\" à bien été ajouté";
		document.querySelector("body").insertBefore(confirmation, div);

		// Effacement du message de confirmation aprés 5 sec
		setTimeout(function() {
			document.querySelector("body").removeChild(confirmation);
		}, 5000);
			
		affichage();
	}, true);
	// Activité 3 ----------
}

var div = document.createElement("div");
div.style.marginBottom = "20px";

var confirmation = document.createElement("h3");
confirmation.style.background = "#428bca";

var form = document.createElement("form");
form.id = "formulaire";
form.style.display = "flex";
form.addEventListener("submit", function(e) { // event de soumission du formulaire
	e.preventDefault();

	// Vérification du http:// ou https://
	if ((urlLien.value.indexOf("http://") === -1 && urlLien.value.indexOf("https://") === -1) && urlLien.value !== "") {
		urlLien.value = "http://" + urlLien.value;
		urlLien.href = "http://" + urlLien.value;
	}

	sauvegarde();

	// Vidage des champs de saisie
	auteurLien.value = "";
	titreLien.value = "";
	urlLien.value = "";

	document.querySelector("body").replaceChild(bouton, div); // replacement du bouton à la place du formulaire	
});	

var auteurLien = document.createElement("input");
auteurLien.name = "auteurLien";
auteurLien.type = "text";
auteurLien.required = "true";
auteurLien.placeholder = "Entrez votre Nom";
auteurLien.style.marginRight = "30px";
auteurLien.style.width = "180px";

var titreLien = document.createElement("input");
titreLien.name = "titreLien";
titreLien.type = "text";
titreLien.required = "true";
titreLien.placeholder = "Entrez le titre du lien";
titreLien.style.marginRight = "30px";
titreLien.style.width = "360px";

var urlLien = document.createElement("input");
urlLien.name = "urlLien";
urlLien.type = "text";
urlLien.required = "true";
urlLien.placeholder = "Entrez l'url du lien";
urlLien.style.marginRight = "30px";
urlLien.style.width = "360px";

var boutonValidation = document.createElement("input");
boutonValidation.type = "submit";
boutonValidation.value = "Ajouter";

form.appendChild(auteurLien);
form.appendChild(titreLien);
form.appendChild(urlLien);
form.appendChild(boutonValidation);
div.appendChild(form);

var bouton = document.createElement("button");
bouton.id = "afficheFormulaire";
bouton.textContent = "Ajouter un lien";
bouton.style.marginBottom = "20px";
bouton.addEventListener("click", function() { 
		document.querySelector("body").replaceChild(div, bouton); // remplace le bouton par le formulaire créé
});

document.querySelector("body").insertBefore(bouton, document.querySelector("#contenu")); // insertion du bouton avant la div contenu

affichage();