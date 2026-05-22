export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getDogs = () => {
  return fetch("/api/dogs").then((res) => res.json());
}

export const getWalkers = () => {
  return fetch("/api/walkers").then ((res) => res.json());
};

export const getDogById = (id) => {
  return fetch(`/api/dogs/${id}`).then((res) => res.json());
};
export const getWalkerById = (id) => {
  return fetch(`/api/walkers/${id}`).then((res) => res.json());
}
export const createDog = (dog) => {
return fetch(`/api/dogs`, {
  method: "POST",
  headers: { "Content-Type" : "application/json" },
  body: JSON.stringify(dog), 
}).then((res) => res.json())
};

export const getCities = () => {
  return fetch("/api/cities").then((res) => res.json());
};

export const assignDogToWalker = (id, dog) => {
  return fetch(`/api/dogs/${id}`, {
    method: "PUT",
    headers: {"Content-Type" : "application/json" },
    body: JSON.stringify(dog),
  })
};

export const createCity = (city) => {
return fetch(`/api/cities`, {
  method: "POST",
  headers: { "Content-Type" : "application/json" },
  body: JSON.stringify(city), 
}).then((res) => res.json())
};

export const updateWalkerCities = (id, cityIds) => {
  return fetch(`/api/walkers/${id}/cities`, {
    method: "PUT",
    headers: {"Content-Type" : "application/json" },
    body: JSON.stringify(cityIds)
  })
}

export const deleteDog = (id) => {
  return fetch(`/api/dogs/${id}`, {
    method: "DELETE"
  })
}

export const deleteWalker = (id) => {
  return fetch(`/api/walkers/${id}`, {
    method: "DELETE"
  })
}