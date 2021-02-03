# Intro

Rotten-parser is Node.js-compatible module allowing you to fetch data from [Rottentomatoes](https://www.rottentomatoes.com) in a very simple way. This package is built on top of [Cheerio](https://github.com/cheeriojs/cheerio), [Puppeteer](https://github.com/puppeteer/puppeteer) and [axios](https://github.com/axios/axios).

# Installation (Jedis can skip this step :sunglasses:)

First, you have to get the package from the npm registry by typing `npm install --save rotten-parser` or `yarn add rotten-parser` in your terminal/console. Then you have to include it in your code using a `require` statement as shown below :

`const rotten-parser = require('rotten-parser');`

# Features

Currently there are only two functions available :

## `getMovieReview(title)`

This function returns basic info about the movie title given as argument. The return statement is an object similar to the following :

```
{
  // The movie title as shown on the website
  title: 'Ex Machina',

  // The overall critics rating
  rating: '92%',

  // The audience score
  audienceScore: '86%',

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

## `getOpenings()`

This one does not accept arguments. It returns an object similar to the following :

```
{
  // The movie review URL on the rottentomatoes website
  link: 'https://www.rottentomatoes.com//m/woman_in_motion',

  // The movie poster URL
  poster: 'https://resizing.flixster.com/hmuV3hJIv19p9GdEBWkhFfQ_DA4=/180x257/v2/https://resizing.flixster.com/XdBXG5iWPN9rIbTLBu6ga0f9s2M=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzL2ZjYjcxNzdmLTgxZmEtNDM2Ni1hMzUyLTVjMmU1OTJjMzllYS5qcGc=',

  // Its release date (if known)
  releaseDate: 'No release date known yet...',

  // The movie title
  title: 'Woman in Motion',

  // The critics consensus
  consensus: "Nichelle Nichols' daunting task to launch a national blitz for NASA. Nichelle recruited many trailblazing astronauts who became the first African American, Asian and Latino people to fly in space.",

  // Some additional info
  additionalInfo: '1hr 35min'
}  
```

## Usage

Each of those functions returns a promise, like the following :

```
const rotten = require('rotten-parser');

rotten.getOpenings()
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

## Contributions

Any help is welcome ! You can open an issue or a pull request to get started and we'll get in touch.

## License

This code is licensed under the GNU GPL v3 license.
