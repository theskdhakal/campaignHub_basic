import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../page/home/PostSlice";
import { addContentAction } from "../../page/home/contentAction";

const Form = () => {
  const [form, setForm] = useState({ post: "", imageUrl: "" });
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Save post data to MongoDB with the provided image URL
    const postData = {
      description: form.post,
      image: form.imageUrl,
      userId: user._id,
      userName: user.fName[0],
    };

    if (!form.post || !form.imageUrl) {
      toast.error("please fill out all fields");
      return;
    }

    // Dispatch action to add post with data including image URL
    dispatch(addContentAction(postData));

    setForm({ post: "", imageUrl: "" });
  };

  return (
    <div className="max-w-5xl mx-auto mb-4  mt-8 flex">
      <div className="bg-white p-6 rounded-lg shadow-md flex-1">
        <div className="flex flex-col items-center">
          <textarea
            rows="6"
            name="post"
            value={form.post}
            placeholder="What's on your mind!!"
            onChange={handleOnChange}
            className="w-full p-2 mb-4 text-gray-700 border rounded"
          />

          <input
            type="url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleOnChange}
            placeholder="Paste Image URL"
            className="w-full mb-4 p-2 text-gray-700 border rounded"
          />
        </div>
      </div>

      <div className="ml-4  mt-auto ">
        <button
          className="bg-blue-500 text-white  px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleOnSubmit}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Form;
