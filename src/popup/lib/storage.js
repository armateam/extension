class Storage {
    save(key, data) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(data));
        }
    }

    load(key) {
        if (typeof localStorage !== 'undefined') {
            return JSON.parse(localStorage.getItem(key));
        }
    }
}

// ## //

export default new Storage()
