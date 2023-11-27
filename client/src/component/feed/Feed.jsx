import React from "react";
import { useSelector } from "react-redux";

const Feed = () => {
  const { posts } = useSelector((state) => state.post);
  console.log(posts);

  return (
    <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
      <div>
        <h1 className="text-gray-800 text-3xl font-semibold">
          Explore your local business
        </h1>{" "}
      </div>{" "}
      <ul className="mt-12 space-y-6">
        {posts.map((item, id) => (
          <li key={id} className="p-5 bg-white rounded-md shadow-sm">
            <div className="grid grid-flow-col auto-cols-max">
              <div></div>
              <div>
                {" "}
                <h2>{item.post}</h2>
              </div>
              <div>
                {" "}
                <h2>{item.post}</h2>
              </div>
            </div>

            <h2>{item.post}</h2>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Feed;
