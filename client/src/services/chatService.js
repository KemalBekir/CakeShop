const chatURL = 'http://localhost:5000/chat';

export async function getChats(token) {
    return fetch(`${chatURL}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application.json",
            "X-Authorization": token,
        }
    }).then((data) => data.json());
}