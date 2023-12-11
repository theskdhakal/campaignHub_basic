import React, { useState } from "react";
import { MainLayout } from "../../component/layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { approvePostAction, deleteContentAction } from "../home/contentAction";

const AdminBoard = () => {
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Function to handle post approval
  const handleApproveClick = async (postId) => {
    try {
      dispatch(approvePostAction({ contentId: postId, isApproved: true }));
    } catch (error) {
      console.error("Error approving post:", error);
    }
  };

  // Function to handle post rejection

  const handleRejectClick = (contentId) => {
    const data = {
      contentId,
      userId: user._id,
    };
    console.log(data);
    dispatch(deleteContentAction(data));
  };

  return (
    <MainLayout>
      {user?.role === "admin" ? (
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-4">Unapproved Posts</h2>
          {posts
            .filter((post) => !post.isApproved)
            .map((post) => (
              <div
                key={post._id}
                className="mb-4 p-4 border rounded flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-semibold">{post.description}</p>
                  <p className="text-sm text-gray-500">
                    By {post.userName} on{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handleApproveClick(post._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleRejectClick(post._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <h1 className="text-center ">You are not authorized to access</h1>
      )}
    </MainLayout>
  );
};

export default AdminBoard;
