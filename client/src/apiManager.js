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