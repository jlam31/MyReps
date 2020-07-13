
window.onload = function loadClient() {
    gapi.client.setApiKey("AIzaSyA9mm7CiwN2pUAWR6DdgqDvbl33k40_xRg");
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
      "roles": ["legislatorUpperBody", "legislatorLowerBody"]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                
                console.log(response.result);
                //u.s senator
                for(i = 0; i < response.result.offices[0].officialIndices.length; i++){
                    let indice = response.result.offices[0].officialIndices[i];
                    let name = response.result.officials[indice].name;
                    let party = response.result.officials[indice].party;
                    let phone = response.result.officials[indice].phones[0];
                    let urls = response.result.officials[indice].urls[0];

                    let itm = document.getElementById("sen-profile")
                    let node = itm.cloneNode(true);

                    document.getElementById("name").innerHTML = name;
                    document.getElementById("party").innerHTML = party;
                    document.getElementById("phone").innerHTML = phone;
                    document.getElementById("url").innerHTML = urls;

                    if(i>=1){
                      let parentElement = document.getElementById("sen-columns");
                      parentElement.appendChild(node); 
                    }
                }

                //u.s rep (might not need to clone, there might just be one per district?)
                for(i = 0; i < response.result.offices[1].officialIndices.length; i++){
                    let indice = response.result.offices[1].officialIndices[i];
                    let name = response.result.officials[indice].name;
                    let party = response.result.officials[indice].party;
                    let phone = response.result.officials[indice].phones[0];
                    let urls = response.result.officials[indice].urls[0];

                    let itm = document.getElementById("rep-profile")
                    let node = itm.cloneNode(true);

                    document.getElementById("rep-name").innerHTML = name;
                    document.getElementById("rep-party").innerHTML = party;
                    document.getElementById("rep-phone").innerHTML = phone;
                    document.getElementById("rep-url").innerHTML = urls;

                    if(i>=1){
                      let parentElement = document.getElementById("rep-columns");
                      parentElement.appendChild(node); 
                    }
                }
        

            },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client"); 
