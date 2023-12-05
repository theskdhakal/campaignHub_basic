import React, { useEffect } from "react";
import { MainLayout } from "../../component/layout/MainLayout";
import { useParams } from "react-router-dom";
import { getUserContentAction } from "../home/contentAction";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserContentAction(userId));
  }, [userId]);

  const { userPosts } = useSelector((state) => state.post);

  console.log(userPosts);

  return (
    <MainLayout>
      <h1 className="text-center mb-4 dashboard-title">Dashboard</h1>

      <hr />
      {userPosts.map((item, i) => (
        <article
          key={i}
          className="mx-auto w-4/5 md:w-1/2 lg:w-1/3 xl:w-4/5 mt-3 overflow-hidden rounded-lg shadow transition hover:shadow-lg"
        >
          <div className="bg-white p-4 sm:p-6">
            <time dateTime="2022-10-10" className="block text-xs text-gray-500">
              {item.createdAt}
            </time>

            <h3 className="mt-0.5 text-lg text-gray-900">{item.description}</h3>

            <div className="flex justify-center">
              {" "}
              <img
                src={item.image}
                alt="loading"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </article>
      ))}
    </MainLayout>
  );
};

export default Dashboard;
