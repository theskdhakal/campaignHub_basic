import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReactionsForContent, postReaction } from "../../helper/axiosHelper";

const Feed = () => {
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  //keeping track for each post
  const [reactions, setReactions] = useState({});

  // useEffect(() => {
  //   // Fetch initial reaction count for each post
  //   const fetchReactions = async () => {
  //     const reactionsData = {};
  //     for (const post of posts) {
  //       const response = await getReactionsForContent(post._id);
  //       reactionsData[post._id] = response.reactions.length;
  //     }
  //     setReactions(reactionsData);
  //   };

  //   fetchReactions();
  // }, [posts]);

  const handleOnReaction = async (contentId) => {
    try {
      // Call the postReaction function to add a reaction
      const response = await postReaction({
        contentId,
        userId: user._id,
      });

      // Log the response for debugging (you can remove this in production)
      console.log(response);

      // // Assuming the server responds with the updated reaction count
      // const updatedReactionCount = response.reaction.reactions;

      // // Update the local state or Redux state with the updated count
      // setReactions((prevReactions) => ({
      //   ...prevReactions,
      //   [contentId]: updatedReactionCount,
      // }));
    } catch (error) {
      console.error("Error adding reaction:", error);
      // Handle the error as needed
    }
  };

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
                    <span className="mr-2"> {0}</span>
                    <button
                      onClick={() => handleOnReaction(item._id)}
                      className="cursor-pointer"
                    >
                      ❤️
                    </button>
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
