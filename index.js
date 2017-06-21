
  function onPermission(){
    $('#fbPermission').on('click',function(event){
      event.preventDefault();
      FB.login(function(){}, {scope: 'user_friends'});
    });
}
function onTest(){
  $('#btnTest').on('click',function(event){
    console.log('hey');
    FB.api('/me', {fields: 'last_name'}, function(response) {
    console.log(response);
    })
  });
}

$(function(){
  onPermission();
  onTest();
})
// alert('hey');