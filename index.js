var app={
  OMDB:{
    url:'http://www.OMDBapi.com',
    apiKey:'e706bc8'
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
  newDiv.find('img').attr('src',data.moviePic);
  newDiv.find('#rating').text(data.rated);
  newDiv.find('#releaseYear').text(data.releaseYear);
  newDiv.find('#plot').text(data.plot);
  newDiv.find('#metacritic').text(data.metacritic);
  newDiv.find('#IMDB').text(data.IMDB);
  newDiv.find('#rottenTomatoes').text(data.rottenTomatoes);
  newDiv.removeAttr('id');
  $('#moviesHere').append(newDiv);
}

function useOMDBData(data){
// Callback function for OMDB API, collects all relevant movie info and passes as object to >>> makeOMDBDiv
  var rottenTomatoes;
  if (data.Ratings.length>1) {
    rottenTomatoes=data.Ratings[1].Value;
  }
  else{
    rottenTomatoes="N/A";
  }
  
  var OMDBData={
    IMDB:data.imdbRating,
    metacritic:data.Metascore,
    rottenTomatoes:rottenTomatoes,
    releaseYear:data.Year,
    rated:data.Rated,
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
    alert(OMDBSettings.toSource());
    $.getJSON(app.OMDB.url,OMDBSettings,useOMDBData);
  });
}
// function onMovieReviewsT(){

//   $('#movieReviews').on('submit',function(event){
//     event.preventDefault();
//     alert('1');

//     var movieName=$(this).find('input').val();
    
//     var OMDBSettings={
//         url:app.OMDB.url,
//         data:{
//             apikey: app.OMDB.apiKey,
//             t: movieName
//         },
//         dataType:'json',
//         type:'GET',
//         success:useOMDBData
//     };
//     alert('2');
//     alert(OMDBSettings.toSource());
//     $.ajax(OMDBSettings);
//   });
// }

$(function(){
  onPermission();
  onMovieReviews();
});
alert('hey');