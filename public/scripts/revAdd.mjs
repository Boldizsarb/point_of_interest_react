 /////////////////////// entire file is (12)
function AddReview(){

    const [poi,setPoi] = React.useState([]);
    let [id,setId] = React.useState("")
    

    // React.useEffect( () => {   // not yet used! 


    // }, [] );


    function searchById(){
        id = document.getElementById("id").value;
        setId(id)
        if(id <=0){
            alert("Please enter a positive number")
        } else {
            fetch(`http://localhost:3000/poi/poid/${id}`,{
                method: "POST"
            })
            .then((res) => {
                if(res.status === 404) {
                    alert("POI not found");
                }
                return res.json();
            })
            .then((data) => {
                setPoi(data);
                if(data.length === 0){
                    alert("Number is too great, please enter a lower one.");
                }
            })
        }
    }


   function show(){

        const text = document.getElementById("reviewbox")
        text.style.display = text.style.display === "none" ? "block" : "none";
   }

   function postReview(){
    
        const review = document.getElementById("textarea").value;
        const reviewDetails = {id,review}
       
        if(review && id){
            fetch(`http://localhost:3000/rev/postrev`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: reviewDetails.id, review: reviewDetails.review }), // only stringify review, not id
                    //body: JSON.stringify(reviewDetails)
                })
                .then((response) => {
                    if (response.status === 201) {
                        alert("Review submitted successfully!");
                    }
                    return response.json();
                })
                //.then(window.location.href= "/")
            }else{
                alert("Please fill up the text box!")
            }

        }

    return(
        <div id="main">

            <input type="number" id="id" placeholder="Input the id of the POI" required />
            <button onClick={searchById}>Search</button>
            
            <div>
                {poi.length > 0? (poi.map((item) => (
                    <div key={item.id}>
                        <h3>Name: {item.name}</h3>
                        <p>Type: {item.type}, 
                        Country: {item.country},
                        Region: {item.region},
                        Lon: {item.lon},
                        Lat: {item.lat},
                        Description: {item.description},
                        Recommendations: {item.recommendations},
                        Id for review: {item.id}</p>
                        <button onClick={show}>Add Review</button>
                        
                    </div>
                ))): (<p>No data</p>

                )}
            </div><br></br>
            <div id="reviewbox" style={{ display: "none" }}>
                <textarea id="textarea" placeholder="Share your thoughts about the place!" required></textarea>
                <button onClick={postReview}>Submit</button>
                

            </div>

        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root4'))
root.render(<AddReview/>)
