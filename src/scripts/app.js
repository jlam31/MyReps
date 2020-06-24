
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
      "address": "8769 sequoia wood ct", //change back to address
      "levels": ["locality","administrativeArea2"]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                var indice;
                var profileSection = document.getElementById("profile-section");
                var profileCard = document.getElementById("profile-card")
                var office;
                var name;
                var newProfile;

                //console.log(response.result);

                //for loop that goes through results and populates profile cards
                for(i = 0; i < response.result.offices.length; i++){
                    var office = document.createElement('p');
                    var name = document.createElement('p');
                    newProfile = profileCard.cloneNode(true);

                    indice = response.result.offices[i].officialIndices[0];
                    office.textContent = response.result.offices[i].name
                    name.textContent = response.result.officials[indice].name; 

                   
                    newProfile.appendChild(office);
                    newProfile.appendChild(name);
                    profileSection.append(newProfile);
                }


            },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client");