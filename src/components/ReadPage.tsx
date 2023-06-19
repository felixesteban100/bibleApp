import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios";
import Button from "../reusableComponents/Button";
import { useEffect } from "react";
import Loading from "../reusableComponents/Loading";
import { HighlightedVerse, ReadPageProps, VersionsDownloaded } from "../types";
import { versionsDownloaded } from "../data/database";
import { ERROR_AXIOS_TEMPLATE } from "../constants/ErrorAxios";


/* LOOK  FOR A WAY TO SEND THESE TYPES INTO THE TYPE/INDEX.TS FOLDER */


type Chapter = {
    pk: number;
    verse: number;
    text: string;
}[]

/* type handlerUseQuery = { 
    isLoading: boolean, 
    error: AxiosError<Error | undefined>, 
    data: Chapter | undefined, 
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<Chapter, unknown>>, 
    isFetching: boolean 
} */

function ReadPage({
    bookSelected: {
        bookid: book_idSelected,
        name: book_nameSelected
    },
    bookSelected,
    chapterSelected,
    versionSelected,
    changeChapter,
    textSize,

    highlithedVerses,
    setHighlithedVerses,

}: ReadPageProps) {

    const { isLoading, error, data: chapter, refetch, isFetching }/* : handlerUseQuery  */ = useQuery<Chapter>({
        refetchOnMount: false,      // Disable refetch on component mount
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        queryKey: ['Chapter'],
        queryFn: () => {
            let chapter: Chapter = []
            for (const versionDownloaded of versionsDownloaded) {
                // console.log(versionDownloaded)
                for (const book of versionDownloaded.booksInTheVersion) {
                    if (book.book.bookid === book_idSelected) {
                        chapter = book.chaptersContent.filter((chapter) => chapter.chapterNumber === chapterSelected)[0].verses
                    }
                }
            }

            return (hasVersion(versionsDownloaded, versionSelected) === false && chapter.length < 1)
                ? axios
                    .get<Chapter>(`https://bolls.life/get-chapter/${versionSelected}/${book_idSelected}/${chapterSelected}/`)
                    .then((response) => response.data)
                : chapter

            /* return axios
                .get<Chapter>(`https://bolls.life/get-chapter/${versionSelected}/${book_idSelected}/${chapterSelected}/`)
                .then((response) => response.data) */
        }
    })

    useEffect(() => {
        refetch();
    }, [book_idSelected, book_nameSelected, chapterSelected, versionSelected]);

    function hasVersion(versionsDownloaded: VersionsDownloaded[], versionShortNameSelected: string): boolean {
        return versionsDownloaded.some((currentVersionDownloaded) => currentVersionDownloaded.versionShortName === versionShortNameSelected);
    }


    function hightlightSelected(currentVerse: { pk: number; verse: number; text: string; }) {
        const sendedVerse: HighlightedVerse = {
            chapter: chapterSelected,
            version: versionSelected,
            book: bookSelected,
            pk: currentVerse.pk,
            verse: currentVerse.verse,
            text: currentVerse.text,
        }

        // console.log(highlithedVerses.some((verse) => isEqual(verse, sendedVerse)))

        if (highlithedVerses.some((verse) => isEqual(verse, sendedVerse))) {
            setHighlithedVerses((prev) => prev.filter((current) => !isEqual(current, sendedVerse)));
        } else {
            setHighlithedVerses(prev => [...prev, sendedVerse])
        }
    }

    function isEqual(obj1: any, obj2: any): boolean {
        if (obj1 === obj2) {
            return true;
        }

        if (obj1 == null || obj2 == null) {
            return false;
        }

        if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
            return false;
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            if (!isEqual(obj1[key], obj2[key])) {
                return false;
            }
        }

        return true;
    }


    if ((isLoading || isFetching)) return (
        <Loading />
    )

    if (error) return (
        <div className="min-h-screen">
            <div
                className="flex justify-center gap-5 w-full h-full mx-auto mt-10 mb-10 p-20 rounded-lg flex-wrap"
            >
                {/* <p
                    className="text-md md:text-2xl lg:text-4xl text-primary font-bold"
                >
                    An error has occurred:
                </p> */}
                <p className="text-sm sm:text-md md:text-xl lg:text-2xl mockup-code overflow-x-scroll w-[70%]">
                    <p className="ml-5">{"{"}</p>
                    {/* {Object.entries(ERROR_AXIOS_TEMPLATE).map(([key, value]) => { */}
                    {Object.entries(ERROR_AXIOS_TEMPLATE).map(([key, value]) => {
                        return (
                            <div key={key} className="ml-12 mb-1">
                                <p>
                                    <span className="text-primary">{key}</span>
                                    {": "}
                                    {typeof value === 'string' ? value : typeof value === 'object' ? JSON.stringify(value) : null},
                                </p>
                            </div>
                        )
                    })}
                    <p className="ml-5">{"}"}</p>
                </p>
            </div>
        </div>
    )

    return (
        <div className="max-w-[55rem] mx-auto flex flex-col p-10">
            <div className="flex justify-between text-4xl font-bold py-1 bg-base-100 sticky top-0 z-10">
                <Button
                    text={"<"}
                    changeChapter={changeChapter}
                    move={"previous"}
                    bookIdSelected={chapterSelected - 1}
                    hideInSmallScreen={true}
                />

                <div className="flex bg-base-100 rounded-md">
                    <label
                        className="btn-ghost rounded-md px-8 py-2 cursor-pointer text-primary hover:text-current text-2xl sm:text-4xl"
                        htmlFor="my-modal-books-chapters"
                    >
                        {book_nameSelected} {chapterSelected} {versionSelected}
                    </label>
                </div>

                <Button
                    text={">"}
                    changeChapter={changeChapter}
                    move={"next"}
                    bookIdSelected={chapterSelected + 1}
                    hideInSmallScreen={true}
                />
            </div>

            <div
                data-replace='{ "translate-y-12": "translate-y-0" }'
                className={`text-${textSize}xl leading-10 transform transition-all translate-y-12 ease-out`}
            >
                {chapter!.map((currentVerse) => {
                    const verseCurrent = {
                        chapter: chapterSelected,
                        version: versionSelected,
                        book: bookSelected,
                        pk: currentVerse.pk,
                        verse: currentVerse.verse,
                        text: currentVerse.text,
                    }

                    const IsItHighlighted = highlithedVerses.some((verse) => isEqual(verse, verseCurrent))

                    return (
                        <span
                            onClick={() => hightlightSelected(currentVerse)}
                            className={`${IsItHighlighted ? "bg-primary text-base-100" : ""} hover:bg-primary-focus hover:text-base-100 group `} key={currentVerse.verse}
                        >
                            <span className={` ${IsItHighlighted ? "text-base-100" : "text-primary"} group-hover:text-base-100`}> {currentVerse.verse} </span>
                            <span dangerouslySetInnerHTML={{ __html: currentVerse.text }}></span>
                        </span>
                    )
                })}
            </div>
            <br />
            <div className="flex justify-between text-4xl font-bold pt-8 pb-0 sticky bottom-5 z-10 sm:static md:static lg:static sm:invisible md:invisible lg:invisible">
                <Button
                    text={"<"}
                    changeChapter={changeChapter}
                    move={"previous"}
                    bookIdSelected={book_idSelected - 1}
                    hideInSmallScreen={false}
                />

                <Button
                    text={">"}
                    changeChapter={changeChapter}
                    move={"next"}
                    bookIdSelected={book_idSelected + 1}
                    hideInSmallScreen={false}
                />
            </div>
        </div>
    )
}

export default ReadPage