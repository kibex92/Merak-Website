import { API } from "./api.js";

export default async function fetchConcerts() {
  return await API.fetchConcerts();
}