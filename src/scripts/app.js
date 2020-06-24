
window.onload = function loadClient() {
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
                let indice;
                let profileSection = document.getElementById("profile-section");
                let profileCard = document.getElementById("profile-card")

                let office;
                let name;
                let party;
                let phone;
                let email;
                
                let newProfile;

                console.log(response.result);
                //for loop that goes through results and populates profile cards
                for(i = 0; i < response.result.offices.length; i++){
                    office = document.createElement('p');
                    name = document.createElement('p');
                    party = document.createElement('p');
                    phone = document.createElement('p')
                    email = document.createElement('p');

                    newProfile = profileCard.cloneNode(true);

                    indice = response.result.offices[i].officialIndices[0];
                    office.textContent = response.result.offices[i].name
                    name.textContent = response.result.officials[indice].name; 
                    party.textContent = response.result.officials[indice].party;
                    phone.textContent = response.result.officials[indice].phones[0];
                    email.textContent = response.result.officials[indice].emails[0];

                    console.log(name + party + phone + email);
                   
                    newProfile.appendChild(office);
                    newProfile.appendChild(name);
                    newProfile.appendChild(party);
                    newProfile.appendChild(phone);
                    newProfile.appendChild(email);
                    profileSection.append(newProfile);
                }


            },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client");