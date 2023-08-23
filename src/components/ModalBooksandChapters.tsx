import { ModalBooksAndChapters, Versions } from '../types';
import versions_withBooks from './../data/translations_books.json'



function ModalBooksAndChapters({ currentVersion, changeBookandChapter, bookSelected, chapterSelected }: ModalBooksAndChapters) {
    const versions: Versions = {
        ...versions_withBooks
    };

    return (
        <div>
            <input type="checkbox" id="my-modal-books-chapters" className="modal-toggle" />

            <label htmlFor="my-modal-books-chapters" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Select book and chapter</h3>

                    <div className="overflow-x-auto">
                        {versions[currentVersion].map((book) => (
                            <div key={book.bookid} tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                                <input type="checkbox" defaultChecked={book.name === bookSelected.name}/>
                                <div className="collapse-title text-xl font-medium">
                                    <p className={`${book.name === bookSelected.name ? "text-primary" : ""}`}>{book.name}</p>
                                </div>
                                <div className="collapse-content grid grid-cols-8 gap-2">
                                    {Array.from({ length: book.chapters }, (_, index) => index + 1).map((number: number, index: number) => (
                                        <div key={index}>
                                            <label htmlFor="my-modal-books-chapters" onClick={() => changeBookandChapter(book, index + 1)} className={`btn ${(book.name === bookSelected.name && chapterSelected === index + 1) ? "btn-primary" : ""}`}>{index + 1}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>


                </label>
            </label>
        </div>
    )
}

export default ModalBooksAndChapters

{/* <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-books-chapters" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <h3 className="text-lg font-bold">Select book and chapter</h3>

                    <div className="overflow-x-auto">
                        {versions[currentVersion].map((book) => (
                            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                                <div className="collapse-title text-xl font-medium">
                                    {book.name}
                                </div>
                                <div className="collapse-content grid grid-cols-8 gap-2">
                                    {Array.from({ length: book.chapters }, (_, index) => index + 1).map((number: number, index: number) => (
                                        <div onClick={() => changeBookandChapter(book, index + 1)} className='btn'>{index + 1}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}