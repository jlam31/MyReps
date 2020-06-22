
function loadClient() {
    gapi.client.setApiKey("AIzaSyCgWG3xoW4_XciXsP3hQFMmXDJzAVFwZso");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/civicinfo/v2/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded before calling this method.
  function execute() {
    let address = document.getElementById("address-query").value;
    console.log(address);
    return gapi.client.civicinfo.representatives.representativeInfoByAddress({
      "address": address,
      "levels": ["locality","administrativeArea2"]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                var indice;
                var officeElement = document.getElementById("office");
                var nameElement = document.getElementById("name");
                var profile = document.getElementById("profile-card");
                var newProfile = profile.cloneNode(true);
                
                for(i = 0; i < response.result.offices.length; i++){
                    indice = response.result.offices[i].officialIndices[0];
                    officeElement.textContent = response.result.offices[i].name
                    nameElement.textContent = response.result.officials[indice].name; 
                    
                }


            },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client");