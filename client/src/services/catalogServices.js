const catalogUrl = "http://localhost:5000/catalog";

export async function getAll() {
  return fetch(`${catalogUrl}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

export async function getTopFive() {
  return fetch(`${catalogUrl}/top5`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

export async function search(text) {
  return fetch(`${catalogUrl}/search?text=${text}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

export async function myCakes(token) {
  return fetch(`${catalogUrl}/myCakes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  }).then((data) => data.json());
}

export async function getCakeById(cakeId) {
  return fetch(`${catalogUrl}/${cakeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

export async function createCake(cake, token) {
  return fetch(`${catalogUrl}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(cake),
  }).then((data) => data.json());
}

export async function editCake(cakeId, cake, token) {
  return fetch(`${catalogUrl}/${cakeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(cake),
  }).then((data) => data.json());
}

export async function deleteCake(cakeId, token) {
  return fetch(`${catalogUrl}/${cakeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  });
}
