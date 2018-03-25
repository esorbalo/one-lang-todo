# One-Lang Todo Backend

## Main Components

### Dependencies

* PostgreSQL database
* Auth0 authentication
* Environmental variables

### Application parts

* Model
* Controller

## Setup

### Before you start

Make sure that you have the following applications installed:

* `node` and `npm`.
* Either local PostgreSQL or Virtualbox + Vagrant.
* An editor like Atom or VisualStudio Code. 

### Auth0

1. Signup for the free account on [auth0.com](https://auth0.com).
1. Choose database authentication.
1. Note client id and client secret.

### Local PostgreSQL database

Assuming that you do not have local PostgreSQL database, then:
1. After cloning this repository go to folder [dev_environment/vagrants/pg-dev-vm](dev_environment/vagrants/pg-dev-vm)
1. Run `vagrant up`
1. Wait for the virtual machine to start and create the application database (without tables). The path to the database will be shown at the end by this script: [dev_environment/vagrants/pg-dev-vm/Vagrant-setup/bootstrap.sh](dev_environment/vagrants/pg-dev-vm/Vagrant-setup/bootstrap.sh).
1. When it has finished, you'll need to *create tables*:
   1. Login into the database. If you installed Postgresql using Vagrant, follow the steps:
      1. Ssh into the virtual machine: `vagrant ssh`
      1. From the virtual machine login into the database: `PGUSER=myapp PGPASSWORD=dbpass psql -h localhost one_lang_todo`
   1. Open the database schema: [model/src/db/db_create.sql](model/src/db/db_create.sql). Copy the content in clipboard.
   1. Paste the content into the terminal with open postgres database. 
   1. Check that tables were successfully created: `\dt`

### Environmental variables

You can see the required environmental variables in [model/src/config/index.js](model/src/config/index.js):
* `IP` - (optional)
* `PORT` - (optional)
* `DATABASE_URL` - the full database url in the format: `postgresql://myapp:dbpass@localhost:15432/myapp`
* `LOGLEVEL` - (optional) level of logs, which will be considered. For production use 'warn' level. For debugging use _debug_ or _info_ level. Note that this sets level for all logs: console, file, etc. If this level is set to _warn_, but console log level is set to _debug_, then only warning and errors will be shown on console.
* `LOGLEVELCONSOLE` - (optional) level of logs, which will be displayed on console.
* `AUTH0_DOMAIN` - domain of the client, provided by Auth0 service.
* `AUTH0_CLIENT_ID` - provided by Auth0 service.
* `AUTH0_CLIENT_SECRET` - provided by Auth0 service.

### Start the server

1. Cd into the _backend_ folder.
1. Install dependencies: `npm install`.
1. Start the server: `npm start`
