var app={
  OMDB:{
    URL:'http://www.OMDBapi.com',
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
  alert('hey');
  alert('IMDB: '+data.imdbRating + ' Metascore:' + data.Metascore  + ' Rotten Tomatoes: ' + data.Ratings[1].Value );
  alert('next line');
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
    $.getJSON(app.OMDB.URL,OMDBSettings,useOMDBData);
  });
}
// function onMovieReviewsT(){

//   $('#movieReviews').on('submit',function(event){
//     event.preventDefault();
//     alert('1');

//     var movieName=$(this).find('input').val();
    
//     var OMDBSettings={
//         url:app.OMDB.URL,
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
