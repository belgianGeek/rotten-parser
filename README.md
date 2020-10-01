# Intro

Rotten-parser is Node.js-compatible module allowing you to fetch data from [Rottentomatoes](https://www.rottentomatoes.com) in a very simple way. This package is built on top of [Cheerio](https://github.com/cheeriojs/cheerio), [Puppeteer](https://github.com/puppeteer/puppeteer) and [axios](https://github.com/axios/axios).

# Installation (Jedis can skip this step :sunglasses:)

First, you have to get the package from the npm registry by typing `npm install --save rotten-parser` or `yarn add rotten-parser` in your terminal/console. Then you have to include it in your code using a `require` statement as shown below :

`const rotten-parser = require('rotten-parser');`

# Features

Currently there are only two functions available :

- `getMovieReview(title)` : return basic info about the movie title given as argument. The return statement is an object similar to the following :

```
{
  // The movie title as shown on the website
  title: 'Ex Machina',

  // The overall critics rating
  rating: '92%',

  // The critics consensus
  consensus: "Ex Machina leans heavier on ideas than effects, but...",

  // The movie synopsis (250 characters long)
  synopsis: "Caleb Smith (Domhnall Gleeson) a programmer at a huge Internet company...",

  // The poster URL
  poster: 'https://resizing.flixster.com/kMP9ZfwTENlp99G4u66DbL6RtQk=/206x305/v2/https://flxt.tmsimg.com/assets/p11007806_p_v10_ag.jpg',

  // The complete review URL on the rottentomatoes website
  url: 'https://rottentomatoes.com/m/ex_machina'
  }
  ```
