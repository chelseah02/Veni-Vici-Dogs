import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {

  let query = `https://api.thedogapi.com/v1/images/search?api_key=${ACCESS_KEY}&has_breeds=${true}&width=${1820}&height=${980}`;
  console.log(query);
  const [currentDog, setCurrentDog] = useState({
    image: null,
    attr1: null,
    attr2: null,
    attr3: null,
  });
  const [bannedList, setBanned] = useState([]);
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
    reset();
    const response = await fetch(query);
    const json = await response.json();
    console.log("In callAPI");
    console.log(json);
    // At least one image; otherwise, try query again
    if (json[0].url == null){
      alert("Oops! Something went wrong with that query, let's try again!")
        }
    // If there are banned attributes, ensure that this query does not display them
    else if (bannedList.length != 0){
      if ((bannedList.includes(json[0].breeds[0].name)) ||
      (bannedList.includes(json[0].breeds[0].life_span)) || 
      (bannedList.includes(json[0].breeds[0].weight['imperial'] + " lbs")) ||
      (bannedList.includes(json[0].breeds[0].height['imperial'] + " inches"))) {
        callAPI(query).catch(console.error);
      }

      else {
        setCurrentDog({
          image: json[0].url,
          name: json[0].breeds[0].name,
          lifetime: json[0].breeds[0].life_span,
          weight: json[0].breeds[0].weight['imperial'],
          height: json[0].breeds[0].height['imperial'],
          });
  
      }
    }
    else {
      setCurrentDog({
        image: json[0].url,
        name: json[0].breeds[0].name,
        lifetime: json[0].breeds[0].life_span,
        weight: json[0].breeds[0].weight['imperial'],
        height: json[0].breeds[0].height['imperial'],
        });

    }
  
  }

  const handleCall = () => {
    console.log("In here!");
    callAPI(query).catch(console.error); // call query when the button is clicked
  }

  // Banned attributes
  const banAttribute = (currentDog, id) => {
    if (currentDog.image != null) {
      if (id == 0) {
        setBanned([...bannedList, currentDog.name]);
        console.log(bannedList + " is the banned list.");
      }
      else if (id == 1) {
        console.log("Reading lifetime!");
        setBanned([...bannedList, currentDog.lifetime]);
        console.log(bannedList + " is the banned list.");
      }
      else if (id == 2) {
        setBanned([...bannedList, currentDog.weight + " lbs"]);
        console.log(bannedList + " is the banned list.");
      } 
      else {
        setBanned([...bannedList, currentDog.height + " inches"]);
        console.log(bannedList + " is the banned list.");
      }
      console.log(bannedList);
    }
  }

  return (
    <div className="App">
      <div className='main'>
      <h1 className='title'>Veni Vici!</h1>
      <h3 className='title-descr'> Find a new Furry Friend! </h3>
      <button className="btn" onClick={handleCall}> Discover!</button>
      <br></br>
      {(currentDog.image != null) ? (
      <img
        className="image-container"
        src={currentDog.image}
      />
    ) : (
      <div></div>
      )}
 
    <br></br>
    {(currentDog.image != null) ? (
      <button className="btn" onClick={(e) => banAttribute(currentDog, 0)}>
        {currentDog.name}
        </button>
    ) : (
      <div></div>
      )}
    
      {(currentDog.image != null) ? (
      <button className="btn" onClick={(e) => banAttribute(currentDog, 1)}>
        {currentDog.lifetime}
        
        </button>
    ) : (
      <div></div>
      )}

      {(currentDog.image != null) ? (
      <button className="btn" onClick={(e) => banAttribute(currentDog, 2)}>
        {currentDog.weight + " lbs"}
        </button>
    ) : (
      <div></div>
      )}
      {(currentDog.image != null) ? (
      <button className="btn" onClick={(e) => banAttribute(currentDog, 3)}>
        {currentDog.height + " inches"}
        </button>
    ) : (
      <div></div>
      )}
      </div>
      <div className='banned-section'>
        <br></br>
        <br></br>
        <br></br>
        <h2> Banned List:</h2>
       {bannedList.map((element) => <button className="btn">{element}</button>)}
      </div>
    </div>

  )
}

export default App
