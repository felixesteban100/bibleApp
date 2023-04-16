
//https://bolls.life/search/YLT/?search=haggi&match_case=false&match_whole=true

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import versions_withBooks from './../data/translations_books.json'


type ModalSearchProps = {
    versionSelected: string;
}

type Verse = {
    pk: number;
    translation: string;
    book: number;
    chapter: number;
    verse: number;
    text: string;
}

type Versions = {
    [key: string]: {
        bookid: number;
        name: string;
        chronorder: number;
        chapters: number;
    }[];
};

type Book = {
    bookid: number,
    chronorder: number,
    name: string,
    chapters: number
}

function ModalSearch({ versionSelected }: ModalSearchProps) {
    const versions: Versions = { ...versions_withBooks };

    // const [wordForSearch, setWordForSearch] = useState<string | undefined>(undefined)
    const [wordForSearch, setWordForSearch] = useState<string | undefined>(undefined)

    const [isModalSearchActive, setIsModalSearchActive] = useState<boolean>(false)

    const { isLoading, error, data: searchResult, refetch: refetchSearch } = useQuery<Verse[]>({
        enabled: isModalSearchActive,
        queryKey: ['Search'],
        queryFn: () => {
            if (wordForSearch !== undefined) {
                return axios
                    // .get(`https://bolls.life/search/${versionSelected}/?search=${wordForSearch}&match_case=${false}&match_whole=${true}`)
                    .get(`https://bolls.life/search/${versionSelected}/?search=${wordForSearch}`)
                    .then((response) => response.data)
            }
            return []
        }
    })

    console.log(isModalSearchActive)
    console.log(wordForSearch)
    console.log(searchResult)

    function changeWordForSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setWordForSearch(event.target.value)
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
                        <div className="input-group">
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
                    </div>

                    {
                        isLoading ?
                            <div>
                                <input type="checkbox" id="my-modal-search" className="modal-toggle" />

                                <label htmlFor="my-modal-search" className="modal cursor-pointer">
                                    <label className="modal-box relative" htmlFor="">
                                        <label htmlFor="my-modal-search" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                        Loading...
                                    </label>
                                </label>
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
                                        {searchResult.map((verse: Verse) => (
                                            <div className="text-xl font-medium">
                                                {versions[versionSelected].map((book: Book) => {

                                                    // if (book.bookid === verse.book) {
                                                    return (
                                                        <span key={book.name} className="text-primary" >{book.name} {verse.chapter}:{verse.verse}</span>
                                                    )
                                                    // }
                                                })}
                                                <p>{verse.text}</p>
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