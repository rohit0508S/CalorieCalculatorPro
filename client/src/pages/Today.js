import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Today = () => {
  const [fooditem, setFooditem] = useState([]);
  const [energyburn, setEnergyburn] = useState([]);
  const [ageCalorie, SetageCalorie] = useState({
    adolescents: 3200,
    adult: 3000,
    old: 2500,
  });




  const [age, setAge] = useState(0);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [mainData, setMainData] = useState({
    date: "",
    intakecalorie: 0,
    targetincalorie: 0,
    burncalorie: 0,
    targetburncalorie: 0,
    fk: 0,
  });



  const [check, setCheck] = useState({
    loading: false,
    setIntakeCalorie: false,
    setBurnCalorie: false,
  });


  useEffect(() => {
    getFoodItem();
    getEnergyBurn();
    getDate();
  }, []);




  const getFoodItem = () => {
    axios
      .get("http://localhost:5000/fooditem/get")
      .then((res) => {
        setFooditem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const getEnergyBurn = () => {
    axios
      .get("http://localhost:5000/energyburn/get")
      .then((res) => {
        console.log(res);
        setEnergyburn(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  let dropdown = fooditem.map((val) => {
    return <option value={val.food}>{val.food}</option>;
  });



  let dropdown1 = energyburn.map((val) => {
    return <option value={val.activity}>{val.activity}</option>;
  });



  const intake = (value) => {
    // console.log(value);
    fooditem.map((val) => {
      if (value === val.food) {
        console.log("intake", val);
        let obj = {
          food: val.food,
          energy: val.calories,
        };
        setData1([...data1, obj]);
        setMainData({
          ...mainData,
          intakecalorie: mainData.intakecalorie + val.calories,
        });
        return;
      }
      // return null;
    });
  };



  const burn = (value) => {
    energyburn.map((val) => {
      if (value === val.activity) {
        console.log("burn", val);
        let obj = {
          activity: val.activity,
          energy: val.calorieburn,
        };
        setData2([...data2, obj]);
        setMainData({
          ...mainData,
          burncalorie: mainData.burncalorie + val.calorieburn,
        });
        return ;
      }
      // return null;
    });
  };


  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "-" + mm + "-" + yyyy;
    console.log(today);
    // setMainData({ ...mainData, date: today });
    const data = JSON.parse(localStorage.getItem("data"));
    // console.log("data-->", data[0].id);
    setMainData({ ...mainData, date: today, fk: data[0].id });
    setAge(data[0].age);
    // console.log("ageee", data[0].age);
  };

  const saveData = () => {
    console.log("=====>", mainData);
    axios
      .post("http://localhost:5000/api/post", mainData)
      .then((res) => {
        console.log("res---", res);
        setCheck({ ...check, loading: false });
        clearData();
        alert("Data inserted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearData = () => {
    let obj = {
      date: "",
      // name: "",
      intakecalorie: 0,
      targetincalorie: 0,
      burncalorie: 0,
      targetburncalorie: 0,
    };
    setMainData(obj);
    let obj1 = {
      name: false,
      setIntakeCalorie: false,
      setBurnCalorie: false,
    };
    setCheck(obj1);
    setData1([]);
    setData2([]);
    console.log("clear data");
  };

  const checkAge = () => {
    if (age < 19) {
      if (mainData.targetincalorie > ageCalorie.adolescents) {
        alert(`Energy Limit Extented for ${age}`);
        setMainData({ ...mainData, targetincalorie: 0 });
        return false;
      }
    } else if (age < 41) {
      if (mainData.targetincalorie > ageCalorie.adolescents) {
        alert(`Energy Limit Extented for ${age}`);
        setMainData({ ...mainData, targetincalorie: 0 });
        return false;
      }
    } else {
      if (mainData.targetincalorie > ageCalorie.adolescents) {
        alert(`Energy Limit Extented for ${age}`);
        setMainData({ ...mainData, targetincalorie: 0 });
        return false;
      }
    }
    return true;
  };

  const checkAge1 = () => {
    if (age < 19) {
      if (mainData.targetincalorie > ageCalorie.adolescents) {
        alert(`Energy Limit Extented for ${age}`);
        return false;
      }
    } else if (age < 41) {
      if (mainData.targetincalorie > ageCalorie.adolescents) {
        alert(`Energy Limit Extented for ${age}`);
        return false;
      }
    } else {
      if (mainData.targetincalorie > ageCalorie.adolescents) {
        alert(`Energy Limit Extented for ${age}`);
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <div className="main-div">
        <div className="title">
          <h4>Calculate Today's Energy</h4>
        </div>
        <div className="energy">
          <div className="outer-energy">
            <div className="inner-energy">
              <h4>Set Today's Target Energy Intake</h4>
              {check.setIntakeCalorie ? (
                <h1>{mainData.targetincalorie}</h1>
              ) : (
                <div>
                  <input
                    className="inp1"
                    type="text"
                    value={mainData.targetincalorie}
                    onChange={(e) =>
                      setMainData({
                        ...mainData,
                        targetincalorie: e.target.value,
                      })
                    }
                  />
                  <button
                    className="button"
                    onClick={(e) => {
                      if (checkAge()) {
                        setCheck({ ...check, setIntakeCalorie: true });
                      }
                    }}
                  >
                    set
                  </button>{" "}
                </div>
              )}
            </div>
            <div className="inner-energy">
              <h4>Today's Energy Intake</h4>
              <h1>{mainData.intakecalorie}</h1>
            </div>
          </div>
          <div className="outer-energy">
            <div className="inner-energy">
              <h4>Set Today's Target Energy Burn</h4>
              {check.setBurnCalorie ? (
                <h1>{mainData.targetburncalorie}</h1>
              ) : (
                <div>
                  <input
                    className="inp1"
                    type="text"
                    value={mainData.targetburncalorie}
                    onChange={(e) =>
                      setMainData({
                        ...mainData,
                        targetburncalorie: e.target.value,
                      })
                    }
                  />
                  <button
                    className="button"
                    onClick={(e) => {
                      if (checkAge1()) {
                        setCheck({ ...check, setBurnCalorie: true });
                      }
                    }}
                  >
                    set
                  </button>{" "}
                </div>
              )}
            </div>
            <div className="inner-energy">
              <h4>Today's Energy Burn</h4>
              <h1>{mainData.burncalorie}</h1>
            </div>
          </div>
        </div>

        <div className="dropdown0">
          <div className="dropdown1">
            <div>
              <select
                name="cars"
                id="intake"
                onChange={(e) => intake(e.target.value)}
              >
                <option value="Select item">select item</option>
                {dropdown}
              </select>
            </div>
            <div>
              {data1.length > 0 ? (
                data1.map((val, i) => {
                  return (
                    <div className="show1">
                      <h4>{val.food}</h4>
                      <h4>{val.energy}</h4>
                    </div>
                  );
                })
              ) : (
                <h4>No EnergyTaken Today</h4>
              )}
            </div>
          </div>

          <div className="dropdown2">
            <div>
              <select
                name="cars"
                id="burn"
                onChange={(e) => burn(e.target.value)}
              >
                <option value="Select item">select item</option>
                {dropdown1}
              </select>
            </div>

            <div>
              {data2.length > 0 ? (
                data2.map((val, i) => {
                  return (
                    <div className="show1">
                      <h4>{val.activity}</h4>
                      <h4>{val.energy}</h4>
                    </div>
                  );
                })
              ) : (
                <h4>No EnergyBurn Today</h4>
              )}
            </div>
          </div>
        </div>
        <div className="butn">
          <button
            className="button"
            onClick={(e) => {
              saveData();
              setCheck({ ...check, loading: true });
            }}
          >
            {check.loading ? "Loading..." : "Save For Future"}
          </button>
          <div style={{margin:2 }}>
          <Link to="/home" >
          <input type="button" value="Go back"  className="tdbtn" />
        </Link>
        </div>

        </div>
      </div>
    </>
  );
};
export default Today;
