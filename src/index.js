import axios from "axios";
import { Notify } from "notiflix";

import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'live_pL7E1ilz183Nadmg9iLleljvJ6toXaQszkPOKqpjQKsj51nXM7aPbQ4dWzF1S3wV';

axios.defaults.headers.common["x-api-key"] = API_KEY;

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.hidden = true;
error.hidden = true;

catInfo.style.cssText = 'margin-top: 10px; display: flex; gap: 10px';

fetchBreeds(BASE_URL).then((data) => {
    breedSelect.innerHTML = data.map(({name, id}) => `
        <option value=${id}>${name}</option>
    `)
})

breedSelect.addEventListener('change', onChange);

function onChange() {
    catInfo.innerHTML = '';
    error.hidden = true;
    loader.hidden = false;

    const breedId = breedSelect.value;

    fetchCatByBreed(BASE_URL, breedId).then(data => {
        loader.hidden = true;
        const img = document.createElement('img');
        img.src = data[0].url;
        img.width = '300';
        catInfo.append(img);

        fetchBreeds(BASE_URL).then((data) => {
            return data.find(item => item.id === breedId);
        }).then(({name, description, temperament}) => catInfo.insertAdjacentHTML('beforeend', createCatInfo(name, description, temperament)));

    }).catch(() => {
        loader.hidden = true;
        error.hidden = false;
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
}

function createCatInfo(name, description, temperament) {
    return `
        <div>
            <h2>${name}</h2>
            <p>${description}</p>
            <p><b>Temperament: </b>${temperament}</p>
        </div>
    `;
}
