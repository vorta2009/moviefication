  function onPermission(){
    $('#fbPermission').on('click',function(event){
      event.preventDefault();
      FB.login(function(){}, {scope: 'user_friends'});
    });
}

$(function(){
  onPermission();
})
alert('hey');