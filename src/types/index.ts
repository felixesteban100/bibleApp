export type Chapter = {
    book: Book;
    chapter: number;
    version: string;
}

export type ModalSearchProps = {
    versionSelected: string;
    changeBookandChapter: (bookInfo: Book, chapterSelected: number) => void
}

export type Verse = {
    pk: number;
    translation?: string;
    book?: number;
    chapter: number;
    verse: number;
    text: string;
}

export type Version = {
    short_name: string;
    full_name: string;
    info: string;
    updated: number;
} | {
    short_name: string;
    full_name: string;
    updated: number;
    info?: undefined;
}

export type Versions = {
    [key: string]: Book[];
};

export type Book = {
    bookid: number;
    name: string;
    chronorder: number;
    chapters: number;
}



export type HeaderProps = {
    // toggleDarkMode: MouseEventHandler<HTMLInputElement>;
}

export type ModalBooksAndChapters = {
    currentVersion: string;
    changeBookandChapter: (bookInfo: Book, chapterSelected: number) => void
}

export type ButtonProps = {
    text: string;
    changeChapter: (moveTo: string, bookIdSelected: number) => void;
    move: string;
    bookIdSelected: number;
    hideInSmallScreen: boolean;
}

export type ModalVersionsProps = {
    changeVersion: (versionABR: string) => void
    downloadVersion: (version: Version) => void
    versionDownloading: VersionDownloading
}

export type HighlightedVerse = {
    chapter: number;
    version: string;
    book: Book;
    pk: number;
    verse: number;
    text: string;
}

export type ModalSettingsProps = {
    textSize: number;
    changeTextSize: (textSize: number) => void
    fontFamily: string;
    changeFontFamily: (fontFamily: string) => void
    history: Chapter[];
    changeBookandChapter: (bookInfo: Book, chapterSelected: number) => void
    changeVersion: (version_short_name: string) => void
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    setHistory: React.Dispatch<React.SetStateAction<[] | Chapter[]>>;

    highlithedVerses: HighlightedVerse[]
    setHighlithedVerses: React.Dispatch<React.SetStateAction<HighlightedVerse[]>>

}


export type ReadPageProps = {
    bookSelected: Book
    chapterSelected: number;
    versionSelected: string;
    changeChapter: (moveTo: string) => void;
    textSize: number;
    highlithedVerses: HighlightedVerse[]
    setHighlithedVerses: React.Dispatch<React.SetStateAction<HighlightedVerse[]>>

}

export type VersionsDownloaded = {
    versionFullName: string;
    versionShortName: string;
    booksInTheVersion: BookInVersion[]
}

export type BookInVersion = {
    book: Book,
    chaptersContent: chaptersContent[]
}

export type chaptersContent = {
    chapterNumber: number,
    verses: {
        pk: number,
        verse: number,
        text: string,
    }[]
}

export type VersionDownloading = {
    processRunning: boolean,
    versionFullName: string
}