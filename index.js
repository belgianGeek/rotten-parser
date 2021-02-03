const axios = require('axios');
let $ = require('cheerio');
const puppeteer = require('puppeteer');

module.exports = {
  getMovieReview: function(title) {
    let args = title.split(' ');
    const url = `https://rottentomatoes.com/m/${args.join('_')}`;
    return new Promise((fullfill, reject) => {
      axios({
          url: url,
          method: 'GET'
        })
        .then(res => {
          let rottenTitle, rottenRating, audienceRating, rottenSynopsis, rottenConsensus, rottenPoster;

          if (res.status === 200) {
            $ = $.load(res.data);

            // Title
            if ($('.scoreboard__title').length) {
              rottenTitle = $('.scoreboard__title').text();
            } else {
              reject(new Error('Sorry, I was unable to retrieve the movie title :(('));
            }

            if ($('.scoreboard').length) {
              // Critics rating
              if ($('.scoreboard').attr('tomatometerscore').length) rottenRating = `${$('.scoreboard').attr('tomatometerscore').trim()}%`;
              else rottenRating = 'No rating found !';

              if ($('.scoreboard').attr('audiencescore').length) audienceRating = `${$('.scoreboard').attr('audiencescore').trim()}%`;
              else audienceRating = 'No audience score found !';
            } else {
              reject(new Error('Sorry, I was unable to retrieve critics and audience rating.'));
            }

            // Synopsis
            if ($('#movieSynopsis').length) {
              rottenSynopsis = `${$('#movieSynopsis').text().trim().match(/\w.+/)[0].substring(0,250)}...`;
            } else {
              rottenSynopsis = 'Synopsis unavailable';
            }

            // Consensus
            if ($('.what-to-know__section-body').length) {
              rottenConsensus = $('.what-to-know__section-body').text().trim().match(/\w.+/)[0].substring(0, 200);
            } else {
              rottenConsensus = 'No consensus yet.';
            }

            // Poster
            if ($('.posterImage').length) {
              rottenPoster = $('.posterImage').attr('data-src');
            }

            let result = {
              title: rottenTitle,
              rating: rottenRating,
              audienceScore: audienceRating,
              consensus: rottenConsensus,
              synopsis: rottenSynopsis,
              poster: rottenPoster,
              url: url
            };

            fullfill(result);
          } else if (res.status === 404) {
            reject(new Error(`Page not found !`));
          }
        })
        .catch(err => {
          console.error(`Couldn't get this movie review : ${err}`);
          reject(new Error(`Couldn't get this movie review : ${err}`));
        });
    });
  },
  getOpenings: function() {
    const url = `https://www.rottentomatoes.com/browse/opening/`;
    return new Promise((fullfill, reject) => {
      puppeteer
        .launch()
        .then(browser => {
          return browser.newPage();
        })
        .then(page => {
          return page.goto(url)
            .then(() => {
              return page.content();
            });
        })
        .then(html => {
          let openingMovies = [];

          // Avoid ES6 because it breaks $(this)...
          $('.media-list .media-list__item', html).each(function() {
            let movie = {};

            movie.link = `https://www.rottentomatoes.com/${$(this).find('.media-list__poster_container a').attr('href')}`;
            movie.poster = $(this).find('.media-list__poster').attr('src');

            // Retrieve the movie release date, if known
            if ($(this).find('.media-list__release-date').text() && $(this).find('.media-list__release-date').text() !== '') movie.releaseDate = $(this).find('.media-list__release-date').text().trim();
            else movie.releaseDate = 'No release date known yet...';

            movie.title = $(this).find('.media-list__title').text().trim();

            // Define the movie score
            if ($(this).find('.media-list__consensus').length) movie.consensus = $(this).find('.media-list__consensus-text').text().trim();
            else movie.consensus = 'No consensus yet...';

            // Retrieve some additional info, if any
            if ($(this).find('.media-list__other_info').length) movie.additionalInfo = $(this).find('.media-list__other_info').text().trim();

            openingMovies.push(movie);
          });

          fullfill(openingMovies);
        });
    });
  }
}
