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
- __request__ - designed to be the simplest way possible to make http calls.
To install: 
```
npm install request
```
To require: 
```js
const request = require ("request");
```
## Files
The folder contains all the .js scripts and the utilities necessary to obtain the results of the presented manuscript.
Execution order of the scripts:

1. **getRepos.js**	
		Find names of all GitHub repositories with CI in the readme, created between 1/03/2019 and 21/04/2020 
		(date_ranges.txt provides ranges for the "date" parameter of queries to the GitHub API in order to obtain sets of results containing less than 1000 occurrences).
		
		Input: date_ranges.txt
		Output: repo_names.txt
		
1. **getYamls.js**
		From a set of GitHub repositories (reading from "repo_names.txt"), extract the ones provided with yaml files, and write their paths in "yamls_paths.txt"
		
		Input: repo_names.txt
		Output: yamls_paths.txt
		
1. **getTools.js**
		Script that reads the paths from the "yamls_paths.txt" file,  and queries if they contain one of the most frequents tools names in the path.
		
		Input: yamls_paths.txt
		Outputs: circle_occurences.txt, docker_occurences.txt, jenkins_occurences.txt, others_tools_occurences.txt
		
1. **getJobsAndEvents.js**
		This script reads yaml files and counts the occurences of jobs ("jobs_numbers.txt"), their ids ("jobs_ids.txt"), and also the trigger events ("on_ids.txt")
		
		Input: yamls_paths.txt
		Outputs: jobs_numbers.txt, jobs_ids.txt, on_ids.txt
		
1. **getTriggerEventsOccurences.js**
		Script that reads the trigger events present in the yaml files from the "on_ids.txt" file, and then writes all the occurences of the possible events in the output files.
	
		Input: on_ids.txt
		Outputs: pull_request_occurences.txt, push_occurences.txt, release_occurences.txt, issues_occurences.txt, 					others_events_occurences.txt.
		
1. **getJobsOccurences.js**
		Script that reads the jobs' ids present in the yaml files from the jobs_ids.txt" file, and then writes the occurences of the most frequent names in  the output files.
		
		Input: jobs_ids.txt
		Outputs: build_occurences.txt, deploy_occurences.txt, others_jobs_occurences.txt
		
1. **getAndroid.js**
		Find names of all GitHub projects with Android in the name ("repos_with_android.txt"), description or readme, and using java as the main project's language.
	
		Input: date_ranges.txt
		Output: repos_with_android.txt
		
1. **getAndroidYamls.js**
		Find names of all GitHub projects with Android that also contain a yaml file in the project, and save their names in "repos_with_android_and_yaml.txt".
		
		Input: repos_with_android.txt
		Output: repos_with_android_and_yaml.txt
		
