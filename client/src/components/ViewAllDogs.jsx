import { getDogs } from "../apiManager.js"
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
    <div>
        <div className="dog-info" key={dog.id}>
            <h5 className="dog-name">
                <Link to = {`/DogDetails/${dog.id}`}>
                {dog.name}
                </Link>
            </h5>
        </div>
                <div>
                Location: {dog.cityName}
                </div> 
                <div>
                Current Walker: {dog.walkerName}
                </div>
    </div>
    ))}
    </div>
  )
};