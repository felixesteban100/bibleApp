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
import { Book, Chapter, HighlightedVerse, Version, VersionDownloading, Versions, VersionsDownloaded, chaptersContent } from "./types";
import axios from "axios";
import { useState } from "react";
import { dbForVersionsDownloaded } from "./data/database";
import { saveAs } from 'file-saver';

// MAYBE I SHOULD USE REACT ROUTER

//to compare with 
// https://bolls.life/NASB/30/7/-1

// if you want the API to work you should turn off the adblock extention



function App() {
  const versions: Versions = { ...versions_withBooks };

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
  const [highlithedVerses, setHighlithedVerses] = useLocalStorage<HighlightedVerse[]>("BIBLEAPP_HIGHLIGHTEDVERSES", [])

  const [versionDownloading, setVersionDownloading] = useState<VersionDownloading>({
    processRunning: false,
    versionFullName: ""
  })

  async function downloadVersion(versionSelected: Version) {

    setVersionDownloading({
      processRunning: true,
      versionFullName: versionSelected.full_name
    })

    const booksInTheVersionSelectedPromise: Promise<{ book: Book; chaptersContent: chaptersContent[]; }>[] =
      versions[versionSelected.short_name].map((async (currentBook) => {

        // DOWNLOAD VERSION (TAKES A LOT TIME)
        /*console.log("------------ it has begun ------------")
         const chaptersContent: chaptersContent[] = [];
         for (let chapterIndex = 1; chapterIndex <= currentBook.chapters; chapterIndex++) {
          const currentChapterContent = await axios
            .get(`https://bolls.life/get-chapter/${versionSelected.short_name}/${currentBook.bookid}/${chapterIndex}/`)
            .then((response) => response.data);

          // console.log(`chapter:${chapterIndex}`)
          // console.log(currentChapterContent)

          chaptersContent.push({
            chapterNumber: chapterIndex,
            verses: currentChapterContent
          });
        } 
        return {
          book: currentBook,
          chaptersContent: chaptersContent
        }
        */
        // DOWNLOAD VERSION (TAKES A LOT TIME)

        // ALREADY DOWNLOADED AND UPLOADED TO THE MONGODB AND PUSH TO IDB
        const chaptersContent: chaptersContent[] = await axios
          .get(`https://bible-versions.onrender.com/${versionSelected.short_name}`)
          .then((response) => response.data);

        return {
          book: currentBook,
          chaptersContent: chaptersContent
        }
        // ALREADY DOWNLOADED AND UPLOADED TO THE MONGODB AND PUSH TO IDB
      }))


    const booksInTheVersionSelectedresolvedPromises = await Promise.all(booksInTheVersionSelectedPromise);

    const versiontoDownload: VersionsDownloaded = {
      versionFullName: versionSelected.full_name,
      versionShortName: versionSelected.short_name,
      booksInTheVersion: booksInTheVersionSelectedresolvedPromises
    }


    // ALREADY DOWNLOADED AND UPLOADED TO THE MONGODB AND PUSH TO IDB
    await dbForVersionsDownloaded.add('versionsDownloaded', versiontoDownload);

    const transactionVersions = dbForVersionsDownloaded.transaction('versionsDownloaded', 'readwrite');
    const objectStoreVersions = transactionVersions.objectStore('versionsDownloaded');
    await objectStoreVersions.add(versiontoDownload)
    const allVersionsDownloadedDB = await objectStoreVersions.getAll()

    await dbForVersionsDownloaded.put('booksStore', versiontoDownload); // Store the book data in IndexedDB

    // Get all the versions from IDB:
    console.log(await dbForVersionsDownloaded.getAll('versionsDownloaded'))
    // ALREADY DOWNLOADED AND UPLOADED TO THE MONGODB AND PUSH TO IDB



    // DOWNLOAD VERSION (TAKES A LOT TIME)
    saveDataAsJSON(versiontoDownload, versionSelected.short_name);
    // DOWNLOAD VERSION (TAKES A LOT TIME)


    setVersionDownloading({
      processRunning: false,
      versionFullName: "None"
    })
  }

  function saveDataAsJSON(data: object, fileName: string) {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, fileName);
  };


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

  function changeTextSize(textSize: number) {
    if (textSize < 5 && textSize > 0) {
      setTextSize(textSize)
    }
  }

  function changeFontFamily(fontFamily: string) {
    setFontFamily(fontFamily)
  }


  return (
    <div
      data-theme={theme}
      className={`min-h-screen ${fontFamily} transition-colors duration-500`}
    >
      <Header
      />

      <ReadPage
        bookSelected={book}
        chapterSelected={chapter}
        versionSelected={version}
        changeChapter={changeChapter}
        textSize={textSize}

        highlithedVerses={highlithedVerses}
        setHighlithedVerses={setHighlithedVerses}

      />

      <ModalVersions
        changeVersion={changeVersion}
        downloadVersion={downloadVersion}
        versionDownloading={versionDownloading}
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
        changeVersion={changeVersion}
        theme={theme}
        setTheme={setTheme}
        setHistory={setHistory}

        highlithedVerses={highlithedVerses}
        setHighlithedVerses={setHighlithedVerses}
      />

      <Footer />
    </div>
  )
}

export default App


/* async function downloadVersion(versionSelected: Version) {

    setVersionDownloading({
      processRunning: true,
      versionFullName: versionSelected.full_name
    })

    const booksInTheVersionSelectedPromise: Promise<{ book: Book; chaptersContent: chaptersContent[]; }>[] =
      versions[versionSelected.short_name].map((async (currentBook) => {
        
        // console.log("------------ it has begun ------------")
        
        // i will make an api with all the versions instead of making and download one by one i should organize them in a db and in case someone wants to download one it just gonna be one big object 
        // then instead of searchin this for alot just make one useQuery TO THE MONGODB
        // const chaptersContent: chaptersContent[] = [];
        // for (let chapterIndex = 1; chapterIndex <= currentBook.chapters; chapterIndex++) {
        //   const currentChapterContent = await axios
        //     .get(`https://bolls.life/get-chapter/${versionSelected.short_name}/${currentBook.bookid}/${chapterIndex}/`)
        //     .then((response) => response.data);

        //   // console.log(`chapter:${chapterIndex}`)
        //   // console.log(currentChapterContent)

        //   chaptersContent.push({
        //     chapterNumber: chapterIndex,
        //     verses: currentChapterContent
        //   });
        // }

        // const chapterPromises = Array.from({ length: currentBook.chapters }, (_, index) =>
        //   axios.get(`https://bolls.life/get-chapter/${versionSelected.short_name}/${currentBook.bookid}/${index + 1}`)
        //     .then((response) => ({
        //       chapterNumber: index + 1,
        //       verses: response.data
        //     }))
        // );
        // const chaptersContent: chaptersContent[] = await Promise.all(chapterPromises);

        // console.log(chaptersContent);


        
        const chaptersContent: chaptersContent[] = await axios
        .get(`https://bible-versions.onrender.com/${versionSelected.short_name}`)
        .then((response) => response.data);

        return {
          book: currentBook,
          chaptersContent: chaptersContent
        }
      }))


    const booksInTheVersionSelectedresolvedPromises = await Promise.all(booksInTheVersionSelectedPromise);

    const versiontoDownload: VersionsDownloaded = {
      versionFullName: versionSelected.full_name,
      versionShortName: versionSelected.short_name,
      booksInTheVersion: booksInTheVersionSelectedresolvedPromises
    }

    // try with Elzevir Textus Receptus (1624) greek

    // await dbForVersionsDownloaded.add('versionsDownloaded', versiontoDownload);

    // const transactionVersions = dbForVersionsDownloaded.transaction('versionsDownloaded', 'readwrite');
    // const objectStoreVersions = transactionVersions.objectStore('versionsDownloaded');
    // await objectStoreVersions.add(versiontoDownload)
    // const allVersionsDownloadedDB = await objectStoreVersions.getAll()

    // await dbForVersionsDownloaded.put('booksStore', versiontoDownload); // Store the book data in IndexedDB


    // saveDataAsJSON(versiontoDownload, versionSelected.short_name);


    // setVersionsDownloaded(prev => [...prev, versiontoDownload])
    setVersionDownloading({
      processRunning: false,
      versionFullName: "None"
    })


    // Get all the versions:
    // console.log(await dbForVersionsDownloaded.getAll('versionsDownloaded'))
  } */