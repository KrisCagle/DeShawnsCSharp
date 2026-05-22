import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getDogs } from "../apiManager"
import { getWalkerById } from "../apiManager"
import { assignDogToWalker } from "../apiManager"

export const AssignDog = () =>
{
const [dog, setDog] = useState([])
const { id } = useParams()
const navigate = useNavigate() 
const [walker, setWalker] = useState(null)

useEffect(() => {
    getDogs().then((dogArray) => {
        setDog(dogArray);
    })
}, [])


useEffect(() => {
    getWalkerById(id).then((w) =>
    setWalker(w))
}, [])

if (!walker) return null

const eligibleDogs = dog.filter((d) =>
    d.walkerId === null &&
    walker.cities.some((c) => c.id === d.cityId)
)




return (
    <div>
<h2>Assign a dog to {walker.name}</h2>
{eligibleDogs.map((d) => (
    <div key={d.id} onClick={() => {
        assignDogToWalker(d.id, { walkerId: parseInt(id) })
            .then(() => navigate(`/dogs/${d.id}`))
    }}>
        {d.name}
    </div>
))}

    </div>
)
}