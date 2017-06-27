var app={
  OMDB:{
    url:'http://www.OMDBapi.com',
    apiKey:'e706bc8'
  },
  tasteDive:{
    url:'http://tastedive.com/api/similar',
    apiKey:'274055-moviefic-4YV5JJJB'
  }
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
  newDiv.removeAttr('id');
  $('#moviesHere').append(newDiv);
}

function useOMDBData(data){
// Callback function for OMDB API, collects all relevant movie info and passes as object to >>> makeOMDBDiv
  
  var OMDBData={
    movieName:data.Title,
    IMDB:data.imdbRating,
    metacritic:data.Metascore,
    rottenTomatoes:data.Ratings.length>1?rottenTomatoes=data.Ratings[1].Value:'N/A',
    releaseYear:data.Year,
    rated:data.Rated==="NOT RATED"?"NR":data.Rated,
    plot:data.Plot,
    moviePic:data.Poster
  };
 makeOMDBDiv(OMDBData);
}


function onMovieReviews(){
  $('#movieReviews').on('submit',function(event){
    event.preventDefault();

    var movieName=$(this).find('input').val();
    var OMDBSettings={
      apikey: app.OMDB.apiKey,
      t: movieName
    };
    // alert(JSON.stringify(OMDBSettings));
    
    $.getJSON(app.OMDB.url,OMDBSettings,useOMDBData);
    // $.get('http://www.omdbapi.com/?apikey=e706bc8&t=%22The%20Avengers%22',function(response){alert(response.Title);});
  });
}

function handleTasteDiveOutput(data){
  for(var i=0;i<data.Similar.Results.length;i++){
    console.log(data.Similar.Results[i].Name);
  }
}

function onSimilarMovies(){
  $('#moviesHere').on('submit','.getSimMovies',function(event){
    event.preventDefault();
    var settings={
      url:app.tasteDive.url,     
      data:{
        q:$(this).attr('mu-v'),
        k:app.tasteDive.apiKey
      },
      dataType:'json',
      type:'GET',
      success:handleTasteDiveOutput
    };
    alert(JSON.stringify(settings));
    $.ajax(settings);
  });
}

$(function(){
  onMovieReviews();
  onSimilarMovies();
});
// alert('Page Start');
