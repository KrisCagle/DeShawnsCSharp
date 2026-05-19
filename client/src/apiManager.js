export const getGreeting = async () => {
  const res = await fetch("http://localhost:5001/api/hello");
  return res.json();
};

export const getDogs = () => {
  return fetch("http://localhost:5001/api/dogs").then((res) => res.json());
}

export const getWalkers = () => {
  return fetch("http://localhost:5001/api/walkers").then ((res) => res.json());
};


