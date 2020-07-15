
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
                    document.getElementById("url").setAttribute("href", encodeURIComponent(urls))

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


                //state senator (might not need to clone, there might just be one per district?)
                for(i = 0; i < response.result.offices[2].officialIndices.length; i++){
                  let indice = response.result.offices[2].officialIndices[i];
                  let name = response.result.officials[indice].name;
                  let party = response.result.officials[indice].party;
                  let phone = response.result.officials[indice].phones[0];
                  let urls = response.result.officials[indice].urls[0];

                  let itm = document.getElementById("state-sen-profile")
                  let node = itm.cloneNode(true);

                  document.getElementById("state-sen-name").innerHTML = name;
                  document.getElementById("state-sen-party").innerHTML = party;
                  document.getElementById("state-sen-phone").innerHTML = phone;
                  document.getElementById("state-sen-url").innerHTML = urls;

                  if(i>=1){
                    let parentElement = document.getElementById("state-sen-columns");
                    parentElement.appendChild(node); 
                  }
              }

              //state assembly(might not need to clone, there might just be one per district?)
              for(i = 0; i < response.result.offices[3].officialIndices.length; i++){
                let indice = response.result.offices[3].officialIndices[i];
                let name = response.result.officials[indice].name;
                let party = response.result.officials[indice].party;
                let phone = response.result.officials[indice].phones[0];
                let urls = response.result.officials[indice].urls[0];

                let itm = document.getElementById("assem-profile")
                let node = itm.cloneNode(true);

                document.getElementById("assem-name").innerHTML = name;
                document.getElementById("assem-party").innerHTML = party;
                document.getElementById("assem-phone").innerHTML = phone;
                document.getElementById("assem-url").innerHTML = urls;

                if(i>=1){
                  let parentElement = document.getElementById("assem-columns");
                  parentElement.appendChild(node); 
                }
            }
        
            document.getElementById("section-container").removeAttribute("style");

            },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client"); 
