import { ComposedText } from "../ComposedText/ComposedText";
import { RedirectButton } from "../RedirectButton/RedirectButton";
import style from './DescriptionCard.module.css'
import Image from "next/image";

export function DescriptionCard({ photoUrl, title, description, buttonText, buttonUrl }) {
    return (
        <>
            <div className={style.descriptionCard}>
                <Image src={photoUrl} width={200} height={200} className={style.descriptionCardImageSection}></Image>
                <div className={style.descriptionCardTextSection}>
                    <ComposedText title={title} text={description}></ComposedText>
                    <RedirectButton label={buttonText} url={buttonUrl}></RedirectButton>
                </div>
            </div>
        </>
    )
}