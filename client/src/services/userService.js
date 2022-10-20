export async function loginUser({ email, password }) {
  return fetch("http://localhost:5000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((data) => data.json());
}

export async function registerUser({ username, email, password }) {
    return fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, tel }),
      }).then((data) => data.json());
}

export async function getProfile(token) {
    return fetch("http://localhost:5000/users/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token,
        },
    }).then((data) => data.json());
}

export async function logout(token){
    return fetch('http://localhost:5000/users/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    }).then(() => localStorage.clear());
}
