export const SITE_NAME = "Тех комф";
export const CLIENT_URL = "https://tehcomf.ru";

export const pagesData: IPages = {
    main: {
        name: SITE_NAME,
        title: 'ТехКомф',
        description: 'ОПИСАНИЕ',
        keywords: 'КЛЮЧЕВЫЕ СЛОВА',
        type: "website",
        url: CLIENT_URL
    },
}

interface IPage {
    name: string;
    title: string;
    description: string;
    keywords?: string;
    url: string;
    type: "website"
        | "article"
        | "book"
        | "profile"
        | "music.song"
        | "music.album"
        | "music.playlist"
        | "music.radio_station"
        | "video.movie"
        | "video.episode"
        | "video.tv_show"
        | "video.other";
}

interface IPages {
    [page: string]: IPage;
}