const msgUrl = "https://cakeshop-api.onrender.com/message";

export async function getAllMessages(chatId, token) {
  return fetch(`${msgUrl}/${chatId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  }).then((data) => data.json());
}

export async function sendMsg(content, chatId, token) {
  return fetch(`${msgUrl}/${chatId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify({content}),
  }).then((data) => data.json());
}
