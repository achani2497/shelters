import Link from "next/link"
import styles from './Navigation.module.css'

const links = [
    {
        label: 'Home',
        route: '/'
    },
    {
        label: 'Refugios',
        route: '/shelters'
    },
    {
        label: 'Mascotas',
        route: '/'
    }
]
export function Navigation() {

    return (
        <header>
            <nav>
                <ul className={styles.navigation}>
                    {links.map(({ label, route }) => {
                        return (
                            <li key={route}>
                                <Link href={route}>{label}</Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    )
}