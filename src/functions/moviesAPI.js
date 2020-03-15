import axios from "axios";

export async function fetchPage(movieUrl, queryParam, value) {
  if (!movieUrl) return [];

  const url = movieUrl + queryParam + value; 
  const result = await axios.get(url);
  return result.data.results;
}
