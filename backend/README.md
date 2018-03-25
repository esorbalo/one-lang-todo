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
1. in Auth0.com, go to _Clients_ -> _Default App_.
1. Save _Domain_, _Client ID_ and _Client Secret_. We will set them in environmental variables later.
1. Allow grant types:
   1. In the _Default App_ client, go down and click on _Show Advanced Settings_.
   1. Go to _Grant Types_ tab.
   1. Click on _Password_ and click on _Save changes_.
   1. Go to _OAuth_ tab.
   1. Uncheck _OIDC Conformant_.
   1. In the _JsonWebToken Signature Algorithm_ drop-down menu select _HS256_.
1. In the _Connections_ tab make sure that only _Username-Password-Authentication_ is chosen.
1. Set default connection:
   1. Go to the right left corner and click on the account name. A menu opens
   1. Click on _Settings_
   1. In the _Default Directory_ field write: "Username-Password-Authentication".
   1. Click on _Save_.

### Local PostgreSQL database

Assuming that you do not have local PostgreSQL database, then:
1. After cloning this repository go to folder [dev_environment/vagrants/pg-dev-vm](dev_environment/vagrants/pg-dev-vm)
1. Run `vagrant up`
1. Wait for the virtual machine to start and create the application database (without tables). The path to the database will be shown at the end by this script: [dev_environment/vagrants/pg-dev-vm/Vagrant-setup/bootstrap.sh](dev_environment/vagrants/pg-dev-vm/Vagrant-setup/bootstrap.sh).

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
1. Check the endpoint [http://localhost:8080/api/v1/test/todos](http://localhost:8080/api/v1/test/todos), which does not require any authentication. You should get two dummy to dos. 

### Test signup

A real test for the server is the _Sign Up_ operation, because it requires both Auth0 service and the database. To sign up a user, send POST request using Postman to: [http://localhost:8080/api/v1/auth/signup](http://localhost:8080/api/v1/auth/signup) with header


`Content-Type: application/json`

and the body:

```json
{
  "email": "email@example.com",
  "password": "Password",
  "firstname": "firstname",
  "lastname": "lastname"
}
```

The request should be successful with any email. 