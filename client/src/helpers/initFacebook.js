import Parse from "parse";

function initFacebook() {
  window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
      appId: "954266884973298", // Facebook App ID
      cookie: true, // enable cookies to allow Parse to access the session
      xfbml: true, // initialize Facebook social plugins on the page
      version: "v6.0" // point to the latest Facebook Graph API version
    });
    // Run code after the Facebook SDK is loaded.
    // ...
  };

  // Load Facebook SDK
  (function(d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
}

export default initFacebook;
