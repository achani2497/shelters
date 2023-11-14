import style from './RedirectButton.module.css'
import Link from "next/link"

export function RedirectButton({ label, url }) {

    return (
        <Link href={url} className={style.redirectButton}>{label}</Link>
    )
}