#!/bin/sh

# set -e: any subsequent(*) commands which fail will cause the shell script to exit immediately
set -e

banner()
{
  echo "+------------------------------------------+"
  printf "| %-40s |\n" "`date`"
  echo "|                                          |"
  printf "|`tput bold` %-40s `tput sgr0`|\n" "$@"
  echo "+------------------------------------------+"
}


# set node version via NVM
. ~/.nvm/nvm.sh; nvm use

# cleanup
rm -rf dist

banner 'Building topi_server'

banner 'Generating config JSON schema'

# generate json schema for config
./ts2json.rb generate --srcs "./src/config/types/*.ts" --outdir ./src/config/types

yarn install

# typescript build
npx tsc -b

banner 'Copying files to dist'

cp -r public dist/.
cp yarn.lock dist/.
cp default_env.yaml dist/.
cp default_config.yaml dist/config.yaml
