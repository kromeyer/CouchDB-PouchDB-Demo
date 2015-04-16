# CouchDB PouchDB Demo

## Setup Entwicklungsumgebung

1. Installation Node.js via MacPorts: [Anleitung](https://jonlabelle.com/snippets/view/shell/install-nodejs-macport)
2. Installation CouchDB via MacPorts: [Anleitung](http://guide.couchdb.org/draft/mac.html)
3. Installation von Bower: `$ npm install bower -g`
4. Projektsetup (in diesem Ordner ausführen)
    1. Node.js-Dependencies installieren: `$ npm install`
    2. Bower-Dependencies installieren: `$ bower install`
    3. Grunt ausführen: `$ nde_modules/grunt-cli/bin/grunt`

### CORS

* http://pouchdb.com/errors.html
* https://github.com/pouchdb/add-cors-to-couchdb

* CORS aktivieren
    * `/_config/httpd/enable_cors`: `true`
* Cookies dürfen an die Couch übertragen werden
    * `/_config/cors/credentials`: `true`
* erlaubte Request-Quellen
    * `/_config/cors/origins`: `http://localhost:63342`
