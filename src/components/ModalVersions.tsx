import languages from './../data/languages.json'

type ModalVersionsProps = {
    changeVersion: (versionABR: string) => void
}

function ModalVersions({ changeVersion }: ModalVersionsProps) {
    return (
        <div>
            <input type="checkbox" id="my-modal-options" className="modal-toggle" />

            <label htmlFor="my-modal-options" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <label htmlFor="my-modal-options" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <div className="overflow-x-auto pt-5">
                        {languages.map((currentLanguage, index) => (
                            <div key={index} tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                                <div className="collapse-title text-xl font-medium">
                                    {currentLanguage.language}
                                </div>
                                <div className="collapse-content flex flex-col gap-2">
                                    {currentLanguage.translations.map((version) => (
                                        <div key={version.full_name} className='btn' onClick={() => changeVersion(version.short_name)}>
                                            {version.full_name[0].toUpperCase()}{version.full_name.slice(1)}
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

export default ModalVersions