import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addPost } from "../../page/home/PostSlice";

const Form = () => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    dispatch(addPost(form));

    setForm({});

    toast.success("Your Post has been Submitted");
  };
  return (
    <div>
      <form className="flex justify-center my-5 py-5" onSubmit={handleOnSubmit}>
        <div className="w-1/2">
          {" "}
          <textarea
            rows="10"
            name="post"
            value={form.post || ""}
            placeholder="What's on your mind!!"
            onChange={handleOnChange}
            className="w-full pl-12 pr-3 py-5 text-justify text-gray-500 bg-transparent outline-none border focus:border-black-600 shadow-sm rounded-lg text-center"
          />
        </div>
        <div className="flex flex-col justify-end ml-2">
          <button
            className="bg-blue-500 border px-4 py-2 rounded text-white"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
