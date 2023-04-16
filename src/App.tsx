import { MouseEventHandler, useState } from "react";
import Header from "./components/Header";
import ReadPage from "./components/ReadPage"
import useLocalStorage from "./customHooks/useLocalStorage";
import useDarkMode from "./customHooks/useDarkMode";
import ModalSettings from "./components/ModalSettings";
import ModalVersions from "./components/ModalVersions";
import ModalBooksAndChapters from "./components/ModalBooksandChapters";
import ModalSearch from "./components/ModalSearch";
import versions_withBooks from './data/translations_books.json'

// MAYBE I SHOULD USE REACT ROUTER

type Book = {
  bookid: number,
  chronorder: number,
  name: string,
  chapters: number
}

type Versions = {
  [key: string]: {
    bookid: number;
    name: string;
    chronorder: number;
    chapters: number;
  }[];
};

function App() {
  const versions: Versions = { ...versions_withBooks };

  const [isDarkMode, setIsDarkMode] = useDarkMode()
  const [chapter, setChapter] = useLocalStorage("BIBLEAPP_CHAPTER", 1)
  const [book, setBook] = useLocalStorage("BIBLEAPP_BOOK", {
    bookid: 1,
    chronorder: 1,
    name: "Genesis",
    chapters: 50
  })
  const [version, setVersion] = useLocalStorage("BIBLEAPP_VERSION", 'NASB')



  const toggleDarkMode: MouseEventHandler<HTMLInputElement> = () => {
    setIsDarkMode((prevMode: boolean) => !prevMode)
  }

  function changeChapter(moveTo: string): void {
    switch (moveTo) {
      case "previous":
        setChapter(prev => {
          if (prev === 1) return prev
          return prev - 1
        })
        if (chapter === 1 && book.bookid > 1) {
          const previousBook = versions[version].filter((currentBook: Book) => {
            if (currentBook.bookid === book.bookid - 1) {
              return {
                bookid: currentBook.bookid,
                chronorder: currentBook.chronorder,
                name: currentBook.name,
                chapters: currentBook.chapters
              };
            }
          })
          setBook(previousBook[0])
          setChapter(previousBook[0].chapters)
        }

        if (book.bookid === 1) {
          const lastBook = versions[version].filter((currentBook: Book) => {
            if (currentBook.bookid === versions[version].length) {
              return {
                bookid: currentBook.bookid,
                chronorder: currentBook.chronorder,
                name: currentBook.name,
                chapters: currentBook.chapters
              };
            }
          })
          setBook(lastBook[0])
          setChapter(lastBook[0].chapters)
        }

        break;

      case "next":
        setChapter(prev => {
          if (prev === book.chapters) return prev
          return prev + 1
        })

        if (chapter === book.chapters && book.bookid < versions[version].length) {
          const nextBook = versions[version].filter((currentBook: Book) => {
            if (currentBook.bookid === book.bookid + 1) {
              return {
                bookid: currentBook.bookid,
                chronorder: currentBook.chronorder,
                name: currentBook.name,
                chapters: currentBook.chapters
              };
            }
          })
          setBook(nextBook[0])
          setChapter(1)
        }

        if (book.bookid === versions[version].length) {
          setBook(versions[version].filter((currentBook: Book) => currentBook.bookid === 1)[0])
          setChapter(1)
        }
        break;

      default:
        console.log("None")
      break;
    }
  }

  function changeVersion(version_short_name: string) {
    setVersion(version_short_name)
  }

  function changeBookandChapter(bookInfo: Book, chapterSelected: number) {
    setBook(bookInfo)
    setChapter(chapterSelected)
  }

  //to compare with 
  // https://bolls.life/NASB/30/7/-1

  return (
    <div data-theme={isDarkMode === true ? "forest" : "garden"} className="min-h-screen">
      <Header
        toggleDarkMode={toggleDarkMode}
      />

      <ReadPage
        book_idSelected={book.bookid}
        book_nameSelected={book.name}
        chapterSelected={chapter}
        versionSelected={version}
        changeChapter={changeChapter}
      />

      <ModalVersions
        changeVersion={changeVersion}
      />

      <ModalBooksAndChapters
        currentVersion={version}
        changeBookandChapter={changeBookandChapter}
      />

      <ModalSearch
        versionSelected={version}
      />

      <ModalSettings />
    </div>
  )
}

export default App