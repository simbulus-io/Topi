#!/bin/sh

# set -e: any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e

# set node version via NVM
. ~/.nvm/nvm.sh; nvm use

# typescript build
npx tsc -b

cp -r public dist/.
cp yarn.lock dist/.
cp default_env.yaml dist/.
cp default_config.yaml dist/config.yaml
