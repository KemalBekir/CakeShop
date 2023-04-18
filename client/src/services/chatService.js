const chatURL = "https://cakeshop-api.onrender.com/chat";

export async function getChats(token) {
  return fetch(`${chatURL}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  }).then((data) => data.json());
}

export async function accessChat(token, ownerId) {
  return fetch(`${chatURL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify({ ownerId }),
  }).then((data) => data.json());
}

