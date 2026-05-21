import { getDogs, createDog } from "../apiManager.js"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

//import { useNavigate } from "react-router-dom"

export const ViewAllDogs = () => {
const [allDogs, setAllDogs] = useState([])

useEffect(() => {
    getDogs().then((dogsArray) => {
        setAllDogs(dogsArray)
    })
}, [])

return (
  <div className="dogs">
    {allDogs.map((dog) => (
      <div key={dog.id}>
        <h5 className="dog-name">
          <Link to={`/dogs/${dog.id}`}>{dog.name}</Link>
        </h5>
        <div>Location: {dog.city?.name}</div>
        <div>
          Current Walker:{" "}
          {dog.walker ? dog.walker.name : "No walker assigned to this dog"}
        </div>
      </div>
    ))}
    <Link to="/dogs/Add">
    <button>Add Dog</button>
    </Link>
  </div>
);
}; 