import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
// import './home.css'
import axios from "axios";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const Home = () => {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("des");
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const loadData = async (id) => {
    console.log(id);
    await axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((response) => {
        console.log("=======>>", response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    const id = getId();
    setId(id);
    loadData(id);
  }, []);

  const getId = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    // console.log("clg-->", data[0].id);
    setName(data[0].name);
    return data[0].id;
  };

  const deleteContact = (id) => {
    axios
      .delete(`http://localhost:5000/api/remove/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("error", err);
      });
    loadData(id);
    // toast.success("Contact Deleted Successfully");
    // setTimeout(() => loadData(), 500);
  };

  const sorting = () => {
    axios
      .get(`http://localhost:5000/get/sorting/${sort}`, { id: 123 })
      .then((res) => {
        console.log(res.data);
        sort == "ase" ? setSort("des") : setSort("ase");
        return setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [toggle, setToggle] = useState(true)

  return (
    <div>

<h2 className="nameText">Hii {name}</h2>

      <div className="today">

        <Link to="/today">
          <button className="btn1 btn-contact hover2">Add Today's Plan</button>
        </Link>

      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }} className="hover">No.</th>
            <th style={{ textAlign: "center" }} className="hover" onClick={sorting}>
              Date
              {sort == "ase" ? <AiFillCaretUp /> : <AiFillCaretDown />}
            </th>

            <th style={{ textAlign: "center" }} className="hover">Intake Calorie</th>
            <th style={{ textAlign: "center" }} className="hover">Target Intake Calorie</th>
            <th style={{ textAlign: "center" }} className="hover">Burn Calorie</th>
            <th style={{ textAlign: "center" }} className="hover">Target Burn Calorie</th>
            <th style={{ textAlign: "center" }} className="hover"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}   className="hover1">
                <th scope="row">{index+1}</th>
                <td>{item.date}</td>
                <td>{item.intakecalorie}</td>
                <td>{item.targetincalorie}</td>
                <td>{item.burncalorie}</td>
                <td>{item.targetburncalorie}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn1 btn-edit hover3">Edit</button>
                  </Link>
                  <button
                    className="btn1 btn-delete "
                    onClick={() => deleteContact(item.id)}
                  >
                    Delete
                  </button>

                  </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
            onClick={() => setToggle(!toggle)}
            class="btn btn-primary mb-5  set-Position blink">
          Info
      </button>
      <div className="size-toggle">
      {toggle && (
        <ul class="list-group">
          <li class="list-group-item">Age</li>
          <span class="list-group-item">12-18 (adolescents: 3200)</span>
          <li class="list-group-item">19-50(adult: 3000)</li>
          <li class="list-group-item">50-70(old: 2500)</li>
          </ul>

      )}
</div>

<footer className="logout hover4">
<Link to="/" >
          <input type="button" value="log out"  className="tdbtn" />
        </Link>
</footer>

    </div>
  );
};
export default Home;
