import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    fName: "",
    fDescription: "",
    fImage: "",
    fPrice: "",
    fQuantity: "",
    fStatus: "",
  });
  
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/edit/${id}`)
      .then(({ data }) => {
        setProduct(data.data);
        setPreview(`http://localhost:5000/upload/${data.data.fImage}`);
      })
      .catch(() => toast.error("Error fetching product"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProduct((prev) => ({ ...prev, fImage: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", product.fName);
    formData.append("description", product.fDescription);
    formData.append("price", product.fPrice);
    formData.append("quantity", product.fQuantity);
    formData.append("status", product.fStatus);
    
    if (product.fImage instanceof File) {
      formData.append("image", product.fImage);
    }

    try {
      await axios.put(`/api/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product updated successfully!");
      navigate("/admindashb");
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-white shadow-lg rounded-lg mt-20">
      <h1 className="text-2xl font-semibold text-center mb-4 py-3 bg-blue-500 text-white rounded-md">
        Edit Product
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {preview && <img src={preview} alt="Preview" className="h-24 object-cover rounded mx-auto" />}

        <input type="file" name="fImage" onChange={handleChange} className="w-full p-2 border rounded" />

        <input type="text" name="fName" value={product.fName} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border rounded" required />
        <textarea name="fDescription" value={product.fDescription} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />

        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="fQuantity" value={product.fQuantity} onChange={handleChange} placeholder="Quantity" className="w-full p-2 border rounded" required />
          <input type="number" name="fPrice" value={product.fPrice} onChange={handleChange} placeholder="Price ($)" className="w-full p-2 border rounded" required />
        </div>

        <select name="fStatus" value={product.fStatus} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Status</option>
          <option value="Available">Available</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminEditPage;
