window.addEventListener("load", function () {

    let titulo = document.querySelector(`#portada-gen .titulo`);
    console.log(titulo.innerText);
    let portada = document.querySelector(`#portada-gen`);
    let artistas = document.querySelector(`#artistas h2`);
    let canciones = document.querySelector(`#canciones h2`);
    let playlist = document.querySelector(`#playlist h2`);
    let playlistDestacadas = document.querySelector(`#playlist`);
    let artistasGen = document.querySelector(`#artistas`);
    let cancionesDestacadas = document.querySelector(`#canciones`);
    let loadTracks = document.querySelector("#loadingTracks");
    let loadPlaylists = document.querySelector("#loadingPlaylists");
    let loadArtistas = document.querySelector("#loadingArtistas");

    let queryString = location.search;
    console.log(queryString);
    let queryStringObj = new URLSearchParams(queryString);
    console.log(queryStringObj);
    let generoSeleccionado = queryStringObj.get(`id`);
    console.log(generoSeleccionado);

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${generoSeleccionado}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let genero = data;
            console.log(genero);
            let nombreGenero = genero.name;
            let imagenGenero = genero.picture_xl;
            console.log(imagenGenero);
            titulo.innerText = `${nombreGenero}`;
            portada.style.backgroundImage = `url(${imagenGenero})`;
            artistas.innerText = `Artistas más escuchados en ${nombreGenero}`;
            canciones.innerText = `Lo más escuchado en ${nombreGenero}`;
            playlist.innerText = `Playlist relacionadas con ${nombreGenero}`;

            fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/${generoSeleccionado}/artists`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    loadArtistas.style.display = "none";
                    let artistasGenero = data.data;
                    for (let i = 0; i < 6; i++) {
                        let nombreArtista = artistasGenero[i].name;
                        let imagenArtista = artistasGenero[i].picture;
                        let artistaId = artistasGenero[i].id;
                        artistasGen.innerHTML += `
                <article>
                <figure><img src="${imagenArtista}" alt="${nombreArtista}"></figure>
                <div class="informacion">
                    <h3><a href="detail-artist.html?id=${artistaId}">${nombreArtista}</a></h3>
                    <p>${nombreArtista} es de los artistas más destacados de ${nombreGenero}, aportando gran valor al mismo y colaborando a su desarrollo.</p>
                </div>
            </article>
                `;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        })
        .catch(function (error) {
            console.log(error);
        })

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/${generoSeleccionado}/tracks`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let canciones = data.data;
            loadTracks.style.display = "none";

            for (let i = 0; i < 6; i++) {         
                let cover = canciones[i].album.cover_medium;
                let title = canciones[i].title;
                let idCancion = canciones[i].id;
                let preview = canciones[i].preview;
                let artist = canciones[i].artist.name;
                let artistId = canciones[i].artist.id;
                cancionesDestacadas.innerHTML += `
                    <article>
                    <div>
                <figure class="cancion"><img src="${cover}" alt="${title} - ${artist}">
                </figure>
                <div class="informacion">
                    <h3> <a href="detail-track.html?id=${idCancion}">${title}</a></h3>
                    <p><a href="detail-artist.html?id=${artistId}">${artist}</a></p>
                </div>
                </div>
                <audio id="audio" src="${preview}" controls></audio>
            </article>
                    `;
            }
            let cancionCont = document.querySelectorAll(`#canciones article`)
            let audio = document.querySelectorAll(`#audio`);
            for (let e = 0; e < cancionCont.length; e++) {
                let cancion = cancionCont[e];
                let tema = audio[e];
                cancion.addEventListener("mouseover", function () {
                    tema.style.display = "inline"
                })
                cancion.addEventListener("mouseout", function () {
                    tema.style.display = "none";
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        })

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/${generoSeleccionado}/playlists`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            loadPlaylists.style.display = "none";
            let playlists = data.data;
            for (let i = 0; i < 6; i++) {
                let titulo = playlists[i].title;
                let playlistId = playlists[i].id;
                let fotoPlaylist = playlists[i].picture_big;
                let nombreUsuario = playlists[i].user.name;

                playlistDestacadas.innerHTML += `
                        <article>
                        <img src="${fotoPlaylist}" alt="${titulo}">
                        <div class="informacion">
                            <h3><a href="playlist.html?id=${playlistId}">${titulo}</a></h3>
                            <p>De: ${nombreUsuario}</p>
                        </div>
                    </article>
                        `
            }
        })
        .catch(function (error) {
            console.log(error);
        })

})

//codigo anterior
//             fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artistaId}/top`)
//                 .then(function (response) {
//                     return response.json();
//                 })
//                 .then(function (data) {
//                     let canciones = data.data;
//                     let cover = canciones[0].album.cover_medium;
//                     let title = canciones[0].title;
//                     let idCancion = canciones[0].id;
//                     let preview = canciones[0].preview;
//                     let contributors = canciones[0].contributors;

//                     if (contributors.length > 1) {
//                         let coverOtra = canciones[1].album.cover_medium;
//                         let titleOtra = canciones[1].title;
//                         let idCancionOtra = canciones[1].id;
//                         let previewOtra = canciones[1].preview;
//                         cancionesDestacadas.innerHTML += `
//         <article>
//         <div>
//     <figure class="cancion"><img src="${coverOtra}" alt="${titleOtra} - ${nombreArtista}">
//     </figure>
//     <div class="informacion">
//         <h3> <a href="detail-track.html?id=${idCancionOtra}">${titleOtra}</a></h3>
//         <p><a href="detail-artist.html?id=${artistaId}">${nombreArtista} y otros</a></p>
//     </div>
//     </div>
//     <audio id="audio" src="${previewOtra}" controls></audio>
// </article>
//         `;
//                     } else {

//                         cancionesDestacadas.innerHTML += `
//         <article>
//         <div>
//     <figure class="cancion"><img src="${cover}" alt="${title} - ${nombreArtista}">
//     </figure>
//     <div class="informacion">
//         <h3> <a href="detail-track.html?id=${idCancion}">${title}</a></h3>
//         <p><a href="detail-artist.html?id=${artistaId}">${nombreArtista}</a></p>
//     </div>
//     </div>
//     <audio id="audio" src="${preview}" controls></audio>
// </article>
//         `
//                     }
//                     let cancionCont = document.querySelectorAll(`#canciones article`)
//                     let audio = document.querySelectorAll(`#audio`);
//                     for (let e = 0; e < cancionCont.length; e++) {
//                         let cancion = cancionCont[e];
//                         let tema = audio[e];
//                         cancion.addEventListener("mouseover", function () {
//                             tema.style.display = "inline"
//                         })
//                         cancion.addEventListener("mouseout", function () {
//                             tema.style.display = "none";
//                         })
//                     }
//                 })
//                 .catch(function (error) {
//                     console.log(error);
//                 })
// fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artistaUno}/playlists`)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         let playlists = data.data;

//         for (let i = 0; i < 6; i++) {
//             let titulo = playlists[i].title;
//             let playlistId = playlists[i].id;
//             let fotoPlaylist = playlists[i].picture_big;
//             let nombreUsuario = playlists[i].user.name;

//             playlistDestacadas.innerHTML += `
//     <article>
//     <img src="${fotoPlaylist}" alt="${titulo}">
//     <div class="informacion">
//         <h3><a href="playlist.html?id=${playlistId}">${titulo}</a></h3>
//         <p>De: ${nombreUsuario} - ${nombreGenero}</p>
//     </div>
// </article>
//     `
//         }
//     })
//     .catch(function (error) {
//         console.log(error);
//     })