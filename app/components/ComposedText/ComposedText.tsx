import style from './ComposedText.module.css'

type ComposeText = {
    title: string
    text?: string | null
}

export function ComposedText({ title, text }: ComposeText) {
    return (
        <div className={style.textContainer}>
            <span className={style.textTitle}>{title}</span>
            {text ? <span>{text}</span> : null}
        </div>
    )
}