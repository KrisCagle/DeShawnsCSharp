import { getCities, getWalkers } from "../apiManager.js"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

//import { useNavigate } from "react-router-dom"

export const ViewAllWalkers = () => {
const [walker, setWalker] = useState([])
const [cities, setCities] = useState([])
const [selectedCity, setSelectedCity] = useState("all")
useEffect(() => {
    getWalkers().then((walkerArray) => {
        setWalker(walkerArray);
    })
}, [])

useEffect(() => {
    getCities().then((citiesArray) => {
        setCities(citiesArray);
    })
}, [])

const filteredWalkers = selectedCity === "all"
? walker
: walker.filter((w) => w.cities.some((c) => c.id === parseInt(selectedCity)))

return (
    <div className="walkers">
        <select onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="all">All Cities</option>
            {cities.map((city) => (
                <option key={city.id} value ={city.id}>{city.name}</option>
            ))}
        </select>
      {filteredWalkers.map((walker) => (
        <div key={walker.id}>
          <h5 className="walker-name">
            <Link to={`/walkers/${walker.id}`}>{walker.name}</Link>
          </h5>
        <div>Location: {walker.cities?.map((city) => city.name).join(", ")}</div>
        <Link to={`/walkers/${walker.id}/assign`}>
        <button>Add Dog</button>
      </Link>
        </div>
      ))}
    </div>
  );
  };