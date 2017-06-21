
  function onPermission(){
    $('#fbPermission').on('click',function(event){
      event.preventDefault();
      FB.login(function(){
        FB.api('/me', {fields: 'last_name'}, function(response) {
          alert(response);
        });
      }, {scope: 'user_friends,email'});
    });
}
function onTest(){
  $('#btnTest').on('click',function(event){
    alert('hey');
    
  });
}

$(function(){
  onPermission();
  onTest();
})
// alert('hey');
