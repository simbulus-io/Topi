#!/bin/sh
set -e

# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname $(readlink -f "$0"))
echo $SCRIPTPATH
cd $SCRIPTPATH

PACKAGE_NAME=$(cat package.json | grep name | head -1 | awk -F= "{ print $2 }" | sed 's/[name:,\",]//g' | tr -d '[[:space:]]')
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')

# full path to bundle name can be provided at invocation or defaults to bundle-dist/[name]-[version]
BUNDLE_DIST=$SCRIPTPATH/bundle-dist
BUNDLE=${BUNDLE_DIST}/${1:-${PACKAGE_NAME}-${PACKAGE_VERSION}.tgz}
echo ${BUNDLE_DIST}
rm -rf ${BUNDLE_DIST};
mkdir -p ${BUNDLE_DIST}

# Build local dependencies (dms-core)
./local_deps.sh

# Build orxy API
yarn build
ls -ltr ${BUNDLE_DIST}

# package into tgz
yarn pack -f $BUNDLE

# victory
echo Wrote bundle $BUNDLE
# ship it
