import { getWalkerById, getCities, } from "../apiManager";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateWalkerCities } from "../apiManager";

export const WalkerDetails = () => {
const { id } = useParams()
const [walker, setWalker] = useState(null)
const [cities, setCities] = useState([])
const [selectedCityIds, setSelectedCityIds] = useState([])
const navigate = useNavigate()

useEffect(() => {
    getWalkerById(id).then(setWalker)
}, [id])

useEffect(() => {
    if (walker){
        setSelectedCityIds(walker.cities.map((c) => c.id))
    }
}, [walker])

useEffect(() => {
    getCities().then(setCities)
}, [])

const handleSubmit = () =>
    {
        updateWalkerCities(id, selectedCityIds ).then(() =>
    {  navigate("/walkers")
})
    };



if (!walker) {
    return <p>Loading..</p>
}

return(
    <div>
        <h1>
            {walker.name}
        </h1>
        <div>
    {cities.map((city) => (
        <div key={city.id}>
            <input type="checkbox"
            checked={selectedCityIds.includes(city.id)}
            onChange={(e) => {
                if (e.target.checked) {
                    setSelectedCityIds([...selectedCityIds, city.id])
                } else {
                    setSelectedCityIds(selectedCityIds.filter((cityId) => cityId !== city.id))
                }
            }}/>
            <label>{city.name}</label>
        </div>
    ))}
        </div>
        <button onClick={handleSubmit}>Submit</button>
    </div>
)
}



