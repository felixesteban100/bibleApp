
type ButtonProps = {
    text: string;
    changeChapter: (moveTo: string) => void;
    move: string;
}

function Button({text, changeChapter, move}: ButtonProps) {
    return (
        <div
            className={"btn rounded-full h-16 pb-2 text-5xl border-none text-current bg-base-100 hover:bg-primary"}
            onClick={() => changeChapter(move)}
        >
            {text}
        </div>
    )
}

export default Button