import axios from "../axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Base } from "../layouts/Base";


export const Food = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [errMsg, setErrMsg] = useState("No Food Items present. Please add some food Items");

  async function fetchFoodItems() {
    const {data} = await axios('/food/');
    if (data.length > 0)
      setFoodItems(data);
  }

  useEffect(() => {
    fetchFoodItems();
  }, []);

  return (
    <Base>
      <div>
        <h3 className="my-3">Food Items</h3>
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
            {foodItems.map(item => {
                return (
                <tr>
                    <th><input type="checkbox" /></th>
                    <td>{item.name}</td>
                    <td>{item.carbohydrate}</td>
                    <td>{item.fats}</td>
                    <td>{item.protein}</td>
                    <td>{item.calorie}</td>
                    <td>{item.quantity}</td>
                </tr>
            )})}
          </tbody>
        </table>
        <p>{errMsg}</p>
        <Link to="/addfood" className="btn btn-outline-success">Add Item</Link>
      </div>
    </Base>
  );
};
