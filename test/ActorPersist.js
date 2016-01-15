var fs = require("fs");
var assert = require('assert');


describe('ActorPersist', function () {

    it('PersistFile', function (done) {
        var filePath = "/tmp/test.actor";
        fs.writeFileSync(filePath, "")
        var PersistFile = require("../src/PersistFile");
        testPersist(new PersistFile(filePath), done)
    });

    it('PersistXMLHttp', function (done) {

        var events = [];

        GLOBAL.XMLHttpRequest = function() {

            this.open = function () {};
            this.setRequestHeader = function () {};
            this.send = function (event) {

                if (event){
                    events.push(JSON.parse(event));
                }

                this.readyState = 4;
                this.status = 200;
                this.responseText = JSON.stringify(events);

                this.onreadystatechange();

            };
        };

        var url = "http://test.nl";
        var PersistXMLHttp = require("../src/PersistXMLHttp");
        testPersist(new PersistXMLHttp(url), done)
    });


    it('PersistStorage', function (done) {

        var store = {};

        GLOBAL.localStorage = {
            getItem: function(key){
                return store[key] || null
            },
            setItem: function(key, value){
                store[key] = value;
            }
        }

        var PersistFile = require("../src/PersistStorage");
        testPersist(new PersistFile("local"), done)
    });


});

function testPersist(persist, done) {

    var event = {
        actor:{
            id: 123
        },
        message: {
            test: "TEST"
        }
    }

    persist.write(event, function () {
        persist.read(123, function (events) {
            assert.equal(events[0].id, event.id);
            assert.equal(events[0].message.test, event.message.test);
            done();
        });
    });


}
