window.addEventListener("load", function(){

    let generos = document.querySelector(".generos");

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre`)
    .then(function(response){
        return response.json();
    })
    .then (function(data){
        let genres = data.data;
        for(let i = 1; i < genres.length; i++){
            let nombreGenero = genres[i].name;
            let imagenGenero = genres[i].picture_xl;
            generos.innerHTML += `
            <article id= "deezerGen" style="background-image: url(${imagenGenero});">
            <h2><a href="detail-genres.html">${nombreGenero}</a></h2>
            </article>
            `
        }
    })
    .catch (function(error){
        console.log(error);
    })



})