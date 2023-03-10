import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";

const initialState = {
  date: "",
  name: "",
  intakecalorie: "",
  targetincalorie: "",
  burncalorie: "",
  targetburncalorie: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const {
    date,
    name,
    intakecalorie,
    targetincalorie,
    burncalorie,
    targetburncalorie,
  } = state;
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !intakecalorie ||
      !targetincalorie ||
      !burncalorie ||
      !targetburncalorie
    ) {
      alert("Enter Value");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {})
          .then(() => {
            setState({ name: "", food: "", calorie: "", quantity: "" });
          })
          .catch((err) => console.log(err.response.data));
        alert("Added successful");
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            date,
            name,
            intakecalorie,
            targetincalorie,
            burncalorie,
            targetburncalorie,
          })
          .then(() => {
            setState({
              name: "",
              intakecalorie: "",
              targetincalorie: "",
              burncalorie: "",
              targetburncalorie: "",
            });
          })
          .catch((err) => console.log(err));
        // toast.success("Details updated successfully");
      }

      setTimeout(() => {
        navigate("/home");
      }, 500);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        {/* <label htmlFor="name">Name</label> */}
        {/* <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name ..."
          value={name || ""}
          onChange={handleInputChange}
        /> */}

        <label htmlFor="intakecalorie">Calorie Intake</label>
        <input
          type="text"
          id="intakecalorie"
          name="intakecalorie"
          placeholder="Your intake calorie.."
          value={intakecalorie || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="targetincalorie">Target Calorie</label>
        <input
          type="text"
          id="targetincalorie"
          name="targetincalorie"
          placeholder="Your target calorie intake.."
          value={targetincalorie || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="burncalorie">Burn Calorie</label>
        <input
          type="number"
          id="burncalorie"
          name="burncalorie"
          placeholder="Your burn calorie.."
          value={burncalorie || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="targetburncalorie">Target Burn Calorie</label>
        <input
          type="number"
          id="targetburncalorie"
          name="targetburncalorie"
          placeholder="Your target burn calorie.."
          value={targetburncalorie || ""}
          onChange={handleInputChange}
        />

        <Link to="/api/update"></Link>
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/home">
          <input type="button" value="Go back" />
        </Link>
      </form>
    </div>
  );
};
export default AddEdit;


