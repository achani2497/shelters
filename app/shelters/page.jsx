import '../globals.css'
import { ListOfShelters } from './ListOfShelters.jsx'
import { PageTitle } from '../components/PageTitle/PageTitle'

export default function Page() {
    return (
        <>
            {/* TODO: Agregar un layout que tenga un buscador de usuarios */}
            <PageTitle title="Estos son nuestros refugios" />
            <ListOfShelters />
        </>
    )
}