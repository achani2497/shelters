import { PageTitle } from '../../components/PageTitle/PageTitle'
import '../globals.css'
import { ListOfShelters } from './_components/ListOfShelters/ListOfShelters'

export default function Page() {
    return (
        <>
            {/* TODO: Agregar un layout que tenga un buscador de usuarios */}
            <PageTitle title="Estos son nuestros refugios" />
            <ListOfShelters />
        </>
    )
}