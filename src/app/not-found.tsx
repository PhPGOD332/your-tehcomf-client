import "./styles";
import {Metadata, Viewport} from "next";
import Page404 from "@/views/Page404/Page404";

export const metadata: Metadata = {
  title: "404: Страница не найдена",
  description: "Страницы не существует",
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover'
}

const NotFound = () => {
  return (
      <body className={'white'}>
        {/*<Header />*/}
        <main>
            <Page404/>
        </main>
        {/*<Footer isContact={true} />*/}
      </body>
  );
};

export default NotFound;
