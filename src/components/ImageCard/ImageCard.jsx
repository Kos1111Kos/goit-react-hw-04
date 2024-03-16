const ImageCard = ({ img, description }) => (
  <div>
    <img src={img.urls.small} alt={img.description} />
    <p>{description}</p>
  </div>
);

export default ImageCard;