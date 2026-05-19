import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDogById } from "../apiManager.js"


export const DogDetails = () => {
    const { id } = useParams()
    const [dogDetails, setDogDetails] = useState(null)

    const fetchDogs = () => {
        getDogById(id).then(setDogDetails)
    }
    useEffect(() => {
        fetchDogs()
    }, [id])

    if (!dogDetails) {
        return <p>Loading..</p>
    }

    return (
        <div>
            <h2>{dogDetails.name}</h2>
            <p>City: {dogDetails.cityName}</p>
            <p>Walker: {dogDetails.walkerName}</p>
        </div>
    )
}
