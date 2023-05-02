import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import axios from "../axios";
import { Base } from "../layouts/Base";

export const AddFood = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    function handleChange({target}) {
        const {name, value} = target;
        setFormData((prev) => ({...prev, [name]:value}));
    }


    async function handleSubmit(e) {
        e.preventDefault();
        await axios.post('/food/', formData);
        alert("Data added successfully");
        navigate("/food");
    }

    return (
        <Base>
            <h3>Add Food Items</h3>
            <form className="col-6" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input onChange={handleChange} type="text" className="form-control" name="name" id="name" />
                </div>
                <div className="mb-3">
                    <label for="carbohydrate" className="form-label">carbohydrate</label>
                    <input onChange={handleChange} type="number" className="form-control" name="carbohydrate" id="carbohydrate" min={0} />
                </div>
                <div className="mb-3">
                    <label for="fats" className="form-label">fats</label>
                    <input onChange={handleChange} type="number" className="form-control" name="fats" id="fats" min={0} />
                </div>
                <div className="mb-3">
                    <label for="protein" className="form-label">protein</label>
                    <input onChange={handleChange} type="number" className="form-control" name="protein" id="protein" min={0} />
                </div>
                <div className="mb-3">
                    <label for="calorie" className="form-label">calorie</label>
                    <input onChange={handleChange} type="number" className="form-control" name="calorie" id="calorie" min={0} />
                </div>
                <div className="mb-3">
                    <label for="quantity" className="form-label">quantity</label>
                    <input onChange={handleChange} type="number" className="form-control" name="quantity" id="quantity" min={1} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Base>
    );
}