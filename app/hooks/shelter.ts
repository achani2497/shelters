import { supabase } from "@/lib/initSupabase"
import { useEffect, useState } from "react"

const shelterRelations = {
    'dog': 'dog (name,weight,age,photo_url,description,shelter_enter_date)',
    'staff': 'staff (name,mail,phone,photo_url)',
    'comment': 'comment (person_name, comment, comment_date)'
}

export function useFetchFromShelter({ id, fields }: { id: number, fields: string[] }) {

    const [shelterData, setShelterData] = useState()
    const [finishedFetching, setFinishFetching] = useState(false)

    const joinString = fields.map(field => shelterRelations[field]).join(', ')

    useEffect(() => {
        async function fetchShelterData() {
            const { data, error } = await supabase.from('shelter').select(`
                id,
                name,
                debt,
                ${joinString}
            `).eq('id', id).single()
            if (error) {
                return error
            }
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