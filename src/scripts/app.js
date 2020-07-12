
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
                let name;
                let party;
                let phone;
                let urls;

                let indicie;
                let numIndicie = response.result.offices[0].officialIndices.length;

                console.log(response.result);
                //u.s senator
                for(i = 0; i < response.result.offices[0].officialIndices.length; i++){
                    indice = response.result.offices[0].officialIndices[i];
                    name = response.result.officials[indice].name;
                    party = response.result.officials[indice].party;
                    phone = response.result.officials[indice].phones[0];
                    urls = response.result.officials[indice].urls[0];

            
              
                    document.getElementById("name").innerHTML = name;
                    document.getElementById("party").innerHTML = party;
                    document.getElementById("phone").innerHTML = phone;
                    document.getElementById("url").innerHTML = urls;

                    var itm = document.getElementById("profile")
                    var node = itm.cloneNode(true);
                    var parentElement = document.getElementById("appendHere");
                    parentElement.appendChild(node);
                }
        

            },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client"); 
