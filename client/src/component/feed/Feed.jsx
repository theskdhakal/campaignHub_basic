import React from "react";
import { useSelector } from "react-redux";

const Feed = () => {
  const { posts } = useSelector((state) => state.post);

  return (
    <section className="mt-12 max-w-screen-lg mx-auto overflow-x-hidden">
      <div>
        <h1 className="text-gray-800 text-3xl font-semibold">
          Explore your local business
        </h1>
      </div>
      <ul className="mt-12 space-y-6 mb-2">
        {posts.map((item, id) => (
          <li key={id} className="bg-white p-5 rounded-md shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:flex-grow">
                <h2
                  className="text-xl font-semibold mb-2"
                  style={{ maxWidth: "44vw", wordWrap: "break-word" }}
                >
                  {item.description}
                </h2>
                <div className="flex justify-center">
                  <img
                    src={item.image}
                    alt="loading"
                    className="w-full max-h-44 object-cover rounded-md"
                  />
                </div>
              </div>

              <div className="md:flex-shrink-0">
                <h4 className="inline-block bg-blue-300 rounded-full px-4 py-2 mb-4 md:mb-0 md:mr-4">
                  {item.userName}
                </h4>

                <div className="bg-gray-100 rounded-md mt-2 p-4">
                  {/* Add your reaction and comment components here */}
                  {/* For example, emoji reactions and a comment input */}
                  <div className="flex items-center mb-2">
                    <span className="mr-2">❤️</span>
                  </div>

                  <textarea
                    placeholder="Leave a comment..."
                    className="w-full p-2 border rounded-md"
                  ></textarea>

                  <button className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2">
                    Post Comment
                  </button>
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
