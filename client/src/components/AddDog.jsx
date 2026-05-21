import { createDog, getDogs } from "../apiManager";
import { useEffect, useState } from "react"
export const AddDog = () => {
const [dog, setDog] = useState({
    name: "",
    cityName: "",
    walkerName: "",
})

useEffect(() => {
getDogs().then(setDog)
}, [] )
}