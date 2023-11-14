import style from './styles.module.css'

export default function ShelterLayout({ children }: any) {

    const debt = Math.floor(Math.random() * 175000)

    function debtWithCommas() {
        return debt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <div className={style.shelterLayoutContainer}>
            {
                debt > 75000 ? (
                    <div className={style.debtBanner}>
                        <span><b>Nuestra deuda asciende hasta los ${debtWithCommas()} </b></span>
                        <button className={style.debtButton}>¡Ayudanos!</button>
                    </div>
                ) : null
            }
            {children}
        </div>
    )
}