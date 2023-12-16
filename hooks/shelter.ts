import { useEffect, useState } from "react"
import { ShelterService, shelterRelations } from "../services/shelterService"



export function useFetchFromShelter({ id, fields }: { id: number, fields: shelterRelations[] }) {

    const [shelterData, setShelterData] = useState()
    const [finishedFetching, setFinishFetching] = useState(false)

    useEffect(() => {
        async function fetchShelterData() {
            try {
                const { data, error } = await ShelterService.fetchShelterData(id, fields)
                if (error) {
                    throw new Error(error.message)
                }
                return data
            } catch (error) {
                console.error(`Error fetching shelter ${id} data:`, error);
                return null;
            }
        }

        fetchShelterData()
            .then((data: any) => {
                if (data) {
                    setShelterData(data)
                }
            }).catch(error => {
                console.log(error)
            })
            .finally(() => setFinishFetching(true))

    }, [])

    return { shelterData, finishedFetching } as any
}

export function useFetchShelters(includes: shelterRelations[] = []) {

    const [shelters, setShelters] = useState([])
    const [finishedFetching, setFinishFetching] = useState(false)

    useEffect(() => {
        async function fetchShelters() {
            try {
                const { data, error } = await ShelterService.fetchShelters(includes);
                if (error) {
                    throw new Error(error.message); // Lanza una excepción en caso de error
                }
                return data;
            } catch (error) {
                console.error('Error fetching shelters:', error);
                return null;
            }
        }

        fetchShelters()
            .then((data: any) => {
                if (data) {
                    setShelters(data)
                }
            })
            .catch(e => console.log(e))
            .finally(() => {
                setFinishFetching(true)
            })
    }, [])

    return { shelters, finishedFetching }
}

export function useFetchAdoptedDogs() {
    const [adoptedDogs, setAdoptedDogs] = useState([])
    const [adoptedFinishedFetching, setFinishFetching] = useState(false)

    useEffect(() => {
        async function fetchAdoptedDogs() {
            try {
                const { data, error } = await ShelterService.fetchAdoptedDogs()
                if (error) {
                    throw new Error(error.message)
                }
                return data
            } catch (e) {
                console.error(`Error fetching adopted dogs data:`, e);
                return null;
            }

        }

        fetchAdoptedDogs()
            .then((data: any) => { if (data) { setAdoptedDogs(data) } })
            .catch(e => console.log(e))
            .finally(() => setFinishFetching(true))

    }, [])

    return { adoptedDogs, adoptedFinishedFetching }
}