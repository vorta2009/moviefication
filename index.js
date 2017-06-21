
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
