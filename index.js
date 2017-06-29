var app={

  OMDB:{
    url:'https://www.OMDBapi.com',
    apiKey:'e706bc8'
  },
  tasteDive:{
    url:'https://tastedive.com/api/similar',
    apiKey:'274055-moviefic-4YV5JJJB'
  },
  primaryMovieName:'',
  movieHTMLArr:[],
  simObj:{},
  i:-2
};

function makeTeaserText(wTeaser){
  var teaserLen=260;
  var text=wTeaser.substring(0,teaserLen);
  text=text.replace(/\w+$/, '');
  text+='...';
  return text;
}

function makeOMDBDiv(data){
// Uses data from OMDB API to populate a template div
  var newDiv=$('#template').clone();
  newDiv.find('#moviePic').attr('src',  (data.moviePic==="N/A"?'':data.moviePic)  );
  newDiv.find('#rating').text(data.rated);
  newDiv.find('#releaseYear').text(data.releaseYear);
  if (app.i>=0){
    console.log("i: "+app.i + " movie: " +data.movieName);
    newDiv.find('#plot').text(makeTeaserText(app.simObj.Results[app.i].wTeaser));
    }
  newDiv.find('#metacritic').text(data.metacritic);
  newDiv.find('#IMDB').text(data.IMDB);
  newDiv.find('#rottenTomatoes').text(data.rottenTomatoes);
  newDiv.find('.getSimMovies').attr('mu-v',data.movieName);
  newDiv.removeAttr('id');
  app.movieHTMLArr.push(newDiv);
  
  if ('Results' in app.simObj)
  {
    if (app.i===app.simObj.Results.length-1){
       $(app.movieHTMLArr[0]).find('#plot').text(makeTeaserText(app.simObj.Info[0].wTeaser));
       app.movieHTMLArr.slice(1,app.movieHTMLArr.length).map(function(elem,index){
        return $(elem).find('#plot').text(makeTeaserText(app.simObj.Results[index].wTeaser));
       });
  

    app.movieHTMLArr=app.movieHTMLArr.slice(0,1).concat(app.movieHTMLArr.slice(1,app.movieHTMLArr.length).sort(function(a,b){
      return parseFloat(  ($(b).find('#metacritic').text()==="N/A" || $(b).find('#rating').text()==="R")?"0":$(b).find('#metacritic').text())
        - parseFloat(($(a).find('#metacritic').text()==="N/A" || $(a).find('#rating').text()==="R")?"0":$(a).find('#metacritic').text())
      }));
    $('#moviesHere').append(app.movieHTMLArr);
}
  }
}

function runReviewAJAX(data){
// Callback function for OMDB API, collects all relevant movie info and passes as object to >>> makeOMDBDiv  
    app.i++;
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
  // console.log(OMDBData);
  makeOMDBDiv(OMDBData);
}


function handleTasteDiveOutput(data){
  //store an array of tasteDive similar movie results in our app variable to access later
  console.log(data.Similar.Results);
  app.movieHTMLArr=data.Similar.Results;
  app.firstMovie=data.Similar.Info;
  for (i=0;i<app.movieHTMLArr.length;i++){
    findReviews(app.movieHTMLArr[i].Name);
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
    $.getJSON(app.tasteDive.url,settings,function(result){   
        app.simObj=result.Similar;
     })
    .done(function(){
        for(i=0;i<app.simObj.Results.length;i++){
          findReviews(app.simObj.Results[i].Name);
        }
    });

}

function findReviews(movieName){
      var OMDBSettings={           
      apikey: app.OMDB.apiKey,
      t: movieName
    };
    console.log(movieName);
    $.getJSON(app.OMDB.url,OMDBSettings, function(result){
        runReviewAJAX(result);
        });
}
function findReviews1(movieName){
  // This is supposed to find the correct movie name for the top-line movie
      var OMDBSettings={           
      apikey: app.OMDB.apiKey,
      t: movieName
    };
    console.log(movieName);
    $.getJSON(app.OMDB.url,OMDBSettings).done( function(result){
        app.primaryMovieName=result.Title;
        runReviewAJAX(result);
      });
}



function createPage(movieName){
 // 
$('#chosenMovie').empty();
$('#moviesHere').empty();
app.movieHTMLArr=[];
app.simObj={};
app.primaryMovieName="";
app.i=-2;

 findReviews(movieName); 
  findSimMovies(movieName);
  
}

function onSimilarMovies(){
  $('#moviesHere').on('submit','.getSimMovies',function(event){
    event.preventDefault();
    createPage($(this).attr('mu-v'));
  });
}

function onMovieReviews(){
  // Handles user querying a movie in top-left movie bar
  $('#movieReviews').on('submit',function(event){
    event.preventDefault();
    var movieName=$(this).find('input').val();
    createPage(movieName);
  });
}

$(function(){
  onMovieReviews();
  onSimilarMovies();
});
// alert('Page Start');
