import Button from "./Button"

function Loading() {
    return (
        <div className="max-w-[55rem] mx-auto flex flex-col p-10">
            <div className="animate-pulse flex justify-between text-4xl font-bold py-8">
                <Button
                    text={"<"}
                    changeChapter={() => {}}
                    move={"previous"}
                    bookIdSelected={0}
                    hideInSmallScreen={true}
                />
                <div className="animate-pulse mt-5 px-8 py-2 h-2 bg-primary rounded col-span-1 mb-5 w-[50%] mx-auto"></div>
                <Button
                    text={">"}
                    changeChapter={() => {}}
                    move={"previous"}
                    bookIdSelected={0}
                    hideInSmallScreen={true}
                />
            </div>
            <div className="rounded-md p-4 w-full h-[100vh] mx-auto">
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
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-current rounded col-span-2"></div>
                                <div className="h-2 bg-current rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-current rounded"></div>
                        </div>
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
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-current rounded col-span-2"></div>
                                    <div className="h-2 bg-current rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-current rounded"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-current rounded col-span-2"></div>
                                <div className="h-2 bg-current rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-current rounded"></div>
                        </div>
                        <div className="h-2 bg-current rounded"></div>
                        <div className="h-2 bg-current rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-current rounded col-span-2"></div>
                                <div className="h-2 bg-current rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-current rounded"></div>
                        </div>
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
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-current rounded col-span-2"></div>
                                    <div className="h-2 bg-current rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-current rounded"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-current rounded col-span-2"></div>
                                <div className="h-2 bg-current rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-current rounded"></div>
                        </div>
                        <div className="h-2 bg-current rounded"></div>
                        <div className="h-2 bg-current rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-current rounded col-span-2"></div>
                                <div className="h-2 bg-current rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-current rounded"></div>
                        </div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-current rounded col-span-2"></div>
                                    <div className="h-2 bg-current rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-current rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading