#!/usr/bin/env bash

COUCH_DB_SERVER=http://localhost:5984

echo "=> enable CORS support on CouchDB config"
curl -X PUT ${COUCH_DB_SERVER}/_config/httpd/enable_cors -d '"true"'

echo "=> enable credentials on CORS config"
curl -X PUT ${COUCH_DB_SERVER}/_config/cors/credentials -d '"true"'

echo "=> set origins on CORS config"
curl -X PUT ${COUCH_DB_SERVER}/_config/cors/origins -d '"http://localhost:8080"'



echo "=> delete existing demo database"
curl -X DELETE ${COUCH_DB_SERVER}/demo

echo "=> create demo database"
curl -X PUT ${COUCH_DB_SERVER}/demo
