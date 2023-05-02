import axios from "../axios";
import { useEffect, useState } from "react";
import { Base } from "../layouts/Base";
import { useNavigate } from "react-router-dom";

export const SelectFood = () => {
  const navigate = useNavigate();
  const [avlItems, setAvlItems] = useState([]);
  const [selItems, setSelItems] = useState(new Set());

  const fetchFoodItems = async () => {
    // Get food item details
    const { data } = await axios.get("/food/");
    setAvlItems(data);
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const handleChange = ({ target }) => {
    if (target.checked) {
      setSelItems((prev) => prev.add(target.value));
    } else {
      setSelItems((prev) => prev.delete(target.value));
    }
  };

  const handleClick = async ({ target }) => {
    await axios.post("/selectfood/", [...selItems]);
    alert("Data added successfully");
    navigate("/");
  };

  return (
    <Base>
      <h3>Select Food Item</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Carbohydrate</th>
            <th scope="col">Fats</th>
            <th scope="col">Protein</th>
            <th scope="col">Calorie</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {avlItems.map((item) => {
            return (
              <tr>
                <th>
                  <input
                    type="checkbox"
                    value={item.id}
                    onChange={handleChange}
                  />
                </th>
                <td>{item.name}</td>
                <td>{item.carbohydrate}</td>
                <td>{item.fats}</td>
                <td>{item.protein}</td>
                <td>{item.calorie}</td>
                <td>{item.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleClick} className="btn btn-outline-success mx-2">
        Add Food Items
      </button>
    </Base>
  );
};
