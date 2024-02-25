export const client = (fetch: Promise<Response>) => {
  return fetch
    .then(async (res) => {
      if (!res.ok) {
        const response = await res.json();
        throw new Error(response.message);
      }
      return res.json();
    })
    .catch((err) => console.error(err));
};
