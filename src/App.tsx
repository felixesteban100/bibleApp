// import { MouseEventHandler, useState } from "react";
import Header from "./components/Header";
import ReadPage from "./components/ReadPage"
import useLocalStorage from "./customHooks/useLocalStorage";
// import useDarkMode from "./customHooks/useDarkMode";
import ModalSettings from "./components/ModalSettings";
import ModalVersions from "./components/ModalVersions";
import ModalBooksAndChapters from "./components/ModalBooksandChapters";
import ModalSearch from "./components/ModalSearch";
import versions_withBooks from './data/translations_books.json'
import Footer from "./components/Footer";

// MAYBE I SHOULD USE REACT ROUTER

//to compare with 
  // https://bolls.life/NASB/30/7/-1


type Book = {
  bookid: number,
  chronorder: number,
  name: string,
  chapters: number
}

type Versions = {
  [key: string]: Book[];
};

type Chapter = {
  book: Book;
  chapter: number;
  version: string;
}

function App() {
  const versions: Versions = { ...versions_withBooks };

  // const [isDarkMode, setIsDarkMode] = useDarkMode()

  const [chapter, setChapter] = useLocalStorage("BIBLEAPP_CHAPTER", 1)
  const [book, setBook] = useLocalStorage("BIBLEAPP_BOOK", {
    bookid: 1,
    chronorder: 1,
    name: "Genesis",
    chapters: 50
  })
  const [version, setVersion] = useLocalStorage("BIBLEAPP_VERSION", 'NASB')


  
  // Settings
  const [textSize, setTextSize] = useLocalStorage("BIBLEAPP_TEXTSIZE", 4)
  const [fontFamily, setFontFamily] = useLocalStorage("BIBLEAPP_FONTFAMILY", "font-sans")
  const [history, setHistory] = useLocalStorage<Chapter[] | []>("BIBLEAPP_HISTORY", [])
  const [theme, setTheme] = useLocalStorage("BIBLEAPP_THEME", "light")
  

  /* pure functions */
  // const toggleDarkMode: MouseEventHandler<HTMLInputElement> = () => {
  //   setIsDarkMode((prevMode: boolean) => !prevMode)
  // }
  
  function changeVersion(version_short_name: string) {
    setVersion(version_short_name)
    const translatedBook = versions[version_short_name].filter((currentBook) => currentBook.bookid === book.bookid && currentBook.chapters === book.chapters)[0]
    if (translatedBook) {
      setBook(translatedBook)
    }
  }

  function changeChapter(moveTo: string): void {
    let currentChapterSelected: number
    // let currentBook

    switch (moveTo) {
      case "previous":
        setChapter(prev => {
          if (prev === 1) return prev
          currentChapterSelected = prev - 1
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
          currentChapterSelected = previousBook[0].chapters
        }

        if (chapter === 1 && book.bookid === 1) {
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
          currentChapterSelected = lastBook[0].chapters
        }
      break;

      case "next":
        setChapter(prev => {
          if (prev === book.chapters) return prev
          currentChapterSelected = prev + 1
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
          currentChapterSelected = 1
        }

        if (chapter === book.chapters && book.bookid === versions[version].length) {
          setBook(versions[version].filter((currentBook: Book, index) => index === 0)[0])
          setChapter(1)
          currentChapterSelected = 1
        }
      break;

      default:
        console.log("None")
      break;
    }

    console.log()

    setHistory(chapterArr => {
      const chapterNew = {
        book: book,
        chapter: currentChapterSelected,
        version: version,
      }
      const index = chapterArr.findIndex(c => c.book === chapterNew.book && c.chapter === chapterNew.chapter && c.version === chapterNew.version);
      if (index !== -1) {
        chapterArr.splice(index, 1);
      }
      chapterArr = [...chapterArr, chapterNew];

      return chapterArr

      // return findAndMoveToEnd(prev, {
      //   book: book,
      //   chapter: moveTo === "next" ? chapter + 1 : chapter - 1,
      //   version: version,
      // })
    })
  }  

  function changeBookandChapter(bookInfo: Book, chapterSelected: number) {
    setBook(bookInfo)
    setChapter(chapterSelected)

    setHistory(chapterArr => {
      const chapterNew = {
        book: bookInfo,
        chapter: chapterSelected,
        version: version,
      }
      const index = chapterArr.findIndex(c => c.book === chapterNew.book && c.chapter === chapterNew.chapter && c.version === chapterNew.version);
      if (index !== -1) {
        chapterArr.splice(index, 1);
      }
      chapterArr = [...chapterArr, chapterNew];

      return chapterArr
    })

    // setHistory(prev => [...prev, {
    //   book: bookInfo,
    //   chapter: chapterSelected,
    //   version: version,
    // }])
  }

  function changeTextSize(textSize: number){
    if(textSize < 5 && textSize > 0){
      setTextSize(textSize)
    }
  }

  function changeFontFamily(fontFamily: string){
    setFontFamily(fontFamily)
  }

  
  return (
    <div 
        // data-theme={isDarkMode === true ? "forest" : "garden"} 
        data-theme={theme} 
        className={`min-h-screen ${fontFamily} transition-colors duration-500`}
      >
      <Header
        // toggleDarkMode={toggleDarkMode}
      />

      <ReadPage
        book_idSelected={book.bookid}
        book_nameSelected={book.name}
        chapterSelected={chapter}
        versionSelected={version}
        changeChapter={changeChapter}
        textSize={textSize}
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
        changeBookandChapter={changeBookandChapter}
      />

      <ModalSettings 
        textSize={textSize}
        changeTextSize={changeTextSize}
        fontFamily={fontFamily}
        changeFontFamily={changeFontFamily}
        history={history}
        changeBookandChapter={changeBookandChapter}
        theme={theme}
        setTheme={setTheme}
        setHistory={setHistory}
      />


      <Footer />
    </div>
  )
}

export default App