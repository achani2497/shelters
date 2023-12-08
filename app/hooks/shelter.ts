import { useEffect, useState } from "react"
import { ShelterService } from "../services/shelterService"



export function useFetchFromShelter({ id, fields }: { id: number, fields: string[] }) {

    const [shelterData, setShelterData] = useState()
    const [finishedFetching, setFinishFetching] = useState(false)

    useEffect(() => {
        async function fetchShelterData() {
            const { data, error } = await ShelterService.fetchShelterData(id, fields)
            return data
        }

        fetchShelterData().then((data: any) => {
            setShelterData(data)
            setFinishFetching(true)
        }).catch(error => {
            console.log(error)
        })

    }, [])

    return [shelterData, finishedFetching]
}

export function useFetchShelters() {

    const [shelters, setShelters] = useState([])
    const [finishedFetching, setFinishFetching] = useState(false)

    useEffect(() => {
        async function fetchShelters() {
            const { data, error } = await ShelterService.fetchShelters()
            if (error) {
                return error
            }
            return data
        }

        fetchShelters().then((data: any) => {
            setShelters(data)
            setFinishFetching(true)
        })
            .catch(e => console.log(e))
    }, [])

    return [shelters, finishedFetching]
}