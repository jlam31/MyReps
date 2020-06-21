function loadClient() {
    gapi.client.setApiKey("AIzaSyCgWG3xoW4_XciXsP3hQFMmXDJzAVFwZso");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/civicinfo/v2/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded before calling this method.
  function execute() {
    return gapi.client.civicinfo.representatives.representativeInfoByAddress({
      "address": "8769 Sequoia Wood Ct"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client");