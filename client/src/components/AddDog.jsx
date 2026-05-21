import { createDog, getCities } from "../apiManager";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AddDog = () =>
    {
        const [ cities, setCities ] = useState([]);
        const [ name, setName ] = useState("");
        const [ cityId, setCityId ] = useState(0);
        const navigate = useNavigate();

        useEffect(() => {
        getCities().then(setCities)
        }, [] );

        const handleSubmit = () => 
        {
            createDog({ name, cityId }).then((newDog) =>
            {
                navigate(`/dogs/${newDog.id}`);
            });
        };

        return (
            <div>
                <h2>
                    Add a Dog:
                </h2>
                <input 
                type="text"
                placeholder="Dog's Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                />
                <select onChange={(event) => setCityId(parseInt(event.target.value))}>
                    <option value= "0">
                        Select a City for the Dog:
                    </option>
                    {
                        cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))
                    }
                </select>
                <button onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        )
    };

