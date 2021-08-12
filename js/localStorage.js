const getLocalStorage = function () {
    const guessGameLocalStorage = localStorage.getItem('guessGame');

    if (!guessGameLocalStorage) {
        return [];
    }
    return JSON.parse(guessGameLocalStorage);
}

export {
    getLocalStorage
}