import axios from "axios";

const ACCESS_KEY = "wKCbwJZU7LnVKNt8ThEup0j5BL9vy_s9eGd1y0mvDyw";
axios.defaults.baseURL = "https://api.unsplash.com/";

export const apiServises = async (query, page) => {
  const { data } = await axios.get("/search/photos/", {
    params: {
      client_id: ACCESS_KEY,
      query: query,
      per_page: 20,
      page: page,
    },
  });
  return data;
};

export default apiServises;
