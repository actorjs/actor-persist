var PersistXMLHttp = function (url) {
    this.url = url;
};

PersistXMLHttp.prototype.read = function(id, callback){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var events = JSON.parse(xhttp.responseText)
            callback(events);
        }
    };
    xhttp.open("GET", this.url + "?id=" + id, true);
    xhttp.send();
}

PersistXMLHttp.prototype.write = function(event, callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            callback();
        }
    };
    xhttp.open("POST", this.url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(event));
}


module.exports = PersistXMLHttp;