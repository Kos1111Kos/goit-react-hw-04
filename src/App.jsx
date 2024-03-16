import { useEffect, useState } from "react";

import styles from "./App.module.css";

import SearchBox from "./components/SearchBox/SearchBox";
import { requestPhoto } from "./components/ApiServises/ApiServises";
import ImageGallery from "../components/ImageGallery/ImageGallery";

const App = () => {
  const [photos, setPhotos] = useState(null);
  const [image, setImage] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const data = await requestPhoto();
      setPhotos(data.photos);
    }
    fetchData();
  }, []);

  return (
    <>
      <ImageGallery image={image} />
    </>
  );
};

export default App;
