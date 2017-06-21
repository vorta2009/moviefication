alert('hey');
  function myFacebookLogin() {
      FB.login(function(){}, {scope: 'user_friends'});
  }
