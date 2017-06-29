var app={
  OMDB:{
    url:'http://www.OMDBapi.com',
    apiKey:'e706bc8'
  },
  tasteDive:{
    url:'http://tastedive.com/api/similar',
    apiKey:'274055-moviefic-4YV5JJJB'
  },
  movieArr:[],
  endArr:false
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
  // console.log('in makeOMDBDiv ' + $('#moviesHere>.movieDiv').length + ' name: ' + data.movieName);
  if ($('.movieDiv').length===1){
   $('#chosenMovie').append(newDiv);
   newDiv.removeAttr('id');
  }
  else{
    newDiv.attr('divNum',$('#moviesHere>.movieDiv').length.toString());
    $('#moviesHere').append(newDiv);
  }
  if (app.endArr){
    $('#moviesHere').find('.movieDiv').sort(function(a,b){
      return parseFloat($(b).find('#metacritic').text()==="N/A"?"0":$(b).find('#metacritic').text())
        -parseFloat($(a).find('#metacritic').text()==="N/A"?"0":$(a).find('#metacritic').text());
    }).appendTo('#moviesHere');
    $('#moviesHere').find('.movieDiv').removeAttr('id');
  } 
}

function runReviewAJAX(data){
// Callback function for OMDB API, collects all relevant movie info and passes as object to >>> makeOMDBDiv  
    if('Error' in data){return;}
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
  console.log(data.Similar.Results);
  app.movieArr=data.Similar.Results;
  for (i=0;i<app.movieArr.length;i++){
    findReviews(app.movieArr[i].Name);
    console.log(i + "/" + app.movieArr.length);
    app.endArr=(i===app.movieArr.length-1);
    console.log(app.endArr);
  }
}

function findSimMovies(movieName){
// Function which updates the app object with the movies that are similar to primary search object
    var settings={
        q:movieName,
        k:app.tasteDive.apiKey,
        verbose:"1",
        limit:"20"
    };
    // console.log(settings);
    $.getJSON(app.tasteDive.url,settings,handleTasteDiveOutput);
}

function findReviews(movieName){
      var OMDBSettings={           
      apikey: app.OMDB.apiKey,
      t: movieName
    };
    console.log(movieName);
    $.getJSON(app.OMDB.url,OMDBSettings,runReviewAJAX);

}

function createPage(movieName){
 // 
$('#chosenMovie').empty();
$('#moviesHere').empty();
app.movieArr=[];
app.endArr=false;
 findReviews(movieName); 
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
