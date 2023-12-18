import { PageTitle } from '../../components/PageTitle/PageTitle'
import '../globals.css'
import { ListOfShelters } from './_components/ListOfShelters/ListOfShelters'

export default function Page() {
    return (
        <>
            <PageTitle title="Estos son nuestros refugios" />
            <ListOfShelters />
        </>
    )
}