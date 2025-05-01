import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Admindashb = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/showdata`);
        setProducts(response.data.apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(`/api/delete/${id}`);

      if (response.status === 200) {
        setProducts(products.filter((product) => product._id !== id));
        toast.success(response.data.message);
        navigate("/admindashb");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg mt-20">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Admin Dashboard - Product List
        </h2>
        <Link
          to="/admininsert"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all font-semibold"
        >
          + Add Product
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full border border-gray-200 rounded-lg text-gray-700">
          <thead>
            <tr className="bg-blue-600 text-white text-lg">
              <th className="p-4 border">Image</th>
              <th className="p-4 border">Name</th>
              <th className="p-4 border">Description</th>
              <th className="p-4 border">Category</th>
              <th className="p-4 border">Price</th>
              <th className="p-4 border">Quantity</th>
              <th className="p-4 border">Status</th>
              <th className="p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="text-center border hover:bg-gray-100 transition"
              >
                <td className="p-4 border">
                  <img
                    src={`https://food-store-backend-jm6i.onrender.com/upload/${product.fImage}`}
                    alt={product.fName}
                    className="w-24 h-16 mx-auto rounded-md shadow-md"
                  />
                </td>
                <td className="p-4 border font-semibold">{product.fName}</td>
                <td className="p-4 border truncate max-w-xs">
                  {product.fDescription}
                </td>
                <td className="p-4 border font-semibold">{product.fCategory}</td>
                <td className="p-4 border font-bold text-green-600">
                  ${product.fPrice}
                </td>
                <td className="p-4 border font-semibold">
                  {product.fQuantity}
                </td>
                <td className="p-4 border">
                  <span
                    className={`inline-block min-w-[80px] text-center px-3 py-1 rounded-lg text-sm font-medium 
                  ${
                    product.fStatus === "Available"
                      ? "bg-green-100 text-green-700"
                      : product.fStatus === "Out of Stock"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                  >
                    {product.fStatus}
                  </span>
                </td>
                <td className="p-4 mt-4 flex justify-center space-x-2">
                  <Link to={`/edit/${product._id}`}>
                    <button className="bg-yellow-500 text-white px-4 py-1 rounded-md shadow-md hover:bg-yellow-600 transition-all font-medium">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      handleRemove(product._id);
                    }}
                    className="bg-red-500 text-white px-4 py-1 rounded-md shadow-md hover:bg-red-600 transition-all font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admindashb;
