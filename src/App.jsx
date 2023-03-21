import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
//import APIForm from './components/APIForm';

function App() {

  const [inputs, setInputs] = useState({
    format: "jpeg",
    no_ads: "true",
    no_cookie_banners: "true",
    width: "1920",
    height: "1080",
  });
  let query = `https://api.thedogapi.com/v1/images/search?api_key=${ACCESS_KEY}&has_breeds=${true}&width=${1820}&height=${980}`;
  console.log(query);
  const [currentDog, setCurrentDog] = useState({
    image: null,
    attr1: null,
    attr2: null,
    attr3: null,
  });
 /*
  const submitForm = () => {
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };

  }

 if (inputs.url == "" || inputs.url == " ") {
    inputs.url = "google.com";
  }
  else{
    for (const [key, value] of Object.entries(inputs)) {
      if (value == ""){
        inputs[key] = defaultValues[key]
      }
    }
    makeQuery();
  } */

  const reset = () => {
    setCurrentDog({
      image: null,
      name: null,
      lifetime: null,
      weight: null,
      height: null,
    });
    
  }
  const callAPI = async (query) => {
    
    const response = await fetch(query);
    const json = await response.json();
    console.log("In callAPI");
    console.log(json);
    // At least one image; otherwise, try query again
    if (json[0].url == null){
      alert("Oops! Something went wrong with that query, let's try again!")
        }
    else {
      setCurrentDog({
        image: json[0].url,
        name: json[0].breeds[0].name,
        lifetime: json[0].breeds[0].life_span,
        weight: json[0].breeds[0].weight['imperial'],
        height: json[0].breeds[0].height['imperial'],
        });
      //reset();
    }
  
  }
  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
  
  }

  const handleCall = () => {
    console.log("In here!");
    callAPI(query).catch(console.error); // call query when the button is clicked
  }

  return (
    <div className="App">
      <h1>Veni Vici!</h1>
      <h3> Find a new Furry Friend! </h3>
      <button onClick={handleCall}> Discover!</button>
      <br></br>
      {currentDog ? (
      <img
        className="dog-image"
        src={currentDog.image}
      />
    ) : (
      <div></div>
      )}
 
    <br></br>
    {currentDog ? (
      <button className="dog-name">
        Name: {currentDog.name}
        </button>
    ) : (
      <div></div>
      )}
    
      {currentDog ? (
      <button className="dog-lifetime">
        Lifetime: {currentDog.lifetime}
        
        </button>
    ) : (
      <div></div>
      )}

      {currentDog ? (
      <button className="dog-weight">
        Weight: {currentDog.weight}
        </button>
    ) : (
      <div></div>
      )}
      {currentDog ? (
      <button className="dog-height">
        Height: {currentDog.height}
        </button>
    ) : (
      <div></div>
      )}
    </div>

  )
}

export default App
