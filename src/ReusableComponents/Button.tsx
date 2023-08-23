import { ButtonProps } from "../types";

function Button({text, changeChapter, move, bookIdSelected, hideInSmallScreen, changeFontSize}: ButtonProps) { 
    return (
        <div
        // className={`${hideInSmallScreen && "hidden sm:block"} btn rounded-full h-16 pt-1 text-5xl border-none text-current bg-base-100 hover:bg-primary`}
            className={`${hideInSmallScreen && "hidden sm:block"} btn btn-primary h-5 hover:text-base-100 rounded-full border-none text-current ${changeFontSize ? "text-[10px]" : "text-xl"}`}
            onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth"});
                changeChapter(move, bookIdSelected)
            }}
        >
            <div className="flex items-center justify-center w-full h-full">
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Button