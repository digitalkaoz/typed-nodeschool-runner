# NodeSchool - Typescript - Runner

> this project aims to be a test-runner (powered by [Gulp](http://gulpjs.com/)) for the [NodeSchool Workshops](http://nodeschool.io/#workshopper-list). The clue is, you have to write them in [TypeScript](http://www.typescriptlang.org/)!

## Installation

1. `git clone https://github.com/digitalkaoz/typed-nodeschool-runner`
2. `npm install`

## Usage

lets say we want to walk through the `learnyounode` workshop, do the following steps.

1. `npm install --save learnyounode`
2. `mkdir src learnyounode`
3. `node_modules/.bin/learnyounode list` keep those names in mind
4. `gulp`

Now start solving the exercises by creating files for the steps (duplicate the name), e.g.:

* **HELLO WORLD** -> `src/learnyounode/hello world.ts`
* **BABY STEPS** -> `src/learnyounode/baby steps.ts`
* ...

> On every save the the modified exercise will be verified! Check the console output!

## Hints

> included files or folders should be prefixed with `_`, so they will be skipped for verifying

## TODO

* completed exercises wont be marked as done
* simplify new workshop setup
