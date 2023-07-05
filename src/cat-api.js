function fetchBreeds(url) {
    return fetch(`${url}breeds`).then(response => {
        if (!response.ok) {
            error.hidden = true;
            throw new Error(response.statusText);
        }
        return response.json();
    })
}


function fetchCatByBreed(url, breedId) {
    return fetch(`${url}images/search?breed_ids=${breedId}`).then(response => {
        if (!response.ok) {
            error.hidden = true;
            throw new Error(response.statusText);
        }
        return response.json();
    })
}

export {fetchBreeds};
export {fetchCatByBreed};