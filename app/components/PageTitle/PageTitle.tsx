import style from './PageTitle.module.css'
export function PageTitle({ title }: { title: string }) {
    return (
        <h1 className={style.pageTitle}>{title} </h1>
    )
}