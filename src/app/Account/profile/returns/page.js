"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const dummyReturns = [
  // {
  //   id: 1,
  //   productName: "Wireless Headphones",
  //   reason: "Damaged on arrival",
  //   date: "2025-04-20",
  //   status: "Pending",
  // },
  // {
  //   id: 2,
  //   productName: "Fitness Tracker",
  //   reason: "Wrong size",
  //   date: "2025-04-18",
  //   status: "Processed",
  // },
];

const ReturnsPage = () => {
  const [returns, setReturns] = useState(dummyReturns);

  return (
    <div className="container mx-auto mt-40 px-4">
      <div className="flex w-full ">
        <Link href="/Account/profile">
          {" "}
          <Button className="cursor-pointer">Back</Button>
        </Link>

        <h1 className="text-3xl font-bold mb-6 mx-auto">Return Requests</h1>
      </div>
      {returns.length === 0 ? (
        <p className="text-gray-500">You have no return requests.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {returns.map((ret) => (
            <Card key={ret.id} className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{ret.productName}</h2>
              <p className="text-sm text-gray-600">Reason: {ret.reason}</p>
              <p className="text-sm text-gray-500">Date: {ret.date}</p>
              <p
                className={`text-sm font-medium ${
                  ret.status === "Pending"
                    ? "text-yellow-500"
                    : ret.status === "Processed"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Status: {ret.status}
              </p>
              <Button variant="outline">View Details</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReturnsPage;
