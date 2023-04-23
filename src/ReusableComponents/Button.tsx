
type ButtonProps = {
    text: string;
    changeChapter: (moveTo: string, bookIdSelected: number) => void;
    move: string;
    bookIdSelected: number;
    hideInSmallScreen: boolean;
}

function Button({text, changeChapter, move, bookIdSelected, hideInSmallScreen}: ButtonProps) {
    return (
        <div
            className={`${hideInSmallScreen && "hidden sm:block"} btn rounded-full h-16 pb-2 text-5xl border-none text-current bg-base-100 hover:bg-primary`}
            onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth"});
                changeChapter(move, bookIdSelected)
            }}
        >
            {text}
        </div>
    )
}

export default Button