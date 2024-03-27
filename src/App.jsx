import { useEffect, useState } from "react"; // Импорт хуков useEffect и useState из React
import axios from "axios"; // Импорт библиотеки Axios для выполнения HTTP-запросов

const ACCESS_KEY = "wKCbwJZU7LnVKNt8ThEup0j5BL9vy_s9eGd1y0mvDyw"; // Ключ доступа для API Unsplash
axios.defaults.baseURL = "https://api.unsplash.com/"; // Установка базового URL для запросов к API Unsplash

const App = () => {
  const [photos, setPhotos] = useState([]); // Состояние для хранения списка фотографий
  const [query, setQuery] = useState(""); // Состояние для хранения текущего поискового запроса

  // Эффект для выполнения запроса к API Unsplash при изменении query
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
        setPhotos(data.results); // Обновление состояния photos с результатами запроса
      } catch (error) {
        console.error("Error fetching photos:", error); // Обработка ошибки при запросе
      }
    }
    fetchData(); // Вызов функции fetchData при монтировании компонента и при изменении query
  }, [query]);

  // Обработчик изменения значения в поле ввода
  const handleInputChange = (event) => {
    setQuery(event.target.value); // Обновление состояния query при изменении значения в поле ввода
  };

  // Обработчик отправки формы поиска
  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращение действия по умолчанию при отправке формы
    fetchData(); // Вызов функции fetchData для выполнения запроса при отправке формы
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
