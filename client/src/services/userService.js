export async function loginUser({ email, password }) {
  return fetch("https://cakeshop-api.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((data) => data.json());
}

export async function registerUser({ username, email, password }) {
    return fetch("https://cakeshop-api.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }).then((data) => data.json());
}

export async function getProfile(token) {
    return fetch("https://cakeshop-api.onrender.com/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token,
        },
    }).then((data) => data.json());
}

export async function logout(token){
    return fetch('https://cakeshop-api.onrender.com/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    }).then(() => localStorage.clear());
}
