
# topi_server

REST endpoints Topi

## **Prerequisites**

For VSCode users, install the VSCode eslint plugin - Instructions [here](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code)


### **Node 14.x**

This app requires that NVM is installed and node 14 is available. There is a
.nvmrc and associated scripting in package.json that will switch to node 14
automatically in subshells started by yarn scripts.


## **Developers**
---

### Build

```
build.sh
```

### Watch build

```
# presumes you have run yarn build once
yarn build:watch
```

### Local up on 5104
```
node dist/topi_main.js
```
### Local up on 5104 with autoreload on detected change
```
# npx just says run the binary from the project's node_modules
npx nodemon dist/topi_main.js
```

## **Databases**
---

### **local mongo**

You can also run against a local mongo running in docker

Note: NODE_ENV=docker node/dist/topi_main.js

Before you start make sure the dockerized local mongo is up and running.  Instructions are in the

## Routes
---
#### Splash
````
http://localhost:5104
http://localhost:5104/topi/v1.0/alive
````

### Linting and Dependencies

```
# linter from the CL
yarn lint
```

