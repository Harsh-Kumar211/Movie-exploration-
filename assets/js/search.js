
import { api_key, fetchDataFromServer } from "./api.js";
import { CreateMovieCard } from "./movie-card.js";

export function search() {
    const searchWrapper = document.querySelector("[search-wrapper]");
    const searchField = document.querySelector("[search-field]");
    const searchResultModel = document.createElement("div");
    searchResultModel.classList.add("search-model");
    document.querySelector("main").appendChild(searchResultModel);

    let searchTimeout;

    searchField.addEventListener("input", function () {
        const searchTerm = searchField.value.trim();
        if (!searchTerm) {
            searchWrapper.classList.remove("searching");
            clearTimeout(searchTimeout);
            return;
        }

        searchWrapper.classList.add("searching");
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(function () {
            fetchDataFromServer(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&page=1&include_adult=false&query=${searchTerm}`, function ({ results: movieList }) {
                searchWrapper.classList.remove("searching");
                searchResultModel.classList.add("active");

                const fragment = document.createDocumentFragment();
                const gridList = document.createElement("div");
                gridList.classList.add("grid-list");

                for (const movie of movieList) {
                    const movieCard = CreateMovieCard(movie);
                    fragment.appendChild(movieCard);
                }

                gridList.appendChild(fragment);
                searchResultModel.innerHTML = `
                    <p class="label">Results for</p>
                    <h1 class="heading">${searchTerm}</h1>
                    <div class="movie-list">
                        ${gridList.outerHTML}
                    </div>`;
            });
        }, 500);
    });
}
