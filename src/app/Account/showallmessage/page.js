"use client";

import { useEffect, useState } from "react";

export default function ContactListPage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch("/api/Contact", { method: "GET" });
        const data = await res.json();
        if (data.success) setContacts(data.data);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      }
    }

    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen mt-32 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Contact Submissions
        </h1>

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
                  <p className="mt-1 bg-gray-100 p-3 rounded-md">
                    {contact.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
