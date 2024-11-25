const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const media =params.get('media');


//Ao carregar executa as funções de buscar os dados
document.addEventListener('DOMContentLoaded', async () => {
    await getMovie();
});

async function getMovie() {
    let movie;
    let baseUrl = 'https://api.themoviedb.org/3/'; 
    await fetch(`${baseUrl}${media}/${id}?language=pt-br`,options)
        .then(res=> res.json())
        .then(res => movie=res)
        .catch(err => console.log('Erro ao carregar o filme', err));
        //console.log(movie);

        //Poster
        document.querySelector('.poster').src=`https://image.tmdb.org/t/p/original/${movie.poster_path}`;

        //Detalhes do Filme
        let detalhes = document.getElementById('detalhes');
        detalhes.innerHTML = `<h1>${movie.title ?? movie.name}</h1>
        <h5 class='mb-4'>T<b>ítulo Original:</b> ${movie.original_title ?? movie.original_name}</h5>
        <p class='mb-3'>Data de Estreia: ${movie.release_date}</p>
        <p class='mb-3'>País de Origem: ${movie.origin_country}</p>
        <p class='mb-3'>Popularidade: ${movie.popularity.toFixed(1)}</p>
        <p class='mb-5'>Status: ${movie.status}</p>
        <p>${movie.overview}</p>`;

    //botão
    movie.genres.forEach(genre=> {
        detalhes.innerHTML +=`<button class='btn btn-sm btn-outline-light me-2'>${genre.name}</button>`
    })

}