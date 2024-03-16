import ImageCard from "./ImageCard/ImageCard";

const ImageGallery = ({ image }) => {
  if (Array.isArray(image) || image.length === 0) {
    return null;
  }
  return (
    <ul>
      {image.map((img) => (
        <li key={img.id}>
          <div>
            <ImageCard img={img} description={img.description} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
