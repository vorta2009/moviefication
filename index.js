
  function onPermission(){
    $('#fbPermission').on('click',function(event){
      event.preventDefault();
      FB.login(function(){}, {scope: 'user_friends'});
    });
}
function onTest(){
  $('#btnTest').on('click',function(event){
    FB.api('/me', {fields: 'last_name'}, function(response) {
    console.log(response);
    })
  });
}

$(function(){
  onPermission();
})
// alert('hey');