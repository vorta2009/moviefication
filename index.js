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

function useOMDBData(data){
// Callback function for OMDB API, collects ratings and posts these
  var rottenTomatoes;
  if (data.Ratings.length>1) then{
    rottenTomatoes=data.Ratings[1].Value;
  }
  else{
    rottenTomatoes="N/A";
  }
  var IMDB=data.imdbRating;
  var metacritic=data.Metascore;
  var releaseYear=data.Year;
  var rated=data.Rated;
  var plot=data.Plot;
  var moviePic=data.Poster;

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
