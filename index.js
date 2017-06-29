var app={
  OMDB:{
    url:'http://www.OMDBapi.com',
    apiKey:'e706bc8'
  },
  tasteDive:{
    url:'http://tastedive.com/api/similar',
    apiKey:'274055-moviefic-4YV5JJJB'
  },
  movieArr:[]
};




function makeOMDBDiv(data){
// Uses data from OMDB API to populate a template div
  var newDiv=$('#template').clone();
  newDiv.find('#moviePic').attr('src',data.moviePic);
  newDiv.find('#rating').text(data.rated);
  newDiv.find('#releaseYear').text(data.releaseYear);
  newDiv.find('#plot').text(data.plot);
  newDiv.find('#metacritic').text(data.metacritic);
  newDiv.find('#IMDB').text(data.IMDB);
  newDiv.find('#rottenTomatoes').text(data.rottenTomatoes);
  newDiv.find('.getSimMovies').attr('mu-v',data.movieName);
  newDiv.find('.getSimMovies').attr('mu-v',data.movieName);
  newDiv.attr('divNum',$('#moviesHere>.movieDiv').length.toString());
  newDiv.removeAttr('id');
  $('#moviesHere').append(newDiv);
}

function runReviewAJAX(data){
// Callback function for OMDB API, collects all relevant movie info and passes as object to >>> makeOMDBDiv  
  var OMDBData={
    movieName:data.Title,
    IMDB:data.imdbRating,
    metacritic:data.Metascore,
    rottenTomatoes:data.Ratings.length>1?rottenTomatoes=data.Ratings[1].Value:'N/A',
    releaseYear:data.Year,
    rated:data.Rated==="NOT RATED"?"NR":data.Rated,
    plot:data.Plot,
    moviePic:data.Poster,
  };
  makeOMDBDiv(OMDBData);
}

function onMovieReviews(){
  // Handles user querying a movie in top-left movie bar
  $('#movieReviews').on('submit',function(event){
    event.preventDefault();
    var movieName=$(this).find('input').val();
    createPage(movieName);
  });
}

function handleTasteDiveOutput(data){
  //store an array of tasteDive similar movie results in our app variable to access later
  app.movieArr=data.Similar.Results;
  console.log(app.movieArr);
}

function findSimMovies(movieName){
// Function which updates the app object with the movies that are similar to primary search object
    alert('in sim movies');
    var settings={
        q:movieName,
        k:app.tasteDive.apiKey,
        verbose:"1"
    };
    $.getJSON(app.tasteDive.url,settings,handleTasteDiveOutput);
}
function createPage(movieName){
 // 

 // Code to run review for first movie
    var OMDBSettings={         
      apikey: app.OMDB.apiKey,
      t: movieName
    };
    $.getJSON(app.OMDB.url,OMDBSettings,runReviewAJAX);
 
  findSimMovies(movieName);

}

function onSimilarMovies(){
  $('#moviesHere').on('submit','.getSimMovies',function(event){
    event.preventDefault();
    createPage($(this).attr('mu-v'));
  });
}

$(function(){
  onMovieReviews();
  onSimilarMovies();
});
// alert('Page Start');
