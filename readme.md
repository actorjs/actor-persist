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

Register
--------
actorSystem.setPersistenceProvider(<Provider>);


Local/Session Storage
---------------------
This class can be used in the browser to persist events in the local or session storage. It has one construct parameter which can be 'local' or 'session'.
```
var provider = new actorPersist.PersistLocalStorage("local");
actorSystem.setPersistenceProvider(provider);
```