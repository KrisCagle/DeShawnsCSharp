import { useState, useEffect } from "react";
import { getCities, createCity } from "../apiManager";

export const Cities = () => {
    const [ cities, setCities] = useState([])
    const [ newCityName, setNewCityName ] = useState("")



 useEffect(() => {
        getCities().then(setCities)
        }, [] );

const handleSubmit = () =>
    {
        createCity({name: newCityName }).then(() =>
    {   getCities().then(setCities)
        setNewCityName("")
})
    };

return(
    <div>
        <h2>
            Cities
        </h2>
        <input 
        type="text"
        placeholder="Add a City"
        value={newCityName}
        onChange={(event) => setNewCityName(event.target.value)}/>
        <div className="cities">
            {cities.map((cities) => (
                <div key ={cities.id}>
                    <div className="city-name">
                        {cities.name}
                    </div>
                </div>
            ))}
 <button onClick={handleSubmit}>
                    Submit
                </button>
        </div>
    </div>

)
}

