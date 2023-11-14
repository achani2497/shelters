import style from './ComposedText.module.css'

interface IComposeText {
    title: string
    text?: string | null
}

export function ComposedText({ title, text }: IComposeText) {
    return (
        <div className={style.textContainer}>
            <span className={style.textTitle}>{title}</span>
            {text ? <span>{text}</span> : null}
        </div>
    )
}