import {Metadata} from "next";
import Page404 from "@/views/Page404/Page404";

export const metadata: Metadata = {
  title: "404: Страница не найдена",
  description: "Страницы не существует",
};

const NotFound = () => {
  return (
      <main>
          <Page404/>
      </main>
  );
};

export default NotFound;
