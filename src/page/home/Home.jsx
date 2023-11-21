import { useState } from "react";
import { MainLayout } from "../../component/layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { addPost, setPost } from "./PostSlice";
import { toast } from "react-toastify";
import { setUser } from "../login-register/UserSlice";

export const Home = () => {
  const [form, setForm] = useState({});
  const { posts } = useSelector((state) => state.post);
  console.log(posts);
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
    <MainLayout>
      <form className="flex justify-center my-4" onSubmit={handleOnSubmit}>
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
      <hr />

      <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
        <div>
          <h1 className="text-gray-800 text-3xl font-semibold">
            Explore your local business
          </h1>{" "}
        </div>{" "}
        <ul className="mt-12 space-y-6">
          {posts.map((item, id) => (
            <li key={id} className="p-5 bg-white rounded-md shadow-sm">
              <h2>{item.post}</h2>
              <h2>{item.contact}</h2>
            </li>
          ))}
        </ul>
      </section>
    </MainLayout>
  );
};
