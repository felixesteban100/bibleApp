import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import Button from "../ReusableComponents/Button";
import { useEffect } from "react";
import Loading from "../ReusableComponents/Loading";

type ReadPageProps = {
    book_idSelected: number;
    book_nameSelected: string;
    chapterSelected: number;
    versionSelected: string;
    changeChapter: (moveTo: string) => void;
    textSize: number;
}

type Chapter = Verse[]

type Verse = {
    pk: number;
    verse: number;
    text: string;
}

function ReadPage({ book_idSelected, book_nameSelected, chapterSelected, versionSelected, changeChapter, textSize }: ReadPageProps) {

    const { isLoading, error, data: chapter, refetch, isRefetching } = useQuery<Chapter>({
        queryKey: ['Chapter'],
        queryFn: () => {
            return axios
                .get<Chapter>(`https://bolls.life/get-chapter/${versionSelected}/${book_idSelected}/${chapterSelected}/`)
                .then((response) => response.data)
        }
    })

    useEffect(() => {
        refetch();
    }, [book_idSelected, book_nameSelected, chapterSelected, versionSelected]);


    if (isLoading || isRefetching) return (
        <Loading />
    )

    if (error) return (
        <div
            className="flex justify-center bg-primary w-[70%] m-auto mt-20 p-20 rounded-lg text-3xl"
        >
            {`An error has occurred: ${error}`}
        </div>
    )

    return (
        // <div className="mx-20 flex flex-col">
        <div className="max-w-[55rem] mx-auto flex flex-col p-10">
            <div className="flex justify-between text-4xl font-bold py-8  sticky top-0 z-10">
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

            {/* <div className="text-2xl leading-10"> */}
            <div
                data-replace='{ "translate-y-12": "translate-y-0" }'
                className={`text-${textSize}xl leading-10 transform transition-all translate-y-12 ease-out`}
            >
                {chapter!.map((currentVerse) => (
                    // <span className="flex gap-2 text-2xl">
                    // <span key={currentVerse.verse}>
                    //     <span className="text-primary"> {currentVerse.verse} </span><span>{currentVerse.text}</span>
                    // </span>

                    <span key={currentVerse.verse}>
                        <span className="text-primary" > {currentVerse.verse} </span><span dangerouslySetInnerHTML={{ __html: currentVerse.text }}></span>
                    </span>
                ))}
            </div>
            <br />
            <div className="flex justify-between text-4xl font-bold pt-8 pb-0  sticky bottom-5 z-10 sm:static md:static lg:static sm:invisible md:invisible lg:invisible">
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