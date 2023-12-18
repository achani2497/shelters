import { SheltieButton } from "@/components/Button/Button";
import { daysPassed } from "@/utils/Functions";
import { Box } from "@chakra-ui/react";
import { Dog, DogCard } from "../DogCard/DogCard";
import { ElasticText } from "../ElasticText/ElasticText";
import style from './styles.module.css';

export function DogsList({ pichichos }: { pichichos: Dog[] }) {

    return (
        <ul className={style.cardContainer}>
            {
                pichichos?.map((dog, index) => {
                    return (
                        <DogCard
                            key={index}
                            dog={dog}
                        >
                            <Box>
                                <p><b>Peso:</b> {dog.weight} kg</p>
                                <p><b>Edad:</b> {dog.age} años</p>
                                <p>Lleva <b>{daysPassed(dog.shelter_enter_date)} días</b> con nosotros</p>
                            </Box>
                            <ElasticText text={dog.description} breakpoint={40} />
                            <SheltieButton label={'Lo quiero adoptar ❤️!'} />
                        </DogCard>
                    )
                })
            }
        </ul>
    )
}