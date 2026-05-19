import { getDogs } from "../src/apiManager.js"
import { useEffect, useState } from "react"
//import { useNavigate } from "react-router-dom"

export const ViewAllDogs = () => {
const [allDogs, setAllDogs] = useState([])

useEffect(() => {
    getDogs().then((dogsArray) => {
        setAllDogs(dogsArray)
    })
}, [])

return (
    <div className="dogs" key={dog.id}>
        <h2 className="dog-name">Name: {dog.name}</h2>
        <div>Location: {dog.CityId}</div> 
        <div>Current Walker: {dog.WalkerId}</div>
    </div>
    )
}