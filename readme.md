# CouchDB PouchDB Demo

## Setup Entwicklungsumgebung

1. Installation Node.js via MacPorts: [Anleitung](https://jonlabelle.com/snippets/view/shell/install-nodejs-macport)
2. Installation CouchDB via MacPorts: [Anleitung](http://guide.couchdb.org/draft/mac.html)
3. Installation von Bower: `$ npm install bower -g`
4. Projektsetup (in diesem Ordner ausführen)
    1. Node.js-Dependencies installieren: `$ npm install`
    2. Bower-Dependencies installieren: `$ bower install`
    3. Grunt ausführen: `$ node_modules/grunt-cli/bin/grunt`

### Demo

* CouchDB starten: `$ sudo port load couchdb`
* Setup-Script ausführen: `$ bin/setup.sh`
* Webserver installieren: `npm install node-static`
* Webserver starten: `$ node_modules/node-static/bin/cli.js public/`
