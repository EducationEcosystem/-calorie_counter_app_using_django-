import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Base } from "./layouts/Base";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

function App() {
  const [foodItems, setFoodItems] = useState([]);
  const [calories, setCalories] = useState();
  const [cnt, setCnt] = useState();
  const [selItems, setSelItems] = useState(new Set());

  const fetchSelectedFood = async () => {
    // Get food item details
    const { data } = await axios.get("/selectfood/");
    const totalCalories = data["totalCalories"];
    const totalCnt = data["cnt"];
    const selectedFoodItems = data["selectedFoodItems"];
    setFoodItems(selectedFoodItems);
    setCalories(totalCalories);
    setCnt(totalCnt);
  };

  useEffect(() => {
    fetchSelectedFood();
  }, []);

  const handleChange = ({ target }) => {
    if (target.checked) {
      setSelItems((prev) => prev.add(target.value));
    } else {
      setSelItems((prev) => prev.delete(target.value));
    }
  };

  const handleClick = async ({ target }) => {
    await axios.delete("/selectfood/", {data: [...selItems]});
    alert("Successfully removed food items");
    window.location.replace("/");
  };

  return (
    <div className="App">
      <Base>
        <div class="my-3">
          <h6>
            Calories consumed by the user - <span>{calories}</span>
          </h6>
        </div>
        <div class="my-3">
          <h6>
            No of items consumed by user - <span>{cnt}</span>
          </h6>
        </div>
        <div>
          <h3>Selected Food Items</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Count</th>
              </tr>
            </thead>
            <tbody>
              {foodItems.map((item) => {
                return (
                  <tr>
                    <th>
                      <input type="checkbox" onChange={handleChange} value={item.id} />
                    </th>
                    <td>{item.food.name}</td>
                    <td>{item.units}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="btn btn-outline-danger mx-2" onClick={handleClick}>
            Remove Food Item
          </button>
          <Link to="/selectfood" className="btn btn-outline-success mx-2">
            Select Food Item
          </Link>
        </div>
      </Base>
    </div>
  );
}

export default App;
