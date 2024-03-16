import { useEffect, useState } from "react";
import axios from "axios";

const ACCESS_KEY = "wKCbwJZU7LnVKNt8ThEup0j5BL9vy_s9eGd1y0mvDyw";
axios.defaults.baseURL = "https://api.unsplash.com/";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/search/photos/", {
          params: {
            client_id: ACCESS_KEY,
            query: query,
            per_page: 20,
            page: 1,
          },
        });
        setPhotos(data.results);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    }
    fetchData();
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search images and photos"
            value={query}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <div>
              <img src={photo.urls.small} alt={photo.alt_description} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
