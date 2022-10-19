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
