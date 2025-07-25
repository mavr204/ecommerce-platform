import React from "react";

const ProductSpecs = (props) => {
  return (
    <tr>
      <td>{props.key}</td>
      <td>{props.value}</td>
    </tr>
  );
};

export default ProductSpecs;
