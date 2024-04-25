const API = {
  url: "/data/concerts.json",
  fetchConcerts: async () => {
    const result = await fetch(API.url);
    return await result.json();
  },
};
export { API };
