import { MainLayout } from "../../component/layout/MainLayout";
import Feed from "../../component/feed/Feed";
import Form from "../../component/content-form/Form";

export const Home = () => {
  return (
    <MainLayout>
      <Form />
      <hr />

      <Feed />
    </MainLayout>
  );
};
