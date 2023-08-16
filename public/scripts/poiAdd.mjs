function AddPoi(){

  function postPoi() {
      const name = document.getElementById("name").value;
      const type = document.getElementById("type").value;
      const country = document.getElementById("country").value;
      const region = document.getElementById("region").value;
      const lon = document.getElementById("lon").value;
      const lat = document.getElementById("lat").value;
      const description = document.getElementById("description").value;
      const recommendation = 0; // since the recommendation is zero from the beginning 

      if (!name || !type || !country || !region || !lon || !lat || !description) {   ///////// Error checking////////// (7)
        let misingplaces = []
          // If any of the required inputs are missing, make the input box red
          if (!name) {document.getElementById("name").style.borderColor = "red"; misingplaces.push("Name of the place ")}
          if (name) document.getElementById("name").style.borderColor = "green"; 
          if (!type) {document.getElementById("type").style.borderColor = "red";misingplaces.push(" Type of the place")}
          if (type) document.getElementById("type").style.borderColor = "green";
          if (!country) {document.getElementById("country").style.borderColor = "red"; misingplaces.push(" Country")}
          if (country) document.getElementById("country").style.borderColor = "green"; 
          if (!region) {document.getElementById("region").style.borderColor = "red"; misingplaces.push(" Region")}
          if (region) document.getElementById("region").style.borderColor = "green";
          if (!lon) {document.getElementById("lon").style.borderColor = "red"; misingplaces.push(" Longtitude")}
          if (lon) document.getElementById("lon").style.borderColor = "green";
          if (!lat) {document.getElementById("lat").style.borderColor = "red"; misingplaces.push(" Lattitude")}
          if (lat) document.getElementById("lat").style.borderColor = "green";
          if (!description) {document.getElementById("description").style.borderColor = "red"; misingplaces.push(" Description")}
          if (description) document.getElementById("description").style.borderColor = "green";

          alert(`Missing Places: ${misingplaces}`)
          return;
      }
  
      fetch(`http://localhost:3000/poi/addpoi/${name}/${type}/${country}/${region}/${lon}/${lat}/${description}/${recommendation}`, {
          method: "POST",
      })
      .then((response) => {  ///////// Error checking////////// (7)  ///////// Error checking////////// (7) ///////// Error checking////////// (7)
          if (response.ok) {
            alert("Place submitted successfully!");
            // direct back to the homepage
            window.location.href = "/"  // back to homepage if status == 201
          } else if (response.status === 404) {
            alert("Error: Input not found");
            // Make the input box red if it was not found
            document.getElementById(response.statusText.toLowerCase()).style.borderColor = "red";
          } else if(response.status === 401){
            alert("Error: You're not logged in.");   /// (11)
          } 
          else {
            alert("Error submitting recommendation");
          }
          return response.json();
        })
      
  }

  return(
      <div id="main">
          <h3> Input Details:</h3>
          <input type="text" id="name" placeholder="Input the name of the Place"  />
          <input type="text" id="type" placeholder="Is it a city? or town?"  />
          <input type="text" id="country" placeholder="What country?"  />
          <input type="text" id="region" placeholder="Input the region of the Place"  />
          <input type="number" id="lon" placeholder="Input the longitude"  />
          <input type="number" id="lat" placeholder="Input the lattitude"  />
          <input type="text" id="description" placeholder="Describe the place"  />

          <button id="searchButton" value="submit" onClick={postPoi}>Submit</button>
      </div>
      
  );  
}

const root3 = ReactDOM.createRoot(
  document.getElementById('root3')
);

root3.render(
  <AddPoi  />
);