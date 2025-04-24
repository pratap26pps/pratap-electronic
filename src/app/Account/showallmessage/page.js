"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ContactListPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setloading] = useState(false);
  const [deletingId, setdeletingId] = useState(null);

  async function fetchContacts() {
    setloading(true);
    try {
      const res = await fetch("/api/Contact", { method: "GET" });
      const data = await res.json();
      if (data.success) setContacts(data.data);
      setloading(false);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      setloading(false);
    }
  }
  useEffect(() => {
    fetchContacts();
  }, []);

  const deletehandler = async (id) => {
    setdeletingId(id);
    try {
      await axios.delete(`/api/Contact/${id}`);
      toast.success("Message deleted");
      setContacts(prev => prev.filter(contact => contact._id !== id));
    } catch (error) {
      console.log(error.message);
      setdeletingId(null);
    }
    finally {
      setdeletingId(null);
    }
  };

  return (
    <div className="min-h-screen mt-32 py-12 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="loader ml-[50%]  mt-6"></div>
      ) : (
        <div className="max-w-6xl ">
          <div className="flex">
          <Link href="/Account/profile" >
          <Button className="cursor-pointer">Back</Button></Link>

          <h1 className="text-3xl mx-auto font-bold text-center mb-8">
            Contact Submissions
          </h1>
          </div>
        

          {contacts.length === 0 ? (
            <p className="text-center text-gray-600">No submissions yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className=" shadow-md rounded-2xl p-6 border hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                    {contact.firstName} {contact.lastName}
                  </h2>
                  <p className="text-sm text-gray-500 mb-1">
                    <strong>Email:</strong> {contact.email}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    <strong>Phone:</strong> {contact.phone}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    <strong>Issue Type:</strong> {contact.issueType}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    <strong>Submitted At:</strong> {contact.submittedAt}
                  </p>
                  <div className="mt-4 text-gray-700 text-sm">
                    <strong>Message:</strong>
                    <p className="mt-1 p-3 rounded-md">{contact.message}</p>

                    <Button
                      className="cursor-pointer"
                      onClick={() => deletehandler(contact._id)}
                    >
                      {deletingId === contact._id ? (
                        <div className="loader scale-50"></div>
                      ) : (
                        "Delete Message"
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
