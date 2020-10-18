# CI practices in open-source projects

Social coding sites like GitHub have started offering solutions, such as contribution guidelines and continuous integration (CI) tools, to get core developers and contributors
on the same page and help unify expectations. Because of the benefits of using CI tools, GitHub now offers a native, fully integrated CI solution. Due to the role, CI plays in evaluating code contributions on
GitHub, developers have started considering CI among their contribution evaluation criteria. This work aims to analyze the usage of Continuous Integration practice, in particular in open-source projects, and to study the diffusion of bad practices related to the use of this practice.

## Prerequisities

The accomplishment of this goal was possible thanks to  the use of [Api Rest GitHub v3](https://developer.github.com/v3/). There are two ways to authenticate through GitHub API v3: the one used in this project is OAuth2 token (sent in a header): you can generate a personal
access token for quick access to the GitHub API by going in: your github account/settings/developer settings/personal access tokens. The token was used to make the calls to Api GitHub in the following way:

```js
const headers ={
    "Authorization" : 'Token putyourtokenhere'
}
```
## Installing

The project was realized using [node.js](https://nodejs.org/it/download/), JavaScript runtime environment, so the first step is to download the framework. Moreover, npm, a package manager for the JavaScript programming language, was used to install
all the necessary libraries, using "npm install" by terminal. The libraries used were:

- __fs__ -a module that provides a lot of very useful functionality to access and interact with the file system. There is no need to install it. Being part of the Node.js core, it can be used by simply requiring it: 

```js
const fs = require('fs');
```

- __readline__ - a module providing a way of reading a datastream, one line at a time. You need to install it by terminal by using: 
```
npm install readline
```
It also has to be required in javascript: 
```js
const readline = require('readline');
```

- __node-fetch__ -a light-weight module that brings window.fetch to Node.js You need to install it by terminal by using: 
```
npm install node-fetch --save 
```
It also has to be required in javascript: 
```js
const fetch = require("node-fetch");
```

- __yaml__ - a JavaScript parser and stringifier for YAML, a human friendly data serialization standard.
To install: 
```
npm install yaml
```
To require: 
```js
const yaml = require ("yaml");
```
- __axios__ - 
 
To install: 
```
npm install axios
```
To require: 
```js
const axios = require ("axios");

- __path__ - 
 
To install: 
```
npm install path
```
To require: 
```js
const path = require ("path");
```
## Files
The folder scripts contains all the .js scripts and the utilities necessary to obtain the results of the presented manuscript.
Execution order of the scripts:
.............


