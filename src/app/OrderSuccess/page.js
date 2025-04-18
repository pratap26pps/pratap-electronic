"use client";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900 px-4">
      <div className="max-w-xl w-full text-center p-8 bg-gray-50 dark:bg-zinc-800 rounded-xl shadow-lg">
        <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-green-600">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Thank you for your purchase. You’ll receive an email confirmation
          shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            href="/"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-md"
          >
            Continue Shopping
          </Link>
          <Link
            href="/Account/profile/order"
            className="bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 text-black dark:text-white font-medium px-6 py-3 rounded-md"
          >
            View Your Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
