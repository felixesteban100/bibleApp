import { MouseEventHandler } from "react";
import Header from "./components/Header";
import ReadPage from "./components/ReadPage"
import useLocalStorage from "./customHooks/useLocalStorage";
import useDarkMode from "./customHooks/useDarkMode";
import ModalSettings from "./components/ModalSettings";
import ModalVersions from "./components/ModalVersions";
import ModalBooksAndChapters from "./components/ModalBooksandChapters";

// MAYBE I SHOULD USE REACT ROUTER

type Book = {
  bookid: number,
  chronorder: number,
  name: string,
  chapters: number
}

function App() {
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
        console.log("Previous")
        setChapter(prev => {
          if (prev === 1) return prev
          return prev - 1
        })
        break;

      case "next":
        console.log("Next")
        setChapter(prev => {
          if (prev === book.chapters) return prev
          return prev + 1
        })
        break;

      default:
        console.log("None")
        break;
    }
  }

  function changeVersion(version_short_name: string){
    setVersion(version_short_name)
  }

  function changeBookandChapter(bookInfo: Book, chapterSelected: number){
    setBook(bookInfo)
    setChapter(chapterSelected)
  }

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

      <ModalSettings />
      
    </div>
  )
}

export default App
