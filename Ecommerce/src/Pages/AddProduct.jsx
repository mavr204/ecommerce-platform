import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../Context/UserContext";
import ProductService from "../Components/Data/ProductService";
import ImageService from "../Components/Data/ImageService";
import ProductSpecsService from "../Components/Data/ProductSpecsService";
import Spinner from "../Components/Icons/Spinner";

const AddProduct = () => {
  const [formError, setFormError] = useState({});
  const { handleShowSnackbar } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [specNumber, setSpecNumber] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discountPrice: "",
    category: "",
    image: null,
  });
  const [specData, setSpecData] = useState([{ specTitle: "", specValue: "" }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const error = validateForm(formData, specData);
    setFormError(error);

    if (Object.keys(error).length === 0) {
      try {
        // Filter out items with empty specTitle or specValue
        let newSpecData = specData.filter(
          (item) => item.specTitle && item.specValue
        );

        if (newSpecData.length >= 1) {
          const response = await ProductService.saveProduct(formData);
          await ImageService.saveImage(formData.image, response.data);

          // Add pid to each spec item
          newSpecData = newSpecData.map((item) => ({
            ...item,
            pid: response.data,
          }));

          // Use for...of loop to handle await inside
          for (const item of newSpecData) {
            await ProductSpecsService.addProductDetails(item);
          }

          // handleShowSnackbar("Product Added!", "success");
        } else {
          handleShowSnackbar("You need at least 5 specifications", "warning");
          setLoading(false);
          return; // Exit the function early since the conditions were not met
        }

        resetForm();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (!loading) {
      const { name, value, files } = e.target;
      const regexNumber = /^\d*\.?\d*$/;

      if (name === "image") {
        setFormData({ ...formData, image: files[0] });
      } else if (name === "price" || name === "discountPrice") {
        if (regexNumber.test(value)) {
          setFormData({ ...formData, [name]: value });
        }
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const validateForm = (values, specValue) => {
    const errors = {};
    if (!values.title) errors.title = "red";
    if (!values.price) errors.price = "red";
    if (!values.discountPrice) errors.discountPrice = "red";
    if (!values.category) errors.category = "red";
    if (values.image === null || !values.image) errors.image = "red";
    if (!specValue[0].specTitle) {
      errors.specTitle = "red";
    }
    if (!specValue[0].specValue) {
      errors.specValue = "red";
    }
    if (Object.keys(errors).length !== 0) {
      // handleShowSnackbar("Please Fill all the Fields", "error");
    }
    return errors;
  };

  const resetForm = () => {
    setSpecNumber(1);
    setFormData({
      title: "",
      price: "",
      discountPrice: "",
      category: "",
      image: null,
    });
    setFormError({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSpecData([{ specTitle: "", specValue: "" }]);
  };

  const handleAddFields = () => {
    setSpecData([...specData, { specTitle: "", specValue: "" }]);
  };

  const handleSpecChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSpecifications = [...specData];
    updatedSpecifications[index][name] = value;
    setSpecData(updatedSpecifications);
  };

  const clearSpecField = (index) => {
    const updatedSpecifications = specData.filter((_, i) => i !== index);
    setSpecData(updatedSpecifications);
    setSpecNumber(specNumber - 1);
  };

  return (
    <div className="container-edit-back">
      <div className="container-user-edit">
        <div className="profile-header">
          <h2 className="text">Add New Product</h2>
        </div>
        <hr />
        <form className="form">
          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                autoComplete="off"
              />
              <div
                className="underline"
                style={{ backgroundColor: formError.title }}
              ></div>
              <label htmlFor="title" style={{ color: formError.title }}>
                Title
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <input
                type="text"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <div
                className="underline"
                style={{ backgroundColor: formError.price }}
              ></div>
              <label htmlFor="price" style={{ color: formError.price }}>
                Price
              </label>
            </div>

            <div className="input-data">
              <input
                type="text"
                name="discountPrice"
                id="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                required
              />
              <div
                className="underline"
                style={{ backgroundColor: formError.discountPrice }}
              ></div>
              <label
                htmlFor="discountPrice"
                style={{ color: formError.discountPrice }}
              >
                Discounted Price
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
                ref={fileInputRef}
                required
              />
              <div
                className="underline"
                style={{ backgroundColor: formError.image }}
              ></div>
            </div>

            <div className="input-data">
              <select
                className="w-100 h-100"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">--Select--</option>
                <option value="prebuilt">Pre-Built PCs</option>
                <option value="laptop">Laptops</option>
                <option value="gpu">GPU</option>
                <option value="motherboard">Motherboard</option>
                <option value="cpu">CPU</option>
                <option value="ram">Ram</option>
                <option value="cabinate">PC Cases</option>
                <option value="fans">Fans</option>
                <option value="psu">Power Supply</option>
                <option value="others">Others</option>
              </select>
              <div
                className="underline"
                style={{ backgroundColor: formError.category }}
              ></div>
            </div>
          </div>

          <div className="password-container">
            <div className="close-pwd-chng text">
              <p>Add Specifications</p>
              <p
                className="chng-x"
                onClick={() => {
                  setSpecData([{ specTitle: "", specValue: "" }]);
                  setSpecNumber(1);
                }}
              >
                X
              </p>
            </div>
            <hr />
            {specData.map((spec, index) => (
              <div key={index}>
                <div className="form-row" key={index}>
                  <div className="input-data">
                    <input
                      type="text"
                      name="specTitle"
                      id="specTitle"
                      value={spec.specTitle}
                      onChange={(e) => handleSpecChange(index, e)}
                      required
                    />
                    <div
                      className="underline"
                      style={{ backgroundColor: formError.specTitle }}
                    ></div>
                    <label
                      htmlFor="specTitle"
                      style={{ color: formError.specTitle }}
                    >
                      Specification Type
                    </label>
                  </div>

                  <div className="input-data">
                    <input
                      type="text"
                      name="specValue"
                      id="specValue"
                      value={spec.specValue}
                      onChange={(e) => handleSpecChange(index, e)}
                      required
                    />
                    <div
                      className="underline"
                      style={{ backgroundColor: formError.specValue }}
                    ></div>
                    <label
                      htmlFor="specValue"
                      style={{ color: formError.specValue }}
                    >
                      Specification Value
                    </label>
                  </div>
                </div>

                {specNumber > 1 ? (
                  <div className="form-row submit-btn mb-4">
                    <div className="input-data" id="changePassword">
                      <div className="inner"></div>
                      <input
                        type="button"
                        onClick={() => {
                          clearSpecField(index);
                        }}
                        value="Remove Specification"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>

          <div className="form-row submit-btn mb-4">
            <div className="input-data" id="changePassword">
              <div className="inner"></div>
              <input
                type="button"
                onClick={() => {
                  handleAddFields();
                  setSpecNumber(specNumber + 1);
                }}
                value="Add Specification"
              />
            </div>
          </div>
          <div className="form-row submit-btn">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div className="input-data">
                  <div className="inner"></div>
                  <input type="button" value="Submit" onClick={handleSubmit} />
                </div>
                <div className="input-data">
                  <div className="inner"></div>
                  <input type="button" onClick={resetForm} value="Cancel" />
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
