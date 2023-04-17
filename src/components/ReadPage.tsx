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
}

type Chapter = Verse[]

type Verse = {
    pk: number;
    verse: number;
    text: string;
}

function ReadPage({ book_idSelected, book_nameSelected, chapterSelected, versionSelected, changeChapter }: ReadPageProps) {
    const { isLoading, error, data: chapter, refetch } = useQuery<Chapter>({
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


    if (isLoading) return(
        <Loading />
    )

    if (error) return <div>{`An error has occurred: ${error}`}</div>

    return (
        // <div className="mx-20 flex flex-col">
        <div className="max-w-[55rem] mx-auto flex flex-col p-10">
            <div className="flex justify-between text-4xl font-bold py-8">
                <Button
                    text={"<"}
                    changeChapter={changeChapter}
                    move={"previous"}
                    bookIdSelected={chapterSelected - 1}
                    hideInSmallScreen={true}
                />

                <label
                    className="btn-ghost rounded-md px-8 py-2 cursor-pointer text-primary hover:text-current"
                    htmlFor="my-modal-books-chapters"
                >
                    {book_nameSelected} {chapterSelected}
                </label>

                <Button
                    text={">"}
                    changeChapter={changeChapter}
                    move={"next"}
                    bookIdSelected={chapterSelected + 1}
                    hideInSmallScreen={true}
                />
            </div>

            <div className="text-2xl leading-10">
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

            <div className="flex justify-between text-4xl font-bold py-8">
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