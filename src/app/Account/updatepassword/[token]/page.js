"use client";
import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Updatepassword = ({ params }) => {
  const { token } = use(params);
  console.log("token uding updating pass", token);
  const [FormData, setFormData] = useState({
    password: "",
    confirmpassword: "",
  });
  const [showpassword, setshowpassword] = useState(false);
  const [showconfirmpassword, setshowconfirmpassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { password, confirmpassword } = FormData;
  const router = useRouter();

  const handleonchange = (e) => {
    setFormData((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value,
    }));
  };

  const handleonsubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("/api/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          confirmpassword,
          token,
        }),
      });
      console.log("res in update pan:", res);
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text(); // fallback for HTML
        console.error("Non-JSON response:", text);
        throw new Error("Server returned non-JSON response");
      }

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert(" Password reset successful!");
        router.push("/Account/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Reset failed:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center mt-36 min-h-screen px-4">
      {loading ? (
        <div className="loader flex justify-center"></div>
      ) : (
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Choose New Password
          </h2>
          <p className="text-sm text-gray-300 mb-6 text-center">
            Almost done. Enter your new password and you're all set.
          </p>

          <form onSubmit={handleonsubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">
                New Password <sup className="text-red-500">*</sup>
              </label>
              <div className="flex items-center justify-between border border-gray-600 rounded-xl px-3 py-2 bg-gray-800">
                <input
                  required
                  name="password"
                  value={password}
                  type={showpassword ? "text" : "password"}
                  placeholder="Enter new password"
                  onChange={handleonchange}
                  className="bg-transparent focus:outline-none text-white w-full font-semibold"
                />
                <span
                  onClick={() => setshowpassword((prev) => !prev)}
                  className="cursor-pointer"
                >
                  {showpassword ? (
                    <AiFillEye fontSize={22} />
                  ) : (
                    <AiFillEyeInvisible fontSize={22} />
                  )}
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Confirm Password <sup className="text-red-500">*</sup>
              </label>
              <div className="flex items-center justify-between border border-gray-600 rounded-xl px-3 py-2 bg-gray-800">
                <input
                  required
                  name="confirmpassword"
                  value={confirmpassword}
                  type={showconfirmpassword ? "text" : "password"}
                  onChange={handleonchange}
                  placeholder="Confirm new password"
                  className="bg-transparent focus:outline-none text-white w-full font-semibold"
                />
                <span
                  onClick={() => setshowconfirmpassword((prev) => !prev)}
                  className="cursor-pointer"
                >
                  {showconfirmpassword ? (
                    <AiFillEye fontSize={22} />
                  ) : (
                    <AiFillEyeInvisible fontSize={22} />
                  )}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition-all"
            >
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Updatepassword;
