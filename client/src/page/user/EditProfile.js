import React, { useState } from "react";
import {
  InputFields,
  updateFields,
} from "../../component/input-fields/InputFields";
import { CustomInput } from "../../component/custom-input/CustomInput";
import { MainLayout } from "../../component/layout/MainLayout";
import { toast } from "react-toastify";
import { postNewUser } from "../../helper/axiosHelper";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../login-register/UserSlice";
import { editUserProfile } from "../login-register/userAction";

export const EditProfile = () => {
  const [form, setForm] = useState();

  const { userId } = useParams();

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await dispatch(editUserProfile(form, userId));
  };

  return (
    <MainLayout>
      <div className="grid min-h-screen place-items-center">
        <div className="w-11/12 p-12 border shadow bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
          <h1 className="text-xl font-semibold">
            Hello there ?,{" "}
            <span className="font-normal">Edit your profile</span>
          </h1>
          <form className="mt-6" onSubmit={handleUpdate}>
            {updateFields.map((item, i) => (
              <CustomInput
                key={i}
                {...item}
                className="mb-2"
                onChange={handleOnChange}
              />
            ))}
            <button
              type="submit"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};
