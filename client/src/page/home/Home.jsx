import { MainLayout } from "../../component/layout/MainLayout";
import Feed from "../../component/feed/Feed";
import Form from "../../component/content-form/Form";
import { useDispatch } from "react-redux";
import { fetchContentAction } from "./contentAction";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContentAction());
  }, []);

  return (
    <MainLayout>
      <Form />
      <hr />

      <Feed />
    </MainLayout>
  );
};
