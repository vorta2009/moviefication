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


function onPermission(){

    $('#fbPermission').on('click',function(event){
      event.preventDefault();
      FB.login(function(){
        FB.api('/me', {fields: 'email,first_name'}, function(response) {
          alert(response);
        });
      }, {scope: 'user_friends,email,publish_actions'});
    });
}

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
  alert('in handler');
  alert(data.info[0].Name);
}

// function onSimilarMovies(){
//   $('#moviesHere').on('submit','.getSimMovies',function(event){
//     event.preventDefault();
//     var query={
//       q:$(this).attr('mu-v'),
//       k:app.tasteDive.apiKey
//     };
//     alert(JSON.stringify(query));
//     // alert('$.getJSON(' + app.tasteDive.url +','+JSON.stringify(query) + ','+JSON.stringify(handleTasteDiveOutput));
//     $.get('https://tastedive.com/api/similar?q=Dodgeball&k=274055-moviefic-4YV5JJJB',function(response){
//       alert(response.Similar.Info.Name);
//     });
//     // $.getJSON(app.tasteDive.url,query,handleTasteDiveOutput);
//     $.getJSON(app.tasteDive.url,query,function(response){
//       alert('in handler');
//     });
//   });
// }
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
  onPermission();
  onMovieReviews();
  onSimilarMovies();
});
alert('Page Start');
