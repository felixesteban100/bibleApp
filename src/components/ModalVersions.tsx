import { versionsDownloaded } from '../data/database';
import { ModalVersionsProps, Version, VersionsDownloaded } from '../types'
import languages from './../data/languages.json'



function ModalVersions({ changeVersion, downloadVersion, /* versionsDownloaded,  */versionDownloading }: ModalVersionsProps) {
    function hasVersion(arr: VersionsDownloaded[], version: Version): boolean {
        return arr.some(currentVersionDownload =>
            currentVersionDownload.versionFullName === version.full_name
            && currentVersionDownload.versionShortName === version.short_name);
    }


    return (
        <div>
            <input type="checkbox" id="my-modal-options" className="modal-toggle" />

            <label htmlFor="my-modal-options" className="modal cursor-pointer w-full">
                <label className="modal-box relative" htmlFor="">
                    <label htmlFor="my-modal-options" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <div className="overflow-x-auto pt-5">
                        {languages.map((currentLanguage, index) => {
                            return (
                                <div key={index} tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                                    <input type="checkbox" />
                                    <div className="collapse-title text-xl font-medium">
                                        {currentLanguage.language}
                                    </div>
                                    <div className="collapse-content flex flex-col gap-2">
                                        {currentLanguage.translations.map((version) => (
                                            <div
                                                key={version.full_name}
                                                className='flex flex-wrap justify-center gap-2'
                                            >
                                                {/* add to this a tooltip of the full name of the version */}
                                                <div
                                                    className='tooltip'
                                                    data-tip={version.full_name}
                                                >
                                                    <div
                                                        className='btn'
                                                        
                                                        onClick={() => changeVersion(version.short_name)}
                                                    >
                                                        {/* {version.full_name[0].toUpperCase()}
                                                    {version.full_name.length < 30 ? version.full_name.slice(1) : `${version.full_name.slice(1, 30)}...`} */}
                                                        {version.short_name}
                                                    </div>
                                                </div>
                                                {/* add to this a tooltip of download version */}
                                                {
                                                    hasVersion(versionsDownloaded, version) === false ?
                                                        <div
                                                            onClick={() => { if (versionDownloading.processRunning === false) downloadVersion(version) }}
                                                            className={`
                                                                btn btn-circle 
                                                                ${(versionDownloading.processRunning === false) && "hover:btn-primary"}
                                                                ${(versionDownloading.processRunning === true && versionDownloading.versionFullName === version.full_name) && "cursor-progress bg-primary border-primary hover:bg-primary hover:border-primary animate-bounce"}
                                                                ${(versionDownloading.processRunning === true && versionDownloading.versionFullName !== version.full_name) && "cursor-progress"}
                                                            `}
                                                        >
                                                            {(versionDownloading.versionFullName === version.full_name)
                                                                ? <span className="loading loading-spinner loading-xs"></span>
                                                                : <svg className='h-8 w-8 text-current' viewBox="0 0 24 24" fill="fill-current" xmlns="http://www.w3.org/2000/svg">
                                                                    <g id="Interface / Download">
                                                                        <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </g>
                                                                </svg>
                                                            }
                                                        </div>
                                                        :
                                                        <div className='btn btn-primary btn-circle btn-disabled'>
                                                            <svg className='h-10 w-10 text-current' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path /* fill="#0F1729" */ fill='fill-current' fillRule="evenodd" clipRule="evenodd" d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.4142 17C9.63316 17.7811 8.36683 17.781 7.58579 17L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z" />
                                                            </svg>
                                                        </div>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </label>
            </label>
        </div >
    )
}

export default ModalVersions