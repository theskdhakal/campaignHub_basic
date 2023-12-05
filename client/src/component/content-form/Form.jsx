import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addContentAction } from "../../page/home/contentAction";

const Form = () => {
  const [form, setForm] = useState({ post: "", imageFile: null });
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;

    // If the input is a file input, update imageFile
    if (type === "file") {
      setForm({
        ...form,
        [name]: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Save post data to MongoDB with the provided image file
    const postData = {
      description: form.post,
      image: form.imageFile,
      userId: user._id,
      userName: user.fName + " " + user.lName,
    };

    if (!form.post || !form.imageFile) {
      toast.error("Please fill out all fields");
      return;
    }

    console.log(postData);
    // Dispatch action to add post with data including image file
    dispatch(addContentAction(postData));

    setForm({ post: "", imageFile: null });
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
            type="file"
            accept="image/*,video/*"
            name="imageFile"
            onChange={handleOnChange}
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
