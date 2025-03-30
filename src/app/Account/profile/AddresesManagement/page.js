"use client"
import React, { useState } from "react";
import Link from "next/link";
const AddressList = ({ addresses, onEdit, onDelete, onAdd }) => {
  return (
    <div className="max-w-2xl mx-auto p-4 mt-36 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
      {addresses.map((address, index) => (
        <div
          key={index}
          className="border p-4 rounded-md mb-3 shadow-sm"
        >
          <p className="font-semibold">{address.name}</p>
          <p>{address.company}</p>
          <p>{address.street}</p>
          <p>{address.city}, {address.state} {address.zipcode}</p>
          <p>{address.country}</p>
          <p className="text-gray-600">Phone: {address.phone}</p>
          <div className="mt-2 flex gap-4">
            <button
              onClick={() => onEdit(index)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(index)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <div className="lg:flex sm:flex-col lg:flex-row md:flex-row  justify-between">
      <Link href='/Account/profile'> <button className="cursor-pointer mt-9">Back</button> </Link>

        <button
          onClick={onAdd}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + New Address
        </button>
      </div>

      
    </div>
  );
};

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([
    {
      name: "Pankaj Singh",
      company: "Evelta",
      street: "HHH/5, Civil Township",
      city: "Rourkela",
      state: "Odisha",
      zipcode: "769004",
      country: "India",
      phone: "8252590019",
    },
  ]);

  const handleEdit = (index) => {
    alert("Edit feature not implemented yet");
  };

  const handleDelete = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    alert("Add feature not implemented yet");
  };

  return <AddressList addresses={addresses} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} />;
};

export default AddressManagement;
