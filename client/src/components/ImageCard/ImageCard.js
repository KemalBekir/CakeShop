import "./ImageCard.css";

const ImageCard = ({ cake }) => {
  return (
    <div className="image-card">
      <div className="image-card-container">
        <img className="image" src={cake.imgOne} alt={cake.desc} />
      </div>
      <div className="image-content-container">
        <h3 className="image-title">Price: £{cake.price}</h3>
      </div>
    </div>
  );
};

export default ImageCard;
