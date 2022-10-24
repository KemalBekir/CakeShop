const catalogUrl = "http://localhost:5000/catalog";

export async function getAll() {
    return fetch(`${catalogUrl}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
}