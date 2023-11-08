import React, { useState } from "react";
import { CustomInput } from "../../component/custom-input/CustomInput";
import { LoginInput } from "../../component/input-fields/InputFields";
import { MainLayout } from "../../component/layout/MainLayout";

export const Login = () => {
  const [form, setForm] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logged In");
  };
  return (
    <MainLayout>
      <div className="grid min-h-screen place-items-center">
        <div className="w-11/12 p-12 border shadow bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
          <h1 className="text-xl font-semibold">
            Welcome Back ! <span className="font-normal"></span>
          </h1>
          <form className="mt-6" onSubmit={handleLogin}>
            {LoginInput.map((item, i) => (
              <CustomInput
                key={i}
                {...item}
                className="mb-2"
                onChange={handleChange}
              />
            ))}
            <button
              type="submit"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            >
              Login
            </button>
            <p className="flex justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">
              Forgot Password ?
            </p>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};
