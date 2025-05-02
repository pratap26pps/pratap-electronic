"use client";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const AddressList = ({
  addresses,
  newAddress,
  handleSubmit,
  handleChange,
  onEdit,
  onCancil,
  onDelete,
  onAdd,
  ismodalopen,
  loading
}) => {
  return (
    <>
    {!ismodalopen &&  <div className="max-w-2xl mx-auto p-4 mt-36 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
        {addresses.map((address) => (
          <div key={address?._id} className="border p-4 rounded-md mb-3 shadow-sm">
            <p className="font-semibold">{address.name}</p>

            <p>{address.street}</p>
            <p>
              {address.city} {address.state} {address.pincode}
            </p>
            <p>{address.country}</p>
            <p className="text-gray-600">Phone: {address.phone}</p>
            <div className="mt-2 flex gap-4">
              <button
                onClick={() => onEdit(address._id)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(address._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="lg:flex sm:flex-col lg:flex-row md:flex-row  justify-between">
          <Link href="/Account/profile">
            {" "}
            <button className="cursor-pointer mt-9">Back</button>{" "}
          </Link>

          <button
            onClick={onAdd}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + New Address
          </button>
        </div>
      </div>}

      {/* add new address here */}
      {ismodalopen && (
        <div className="max-w-xl mx-auto mt-36 px-4 py-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-6">Add New Address</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              value={newAddress.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={newAddress.phone}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="street"
              placeholder="Street Address"
              value={newAddress.street}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="city"
              placeholder="City"
              value={newAddress.city}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="state"
              placeholder="State"
              value={newAddress.state}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="country"
              placeholder="country"
              value={newAddress.country}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="pincode"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
            {
              loading ?<div className="loader scale-50"></div>:
              "Save Address"
            }  
            </button>
          </form>
          <button
            onClick={() => onCancil()}
            className="text-blue-600 hover:underline"
          >
            Cancil
          </button>
        </div>
      )}
    </>
  );
};

const AddressManagement = () => {
  const userdata= useSelector((state)=>state.auth.userdetail);
  console.log("userdata in address",userdata)
  
   const router = useRouter(); 
 
  const [addresses, setAddresses] = useState(userdata?.addresses || []);
  const [loading, setloading] = useState(false);

  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone:  "",
  });
  console.log("newaddress",newAddress)
  const [ismodalopen, setismodalopen] = useState(false);

  const handleEdit =async (id) => {
    router.push(`UpdateAddress/${id}`)
  };

  const handleDelete =async (id) => {
    try {
      const res = await fetch(`/api/users/address/${id}`, {
        method: "DELETE",
      });
  
      const data = await res.json();
  
      if (data.success) {
        setAddresses((prev) => prev.filter((addr) => addr._id !== id));
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting address");
    }
  };

  const handleAdd = () => {
    setismodalopen(true);
  };
  const onCancil = () => {
    setismodalopen(false);
  };
  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await axios.post("/api/users/address", newAddress);
      setAddresses([...addresses, newAddress]);
      toast.success("Address added successfully!");
      setismodalopen(false);
      setNewAddress({ name: "", street: "", city: "", state: "", pincode: "", country: "", phone: "" });
    } catch (error) {
      toast.error(error.message || "Failed to add address");
    }finally{
      setloading(false);
    }
  };

  return (
    <AddressList
      ismodalopen={ismodalopen}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      addresses={addresses}
      newAddress={newAddress}
      onEdit={handleEdit}
      onCancil={onCancil}
      onDelete={handleDelete}
      onAdd={handleAdd}
      loading={loading}
    />
  );
};

export default AddressManagement;
