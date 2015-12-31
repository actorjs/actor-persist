ActorJs Persist
============

See [ActorJs Core](https://github.com/actorjs/actor-core)

Description
-----------

ActorJs Persist contains different strategies to persist events created by the actor. A persistence provider need to be registered at the actor system.

Installation
------------
Install it
```
npm i actorjs-persist
```

Use it nodejs
```
var actorPersist = require('actor-persist');
```

Use it web
```
var actorPersist = actorjs.persist;
```

Register provider
-----------------
actorSystem.setPersistenceProvider(<Provider>);

Usage
-----
Persistent actors require on extra update function on the actor. This function is used to update the internal state of the actor. For persistent actors it is better to use functions instead of objects.

```
function actor(){
    
    this.receive = function(msg){
        // receive messages 
    };
    
    this.update = function(msg){
        // handle messages to change internal state
    };
        
}
```


Local/Session Storage
---------------------
This class can be used in the browser to persist events in the local or session storage. It has one construct parameter which can be 'local' or 'session'.
```
var provider = new actorPersist.PersistStorage("local");
actorSystem.setPersistenceProvider(provider);
```