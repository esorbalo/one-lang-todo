#!/bin/sh

if [ -z "$IP" ]; then
    echo "WARN: environmental variable IP not set"
fi

if [ -z "$TEST_PORT" ]; then
    echo "ERROR: environmental variable TEST_PORT not set"
fi

if [ -z "$TEST_DATABASE_URL" ]; then
    echo "ERROR: environmental variable TEST_DATABASE_URL not set"
    exit
fi

# if [ -z "$TEST_AUTH0_CALLBACK_URL" ]; then
#     echo "ERROR: environmental variable TEST_AUTH0_CALLBACK_URL not set"
#     exit
# fi

# if [ -z "$TEST_AUTH0_LOGOUT_URL" ]; then
#     echo "ERROR: environmental variable TEST_AUTH0_LOGOUT_URL not set"
#     exit
# fi

# if [ -z "$TEST_AUTH0_LOGOUT_RETURN" ]; then
#     echo "ERROR: environmental variable TEST_AUTH0_LOGOUT_RETURN not set"
#     exit
# fi

if [ -z "$TEST_AUTH0_DOMAIN" ]; then
    echo "ERROR: environmental variable TEST_AUTH0_DOMAIN not set"
    exit
fi

if [ -z "$TEST_AUTH0_CLIENT_ID" ]; then
    echo "ERROR: environmental variable TEST_AUTH0_CLIENT_ID not set"
    exit
fi

if [ -z "$TEST_AUTH0_CLIENT_SECRET" ]; then
    echo "ERROR: environmental variable TEST_AUTH0_CLIENT_SECRET not set"
    exit
fi

if [ -z "$TEST_LOGLEVELCONSOLE" ]; then
    echo "ERROR: environmental variable TEST_LOGLEVELCONSOLE not set"
    exit
fi

if [ -z "$TEST_ALLOW_SIGNUP" ]; then
    echo "ERROR: environmental variable TEST_ALLOW_SIGNUP not set"
    exit
fi


export PORT=$TEST_PORT
export DATABASE_URL=$TEST_DATABASE_URL
export LOGLEVELCONSOLE=$TEST_LOGLEVELCONSOLE
export ALLOW_SIGNUP=$TEST_ALLOW_SIGNUP

# export AUTH0_CALLBACK_URL=$TEST_AUTH0_CALLBACK_URL
# export AUTH0_LOGOUT_URL=$TEST_AUTH0_LOGOUT_URL
# export AUTH0_LOGOUT_RETURN=$TEST_AUTH0_LOGOUT_RETURN

./node_modules/mocha/bin/mocha "$@"
