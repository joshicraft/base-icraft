## ICRAFT Development and Deploy process

Follow the steps below to get the development code.

### Build Setup

#### Install Node.js

Go to [this](https://nodejs.org/en/download/) link and download node.js for your OS.

Make sure you install npm (node package manager) when installing node.js



#### Clone Repository

...

#### Install node modules
Install dependencies (this may take up to 30 minutes)
``` bash
npm install
```

These packages are built with [vue-cli](https://cli.vuejs.org/guide/) and don't have available web-pack configs, they need to be overwritten with vue.config.js file at the root.
#### Serve development environment 
``` bash
npm run serve
```
This is bundled hot reload at localhost:8080

#### Build for production with minification
``` bash
npm run build
```
#### Build for production and view the bundle analyzer report
``` bash
npm run build --report
```
#### Serve development lambda functions 
``` bash
npm run start:lambda
```
* This serves up the back-end environment using lambda functions (serverless tech).

* To add new handlers locate the *func* folder and create a new *example.js* file for the handler.

* If modules are required, add the module to the correct dependencies in the *func/package.json*


### Tests

If tests are used follow the instructions below.


#### run unit tests
``` bash
npm run unit
```
#### run e2e tests
``` bash
npm run e2e
```
#### run all tests
``` bash
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
