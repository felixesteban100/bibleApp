
//https://bolls.life/search/YLT/?search=haggi&match_case=false&match_whole=true

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import versions_withBooks from './../data/translations_books.json'
import { Book, ModalSearchProps, Verse, Versions } from "../types";



function ModalSearch({ versionSelected, changeBookandChapter }: ModalSearchProps) {
    const versions: Versions = { ...versions_withBooks };

    const [isModalSearchActive, setIsModalSearchActive] = useState<boolean>(false)
    const [wordForSearch, setWordForSearch] = useState<string | undefined>(undefined)

    // const [matchCase, setMatchCase] = useState(false)
    // const [matchWhole, setMatchWhole] = useState(false)

    const [matchBooksAndChapters, setMatchBooksAndChapters] = useState<{ books: Book[], chapter: number } | { books: [], chapter: number }>({ books: [], chapter: 0 })

    const { /* isLoading,  */error, data: searchResult, refetch: refetchSearch, isFetching } = useQuery<Verse[]>({
        enabled: isModalSearchActive,
        queryKey: ['Search'],
        queryFn: () => {
            // console.log(wordForSearch)
            if (wordForSearch !== undefined) {
                return axios
                    // .get(`https://bolls.life/search/${versionSelected}/?search=${wordForSearch}&match_case=${false}&match_whole=${true}`)
                    .get(`https://bolls.life/search/${versionSelected}/?search=${wordForSearch}&match_case=${false}&match_whole=${false}`)
                    .then((response) => response.data)
            }
            return []
        }
    })

    function changeWordForSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setWordForSearch(event.target.value)

        const regexMatches = event.target.value.toLowerCase().match(/\w+/g);
        const booksMatched = versions[versionSelected].filter(current =>
            current.name.toLowerCase().includes(regexMatches?.[0] ?? '')
        );

        setMatchBooksAndChapters({
            books: booksMatched,
            chapter: parseInt(event.target.value.match(/ \d+/g)?.[0] || "1")
        })

        // console.log(versions[versionSelected].filter((current, index) => index + 1 === 1))
    }

    function searchWord() {
        setIsModalSearchActive(true)
        refetchSearch()
        setIsModalSearchActive(false)
    }

    return (
        <div>
            <input type="checkbox" id="my-modal-search" className="modal-toggle" />
            <label htmlFor="my-modal-search" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <label htmlFor="my-modal-search" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="form-control mt-8">
                        <div className="collapse-title text-xl font-medium p-0 ">
                            <div className="input-group ">
                                <input
                                    onChange={(event) => changeWordForSearch(event)}
                                    type="text"
                                    placeholder={`Search in bible, ${versionSelected}`}
                                    className="input input-bordered w-full"
                                />
                                <button onClick={() => searchWord()} className="btn btn-square">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                            </div>
                            {
                                (matchBooksAndChapters.books.length !== 0 && (wordForSearch !== "" && wordForSearch !== undefined)) ?
                                    <div tabIndex={0} className="collapse-open collapse border border-base-300 bg-base-100">
                                        <div className="collapse-content flex flex-col gap-2">
                                            {matchBooksAndChapters.books.map((currentBook, index) =>
                                                matchBooksAndChapters.chapter <= currentBook.chapters ?
                                                    <label
                                                        key={`${currentBook.name} ${index}`}
                                                        htmlFor="my-modal-search"
                                                        onClick={() => changeBookandChapter(currentBook, matchBooksAndChapters.chapter)}
                                                        className='cursor-pointer hover:text-primary'
                                                    >
                                                        {currentBook.name} {matchBooksAndChapters.chapter}
                                                    </label>
                                                    :
                                                    null

                                            )}
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>

                    {
                        (isFetching) ?
                            <div>
                                {/* <span className="loading loading-spinner loading-lg"></span> */}
                                <div className="rounded-md p-4 w-full h-auto mx-auto">
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="flex-1 space-y-6 py-1">
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="h-2 bg-current rounded col-span-2"></div>
                                                    <div className="h-2 bg-current rounded col-span-1"></div>
                                                </div>
                                                <div className="h-2 bg-current rounded"></div>
                                            </div>
                                            <div className="h-2 bg-current rounded"></div>
                                            <div className="h-2 bg-current rounded"></div>
                                        </div>
                                    </div>
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="flex-1 space-y-6 py-1">
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="h-2 bg-current rounded col-span-2"></div>
                                                    <div className="h-2 bg-current rounded col-span-1"></div>
                                                </div>
                                                <div className="h-2 bg-current rounded"></div>
                                            </div>
                                            <div className="h-2 bg-current rounded"></div>
                                            <div className="h-2 bg-current rounded"></div>
                                        </div>
                                    </div>
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="flex-1 space-y-6 py-1">
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="h-2 bg-current rounded col-span-2"></div>
                                                    <div className="h-2 bg-current rounded col-span-1"></div>
                                                </div>
                                                <div className="h-2 bg-current rounded"></div>
                                            </div>
                                            <div className="h-2 bg-current rounded"></div>
                                            <div className="h-2 bg-current rounded"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            : error ?
                                <div>
                                    <input type="checkbox" id="my-modal-search" className="modal-toggle" />

                                    <label htmlFor="my-modal-search" className="modal cursor-pointer">
                                        <label className="modal-box relative" htmlFor="">
                                            <label htmlFor="my-modal-search" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                            {`Error: ${error}`}
                                        </label>
                                    </label>
                                </div>
                                : searchResult !== undefined ?
                                    <div className="overflow-x-auto pt-5 flex flex-col gap-5">
                                        <p>Results: {searchResult.length}</p>
                                        {searchResult.map((verse: Verse) => (
                                            <div key={verse.text} className="text-xl font-medium">
                                                <label
                                                    key={`${verse}`}
                                                    htmlFor="my-modal-search"
                                                    onClick={() => changeBookandChapter(versions[versionSelected].filter((current, index) => index + 1 === verse.book)[0], verse.chapter)}
                                                    className='cursor-pointer'
                                                >
                                                    <div className="hover:text-primary" dangerouslySetInnerHTML={{ __html: verse.text }} ></div>
                                                </label>
                                                {
                                                    versions[versionSelected].filter((current, index) => index + 1 === verse.book)[0] &&
                                                    <p>{`${versions[versionSelected].filter((current, index) => index + 1 === verse.book)[0].name}`} {verse.chapter}:{verse.verse}</p>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    null
                    }
                </label>
            </label>
        </div>
    )

}

export default ModalSearch