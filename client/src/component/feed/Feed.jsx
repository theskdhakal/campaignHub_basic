import React from "react";
import { useSelector } from "react-redux";

const Feed = () => {
  const { posts } = useSelector((state) => state.post);

  return (
    <section className="mt-12 max-w-screen-lg mx-auto   overflow-x-hidden">
      <div>
        <h1 className="text-gray-800 text-3xl font-semibold">
          Explore your local business
        </h1>{" "}
      </div>{" "}
      <ul className="mt-12 space-y-6 mb-2">
        {posts.map((item, id) => (
          <li key={id} className="p-5  rounded-md shadow-lg">
            <div className="grid grid-flow-col auto-cols-max">
              <div className="bg-blue-300 rounded-full  p-4 mb-auto">
                {item.userName}
              </div>
              <div className="ml-3 grid grid-flow-row auto-cols-max">
                <div className="">
                  {" "}
                  <h2 style={{ maxWidth: "44vw", wordWrap: "break-word" }}>
                    {item.description}
                  </h2>
                </div>
                <div className="flex justify-center">
                  {" "}
                  <img
                    src={item.image}
                    alt="loading"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Feed;
