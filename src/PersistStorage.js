var PersistLocalStorage = function (type) {

    this.storage = null;

    if (type === "local")
        this.storage = localStorage

    if (type === "session")
        this.storage = sessionStorage
};

PersistLocalStorage.prototype.read = function (id, callback) {

    var events = JSON.parse(localStorage.getItem('actorjs'));
    callback(events);

};

PersistLocalStorage.prototype.write = function (event, callback) {
    var store = JSON.parse(localStorage.getItem('actorjs')) || [];
    store.push(event)
    localStorage.setItem('actorjs', JSON.stringify(store))
    callback()
}


module.exports = PersistLocalStorage;