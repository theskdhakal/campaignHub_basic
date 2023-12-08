import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import {
  deleteComment,
  getAllContent,
  getReactionsForContent,
  postReaction,
} from "../../helper/axiosHelper";
import {
  deleteContentAction,
  fetchContentAction,
} from "../../page/home/contentAction";
import { toast } from "react-toastify";

const Feed = () => {
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  //keeping track for each post
  const [reactions, setReactions] = useState({});
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { contentWithTotalReactions } = await getAllContent();

        // Initialize the reactions state based on the fetched data
        const initialReactions = {};
        contentWithTotalReactions.forEach((content) => {
          initialReactions[content._id] = {
            totalReactions: content.totalReactions,
            userReaction:
              content.reactions.find((r) => r.userId === user._id)?.reaction ||
              0,
          };
        });

        setReactions(initialReactions);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchData();
  }, [user]);

  const handleOnReaction = async (contentId) => {
    try {
      if (!user) return;
      // Call the postReaction function to add a reaction
      const response = await postReaction({
        contentId,
        userId: user._id,
      });

      // Update the local state with the updated reaction count and user reaction
      setReactions((prevReactions) => ({
        ...prevReactions,
        [contentId]: {
          totalReactions: response.totalReactions,
          userReaction: response.data.reactions.find(
            (r) => r.userId === user._id
          )?.reaction,
        },
      }));

      dispatch(fetchContentAction());
    } catch (error) {
      console.error("Error adding reaction:", error);
      // Handle the error as needed
    }
  };

  const handleOnComment = async (contentId) => {
    try {
      if (!form.feedback) {
        window.alert("comment box is empty");
        return;
      }

      const response = await postComment({
        contentId,
        userId: user?._id,
        userName: user?.fName,
        feedback: form.feedback,
      });

      dispatch(fetchContentAction());
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnDeletePost = (contentId) => {
    const data = {
      contentId,
      userId: user._id,
    };
    dispatch(deleteContentAction(data));
  };

  const handleOnDeleteComment = async (commentId) => {
    const response = await deleteComment({
      commentId,
      userId: user._id,
    });
    const { status, message } = response;
    toast[status](message);
    dispatch(fetchContentAction());
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
                <div
                  className="text-xl font-semibold mb-2"
                  style={{ maxWidth: "44vw", wordWrap: "break-word" }}
                >
                  <MdDelete />
                </div>
                <h2 className="text-xl font-semibold mb-2 sm:max-w-md md:max-w-none">
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
                    <span className="mr-2"> {item.totalReactions || 0}</span>
                    <button
                      onClick={() => handleOnReaction(item._id)}
                      className="cursor-pointer"
                      disabled={!user._id}
                    >
                      {reactions[item._id]?.userReaction === 1 ? "❤️" : "🤍"}
                    </button>
                  </div>

                  <textarea
                    placeholder="Leave a comment..."
                    name="feedback"
                    className="w-full p-2 border rounded-md"
                    onChange={handleOnChange}
                  ></textarea>

                  <button
                    className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2"
                    onClick={() => handleOnComment(item._id)}
                    type="submit"
                    disabled={!user?._id}
                  >
                    Post Comment
                  </button>
                </div>

                <div className="bg-gray-100 rounded-md mt-2 p-4">
                  <h5>Comments</h5>
                  <ul>
                    {item.comments.map((comment, index) => (
                      <li
                        key={index}
                        className="mb-2 flex bg-white rounded items-center justify-between"
                      >
                        <div>
                          <h5 className="inline-block bg-blue-300 rounded-full px-2 border py-2 mb-4 md:mb-0 md:mr-4">
                            {comment.userName[0]}:
                          </h5>{" "}
                          {comment.comments}
                        </div>
                        <span
                          className="text-end cursor-pointer text-red-500"
                          onClick={() => {
                            handleOnDeleteComment(comment._id);
                          }}
                        >
                          <FaDeleteLeft />
                        </span>
                      </li>
                    ))}
                  </ul>
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
