import { MainLayout } from "../../component/layout/MainLayout";
import Feed from "../../component/feed/Feed";
import Form from "../../component/content-form/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentAction } from "./contentAction";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchContentAction());
  }, []);

  return (
    <MainLayout>
      {user?._id ? (
        <>
          <Form />
          <hr />

          <Feed />
        </>
      ) : (
        <Feed />
      )}
    </MainLayout>
  );
};
