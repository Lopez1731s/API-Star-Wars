'use strict'

// API: https://swapi.dev/

const API_URL_FILMS = "https://swapi.dev/api/films";
const API_URL_SEARCH = "https://swapi.dev/api/films/?search=";
const cardContainer = document.querySelector("#card-container");
const modalContainer = document.querySelector("#modal-container");

const cardContainerPeople = document.querySelector("#card-container-people");
const cardContainerStarships = document.querySelector("#card-container-starships");
const cardContainerPlanets = document.querySelector("#card-container-planets");

const form = document.querySelector("#formulario");
const movieName = document.querySelector("#movie-name");

form.addEventListener('submit', function name(param) {
    var name = movieName.value;

    console.log(name)
});


getMovies();
getMoviesbyName();
getPeople();

async function getMovies(){
    const res = await fetch(API_URL_FILMS);
    const resData = await res.json();

    displayMovies(resData);
}

async function getMoviesbyName(title){
    const res = await fetch(API_URL_SEARCH + title);
    const resDataMovies = await res.json();

    displayMoviesByName(resDataMovies);    
}

async function getPeople(URL) {
    const res = await fetch(URL);
    const resDataPeople = await res.json();

    displayPeople(resDataPeople);
}

async function getStarships(URL_STARSHIPS) {
    const res = await fetch(URL_STARSHIPS);
    const resDataStarships = await res.json();

    displayStarships(resDataStarships);
    
}

async function getPlanets(URL_PLANETS) {
    const res = await fetch(URL_PLANETS);
    const resDataStarships = await res.json();

    displayPlanets(resDataStarships);
}


function displayMovies(resData){
    for (let i = 0; i < resData.results.length; i++) {
        const item = resData.results[i];

        const title = item.title;
        const director = item.director;
        const release = item.release_date;

        
        

        cardContainer.innerHTML += `
            <div class="col-3">
                <div class="card mb-4 shadow p-3 mb-5 bg-white rounded" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getMoviesbyName('${title}')">
                    <img src="../images/${title}.jpg" class="image-card" alt="${title} image">
                    <div class="card-body">
                        <h5>${title}</h5>
                        <p class="card-text">Director: ${director}</p>

                        <a class="btn btn-secondary">Read more</a></br></br>
                        
                        <p class="card-text"><small class="text-muted">Release: ${release}</small></p>
                    </div>
                </div>
            </div>
        `
    }
}

function displayMoviesByName(resDataMovies){
    modalContainer.innerHTML = '';

    for (let i = 0; i < resDataMovies.results.length; i++) {
        
        const item = resDataMovies.results[i];

        const title = item.title;        

        const release = item.release_date;

        const opening_crawl = item.opening_crawl;

        const director = item.director;

        const producer = item.producer;

        /* var only for search */
        const characters = item.characters;
        const starships = item.starships;
        const planets = item.planets;


        for (let i = 0; i < characters.length; i++) {
            const URL = characters[i];
            
            getPeople(URL);
        }

        for (let i = 0; i < starships.length; i++) {
            const URL_STARSHIPS = starships[i];
            
            getStarships(URL_STARSHIPS);
        }

        for (let i = 0; i < planets.length; i++) {
            const URL_PLANETS = planets[i];

            getPlanets(URL_PLANETS);

        }


        modalContainer.innerHTML += `
        
            <div class="row">
                <div class="col-6">
                    <img src="../images/${title}.jpg" class="image-modal" alt="${title} image">
                </div>
        
                <div class="col-6">
                    <h3>${title}</h3>
                    <p class="text-muted">Release date: ${release}</p>
                    <h5>Opening Crawl</h5>
                    <hr>
                    <p>${opening_crawl}</p></br>

                    <h5>Director & Producer</h5>
                    <hr>
                    <p>Director: ${director}</p>
                    <p>Producer: ${producer}</p>
                </div>
            </div>
        `
    }
}

function displayPeople(resDataPeople) {
    let peopleNames = resDataPeople.name;

    
    cardContainerPeople.innerHTML += `
        <p>${peopleNames}</p>
    `
}

function displayStarships(resDataStarships) {
    let starshipNames = resDataStarships.name;

    cardContainerStarships.innerHTML += `
        <p>${starshipNames}</p>
    `
   
}

function displayPlanets(resDataStarships) {
    let planetNames = resDataStarships.name;

    cardContainerPlanets.innerHTML += `
    <p>${planetNames}</p>
`
}