import { ModalSettingsProps } from "../types";
import { dbForVersionsDownloaded/* , versionsDownloaded */ } from "../data/database";

function ModalSettings({
    textSize,
    changeTextSize,
    fontFamily,
    changeFontFamily,
    history,
    changeBookandChapter,
    changeVersion,
    theme,
    setTheme,
    setHistory,

    highlithedVerses,
    setHighlithedVerses,

    // versionsDownloaded,
    // setVersionsDownloaded,

}: ModalSettingsProps) {
    // const [rangeValue, setRangeValue] = useLocalStorage("BIBLEAPP_RANGEVALUE", "25")

    const reversedHistory = history.slice().reverse();

    const reversedHighlights = highlithedVerses.slice().reverse();

    const themes = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
    ]

    // console.log(versionsDownloaded)


    return (
        <div>
            <input type="checkbox" id="my-modal-settings" className="modal-toggle" />
            <label htmlFor="my-modal-settings" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <label htmlFor="my-modal-settings" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <div className="flex flex-col gap-2 p-5 rounded-md">
                        <div className="flex gap-2">
                            <svg className="fill-primary w-8 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2,21H6a1,1,0,0,0,0-2H5.376l1.951-6h5.346l1.95,6H14a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2H16.727L11.751,3.69A1,1,0,0,0,10.8,3H9.2a1,1,0,0,0-.951.69L3.273,19H2a1,1,0,0,0,0,2ZM9.927,5h.146l1.95,6H7.977ZM23,16a1,1,0,0,1-1,1H19a1,1,0,0,1,0-2h.365l-.586-1.692H17a1,1,0,0,1,0-2h1.087L17.288,9h-.576l-.113.327a1,1,0,0,1-1.891-.654l.346-1A1,1,0,0,1,16,7h2a1,1,0,0,1,.945.673L21.481,15H22A1,1,0,0,1,23,16Z" /></svg>
                            <p className="text-primary text-2xl font-bold">Font size</p>
                        </div>


                        {/* <div>
                            <input type="range" min="0" max="100" value={rangeValue} className="range" step="25" />
                            <div className="w-full flex justify-between text-xs px-2">
                                <span onClick={() => setRangeValue("0")}>|</span>
                                <span onClick={() => setRangeValue("25")}>|</span>
                                <span onClick={() => setRangeValue("50")}>|</span>
                                <span onClick={() => setRangeValue("75")}>|</span>
                                <span onClick={() => setRangeValue("100")}>|</span>
                            </div>
                        </div> */}

                        <div className="grid grid-flow-col gap-5 w-full">
                            <button
                                className="btn btn-primary text-lg"
                                onClick={() => changeTextSize(textSize - 1)}
                            >
                                A-
                            </button>
                            <button
                                className="btn btn-primary text-4xl"
                                onClick={() => changeTextSize(textSize + 1)}
                            >
                                A+
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 p-5 rounded-md">
                        <div className="flex gap-2">
                            <svg className="fill-primary w-8 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M2.5 4.5C2.5 3.09886 3.59886 2 5 2H12.499C12.7752 2 13 2.22386 13 2.5C13 2.77614 12.7761 3 12.5 3H8.69244L8.40509 3.85458C8.18869 4.49752 7.89401 5.37197 7.58091 6.29794C7.50259 6.52956 7.42308 6.76453 7.34332 7H8.5C8.77614 7 9 7.22386 9 7.5C9 7.77614 8.77614 8 8.5 8H7.00407C6.56724 9.28543 6.16435 10.4613 5.95799 11.0386C5.63627 11.9386 5.20712 12.4857 4.66741 12.7778C4.16335 13.0507 3.64154 13.0503 3.28378 13.05L3.25 13.05C2.94624 13.05 2.7 12.8037 2.7 12.5C2.7 12.1962 2.94624 11.95 3.25 11.95C3.64182 11.95 3.9035 11.9405 4.14374 11.8105C4.36443 11.691 4.65532 11.4148 4.92217 10.6683C5.10695 10.1514 5.45375 9.14134 5.8422 8H4.5C4.22386 8 4 7.77614 4 7.5C4 7.22386 4.22386 7 4.5 7H6.18187C6.30127 6.64785 6.42132 6.29323 6.53887 5.94559C6.85175 5.02025 7.14627 4.14631 7.36256 3.50368L7.53192 3H5C4.15114 3 3.5 3.65114 3.5 4.5C3.5 4.77614 3.27614 5 3 5C2.72386 5 2.5 4.77614 2.5 4.5Z" /></svg>
                            <p className="text-primary text-2xl font-bold">Font family</p>
                        </div>

                        <div className="flex flex-col justify-center">
                            <p
                                className={`${fontFamily === "font-sans" ? "text-primary" : ""} hover:text-primary text-lg font-sans`}
                                onClick={() => changeFontFamily("font-sans")}
                            >
                                font-sans
                            </p>

                            <p
                                className={`${fontFamily === "font-serif" ? "text-primary" : ""} hover:text-primary text-lg font-serif`}
                                onClick={() => changeFontFamily("font-serif")}
                            >
                                font-serif
                            </p>

                            <p
                                className={`${fontFamily === "font-mono" ? "text-primary" : ""} hover:text-primary text-lg font-mono`}
                                onClick={() => changeFontFamily("font-mono")}
                            >
                                font-mono
                            </p>
                        </div>
                    </div>



                    {/* <div className="flex flex-col gap-2 p-5 rounded-md">
                        <div tabIndex={0} className="collapse border border-base-300 bg-base-100 rounded-box">
                            <div className="collapse-title text-xl font-medium">
                                <p className="text-primary text-2xl font-bold">Font family</p>
                            </div>
                            <div className="collapse-content">
                                <div className="flex flex-col justify-center">
                                    <p
                                        className={`${fontFamily === "font-sans" ? "text-primary" : ""} hover:text-primary text-lg font-sans`}
                                        onClick={() => changeFontFamily("font-sans")}
                                    >
                                        font-sans
                                    </p>

                                    <p
                                        className={`${fontFamily === "font-serif" ? "text-primary" : ""} hover:text-primary text-lg font-serif`}
                                        onClick={() => changeFontFamily("font-serif")}
                                    >
                                        font-serif
                                    </p>

                                    <p
                                        className={`${fontFamily === "font-mono" ? "text-primary" : ""} hover:text-primary text-lg font-mono`}
                                        onClick={() => changeFontFamily("font-mono")}
                                    >
                                        font-mono
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="flex flex-col gap-2 p-5 rounded-md">
                        <p className="text-primary text-2xl">Font family</p>
                        <div className="flex gap-5">
                            <div className="relative inline-block w-64">
                                <select
                                    value={fontFamily}
                                    onChange={(event) => changeFontFamily(event.target.value)}
                                    className="block appearance-none w-full  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="font-sans" >font-sans</option>
                                    <option value="font-serif">font-serif</option>
                                    <option value="font-mono" >font-mono</option>
                                </select>
                            </div>
                        </div>
                    </div> */}


                    <div className="flex flex-col gap-2 p-5 rounded-md">
                        <div tabIndex={0} className="collapse border bg-base-100 rounded-box border-primary">
                            <div className="collapse-title font-medium flex gap-2 pr-5">
                                <svg className="fill-primary w-8 h-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5.01112 11.5747L6.29288 10.2929C6.68341 9.90236 7.31657 9.90236 7.7071 10.2929C8.09762 10.6834 8.09762 11.3166 7.7071 11.7071L4.7071 14.7071C4.51956 14.8946 4.26521 15 3.99999 15C3.73477 15 3.48042 14.8946 3.29288 14.7071L0.292884 11.7071C-0.0976406 11.3166 -0.0976406 10.6834 0.292884 10.2929C0.683408 9.90236 1.31657 9.90236 1.7071 10.2929L3.0081 11.5939C3.22117 6.25933 7.61317 2 13 2C18.5229 2 23 6.47715 23 12C23 17.5228 18.5229 22 13 22C9.85817 22 7.05429 20.5499 5.22263 18.2864C4.87522 17.8571 4.94163 17.2274 5.37096 16.88C5.80028 16.5326 6.42996 16.599 6.77737 17.0283C8.24562 18.8427 10.4873 20 13 20C17.4183 20 21 16.4183 21 12C21 7.58172 17.4183 4 13 4C8.72441 4 5.23221 7.35412 5.01112 11.5747ZM13 5C13.5523 5 14 5.44772 14 6V11.5858L16.7071 14.2929C17.0976 14.6834 17.0976 15.3166 16.7071 15.7071C16.3166 16.0976 15.6834 16.0976 15.2929 15.7071L12.2929 12.7071C12.1054 12.5196 12 12.2652 12 12V6C12 5.44772 12.4477 5 13 5Z" /></svg>
                                <p className="text-primary text-2xl font-bold">History</p>
                                <div className="w-full flex justify-end">
                                    <button
                                        onClick={() => setHistory([])}
                                    >
                                        <svg className="fill-primary w-8 h-10 hover:text-red-500" /* className="fill-current hover:text-red-500" width="40" height="40" */ viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path className="fill-current hover:text-red-500" fill="#000000" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z" /></svg>
                                    </button>
                                </div>
                            </div>

                            <div className="collapse-content">

                                <div className="flex flex-col justify-center">
                                    {
                                        reversedHistory.map((currentChapter, index) => (
                                            <label
                                                key={index}
                                                htmlFor="my-modal-settings"
                                                onClick={() => {
                                                    changeVersion(currentChapter.version)
                                                    changeBookandChapter(currentChapter.book, currentChapter.chapter)
                                                }}
                                                className="hover:text-primary cursor-pointer text-2xl"
                                            >
                                                {currentChapter.book.name} {currentChapter.chapter}  {currentChapter.version}
                                            </label>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 p-5 rounded-md">
                        <div tabIndex={0} className="collapse border bg-base-100 rounded-box border-primary">
                            <div className="collapse-title font-medium flex gap-2 pr-5">
                                <svg className="fill-primary w-8 h-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5.01112 11.5747L6.29288 10.2929C6.68341 9.90236 7.31657 9.90236 7.7071 10.2929C8.09762 10.6834 8.09762 11.3166 7.7071 11.7071L4.7071 14.7071C4.51956 14.8946 4.26521 15 3.99999 15C3.73477 15 3.48042 14.8946 3.29288 14.7071L0.292884 11.7071C-0.0976406 11.3166 -0.0976406 10.6834 0.292884 10.2929C0.683408 9.90236 1.31657 9.90236 1.7071 10.2929L3.0081 11.5939C3.22117 6.25933 7.61317 2 13 2C18.5229 2 23 6.47715 23 12C23 17.5228 18.5229 22 13 22C9.85817 22 7.05429 20.5499 5.22263 18.2864C4.87522 17.8571 4.94163 17.2274 5.37096 16.88C5.80028 16.5326 6.42996 16.599 6.77737 17.0283C8.24562 18.8427 10.4873 20 13 20C17.4183 20 21 16.4183 21 12C21 7.58172 17.4183 4 13 4C8.72441 4 5.23221 7.35412 5.01112 11.5747ZM13 5C13.5523 5 14 5.44772 14 6V11.5858L16.7071 14.2929C17.0976 14.6834 17.0976 15.3166 16.7071 15.7071C16.3166 16.0976 15.6834 16.0976 15.2929 15.7071L12.2929 12.7071C12.1054 12.5196 12 12.2652 12 12V6C12 5.44772 12.4477 5 13 5Z" /></svg>
                                <p className="text-primary text-2xl font-bold">Highlights</p>
                                <div className="w-full flex justify-end">
                                    <button
                                        onClick={() => setHighlithedVerses([])}
                                    >
                                        <svg className="fill-primary w-8 h-10 hover:text-red-500" /* className="fill-current hover:text-red-500" width="40" height="40" */ viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path className="fill-current hover:text-red-500" fill="#000000" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z" /></svg>
                                    </button>
                                </div>
                            </div>

                            <div className="collapse-content">

                                <div className="flex flex-col justify-center">
                                    {
                                        reversedHighlights.map((currentVerse, index) => (
                                            <label
                                                key={index}
                                                htmlFor="my-modal-settings"
                                                onClick={() => {
                                                    changeVersion(currentVerse.version)
                                                    changeBookandChapter(currentVerse.book, currentVerse.chapter)
                                                }}
                                                className="hover:text-primary cursor-pointer text-2xl"
                                            >
                                                {currentVerse.book.name} {currentVerse.chapter}:{currentVerse.verse}  {currentVerse.version}

                                                <div className="hover:text-primary text-xl md:text-2xl" dangerouslySetInnerHTML={{ __html: currentVerse.text }} ></div>

                                                {index !== reversedHighlights.length ? <div className="h-1 bg-primary my-2" /> : null}
                                            </label>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="flex flex-col gap-2 p-5 rounded-md">
                        <div tabIndex={0} className="collapse border bg-base-100 rounded-box border-primary">
                            <div className="collapse-title font-medium flex gap-2 pr-5">
                                <svg className="fill-primary w-8 h-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5.01112 11.5747L6.29288 10.2929C6.68341 9.90236 7.31657 9.90236 7.7071 10.2929C8.09762 10.6834 8.09762 11.3166 7.7071 11.7071L4.7071 14.7071C4.51956 14.8946 4.26521 15 3.99999 15C3.73477 15 3.48042 14.8946 3.29288 14.7071L0.292884 11.7071C-0.0976406 11.3166 -0.0976406 10.6834 0.292884 10.2929C0.683408 9.90236 1.31657 9.90236 1.7071 10.2929L3.0081 11.5939C3.22117 6.25933 7.61317 2 13 2C18.5229 2 23 6.47715 23 12C23 17.5228 18.5229 22 13 22C9.85817 22 7.05429 20.5499 5.22263 18.2864C4.87522 17.8571 4.94163 17.2274 5.37096 16.88C5.80028 16.5326 6.42996 16.599 6.77737 17.0283C8.24562 18.8427 10.4873 20 13 20C17.4183 20 21 16.4183 21 12C21 7.58172 17.4183 4 13 4C8.72441 4 5.23221 7.35412 5.01112 11.5747ZM13 5C13.5523 5 14 5.44772 14 6V11.5858L16.7071 14.2929C17.0976 14.6834 17.0976 15.3166 16.7071 15.7071C16.3166 16.0976 15.6834 16.0976 15.2929 15.7071L12.2929 12.7071C12.1054 12.5196 12 12.2652 12 12V6C12 5.44772 12.4477 5 13 5Z" /></svg>
                                <p className="text-primary text-2xl font-bold">Versions Downloaded</p>
                                <div className="w-full flex justify-end">
                                    <button
                                        // onClick={() => setVersionsDownloaded([])}
                                        onClick={async () => {
                                            // await dbForVersionsDownloaded.clear("versionsDownloaded")
                                        }}
                                    >
                                        <svg className="fill-primary w-8 h-10 hover:text-red-500" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path className="fill-current hover:text-red-500" fill="#000000" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z" /></svg>
                                    </button>
                                </div>
                            </div>

                            <div className="collapse-content">

                                <div className="flex flex-col justify-center">
                                     {
                                        versionsDownloaded.map((currentVersion, index) => (
                                            <label
                                                key={index}
                                                htmlFor="my-modal-settings"
                                                onClick={() => {
                                                    changeVersion(currentVersion.versionShortName)
                                                }}
                                                className="hover:text-primary cursor-pointer text-2xl"
                                            >
                                                {currentVersion.versionFullName}
                                            </label>
                                        ))
                                    } 
                                </div>
                            </div>
                        </div>
                    </div> */}


                    <div className="flex flex-col gap-2 p-5 rounded-md">
                        <div tabIndex={0} className="collapse border bg-base-100 rounded-box border-primary">
                            <div className="collapse-title font-medium flex gap-2">
                                <svg className="fill-primary w-8 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.73 29.73"><g><path d="M14.865,0C6.655,0,0,6.655,0,14.865c0,1.714,0.201,2.83,0.767,4.546c1.104,3.188,6.896-2.808,9.388,0.729 c2.492,3.535-5.62,6.64-0.18,8.764c2.475,0.601,3.175,0.826,4.89,0.826c8.21,0,14.865-6.654,14.865-14.864 C29.73,6.655,23.075,0,14.865,0z M22.077,4.955c1.694,0,3.069,1.17,3.069,2.614c0,1.442-1.375,2.613-3.069,2.613 c-1.695,0-3.07-1.171-3.07-2.613C19.007,6.125,20.381,4.955,22.077,4.955z M4.74,15.802c-1.695,0-3.069-1.171-3.069-2.614 s1.375-2.614,3.069-2.614c1.696,0,3.071,1.171,3.071,2.614S6.437,15.802,4.74,15.802z M8.335,9.784c-1.695,0-3.07-1.17-3.07-2.614 c0-1.444,1.375-2.614,3.07-2.614s3.07,1.17,3.07,2.614C11.405,8.614,10.03,9.784,8.335,9.784z M12.078,4.189 c0-1.443,1.374-2.615,3.07-2.615c1.694,0,3.068,1.172,3.068,2.615s-1.375,2.614-3.068,2.614 C13.452,6.803,12.078,5.632,12.078,4.189z M17.341,27.627c-1.696,0-3.069-1.17-3.069-2.613s1.375-2.613,3.069-2.613 c1.695,0,3.07,1.17,3.07,2.613S19.036,27.627,17.341,27.627z M23.48,23.155c-1.695,0-3.069-1.173-3.069-2.614 c0-1.443,1.374-2.614,3.069-2.614c1.694,0,3.069,1.171,3.069,2.614C26.55,21.982,25.176,23.155,23.48,23.155z M25.146,16.604 c-1.695,0-3.07-1.17-3.07-2.614s1.375-2.614,3.07-2.614s3.07,1.17,3.07,2.614S26.843,16.604,25.146,16.604z" /></g></svg>
                                <p className="text-primary text-2xl font-bold">Theme</p>
                            </div>
                            <div className="collapse-content">
                                <div className="flex flex-col justify-center">
                                    {
                                        themes.map((currentTheme) => (
                                            <div key={currentTheme} data-theme={currentTheme} className="form-control">
                                                <label className="label cursor-pointer">
                                                    <span className="label-text">{currentTheme}</span>
                                                    {theme === currentTheme ?
                                                        <input type="radio" name="radio-10" className="radio checked:bg-primary" defaultChecked />
                                                        :
                                                        <input onClick={() => setTheme(currentTheme)} type="radio" name="radio-10" className="radio checked:bg-primary" />
                                                    }
                                                </label>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </label>
            </label>
        </div>
    )
}

export default ModalSettings