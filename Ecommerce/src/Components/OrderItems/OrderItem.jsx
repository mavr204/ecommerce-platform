import { useNavigate } from "react-router-dom";

const orderItem = (props) => {
  const navigate = useNavigate();

  const handleProductOpen = () => {
    navigate("/order/" + props.orderId);
  };

  return (
    <>
      <div className="item" onClick={handleProductOpen}>
        <div>
          <div className="item-image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="item-title">
            <h3 style={{ fontSize: "25px" }}>{props.orderId}</h3>
          </div>
          <div className="item-prices">
            <div className="item-price-discount de-flex flex-column ">
              <p style={{ margin: "0" }}>
                {props.orderStatus === "shipped" ? "Delivered" : "Arriving"} on:
              </p>
              <p style={{ margin: "0" }}>{props.deliveryDate}</p>
            </div>

            <div className="item-price-discount  de-flex flex-column ">
              <p style={{ margin: "0" }}>Price:</p>
              <p style={{ margin: "0" }}>{props.discountedPrice}</p>
            </div>
          </div>
        </div>
        <div className="item-buttons" style={{ justifyContent: "center" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Buy Again
          </button>
        </div>
      </div>
    </>
  );
};

export default orderItem;
