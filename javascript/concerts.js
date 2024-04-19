import { API } from "./api.js";
import { sortConcerts } from "./calendar";

export async function fetchConcerts() {
  const concerts = await API.fetchConcerts();
  return sortConcerts(concerts);
}
