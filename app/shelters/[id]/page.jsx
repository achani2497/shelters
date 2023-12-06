'use client'

import { supabase } from "@/lib/initSupabase"
import { DogsList } from "./components/DogsList/DogList"
import { PersonalCard } from "./components/PersonalCard"
import style from './styles.module.css'
import { PageTitle } from "@/app/components/PageTitle/PageTitle"
import { Flex } from "@chakra-ui/react"
import { DebtBanner } from "./components/DebtBanner/DebtBanner"

import { useEffect, useState } from "react"

function fetch(table, shelterId) {
    return supabase.from(table).select().eq('shelter_id', shelterId)
}

export default function Page({ params }) {

    const [pichichos, setPichichos] = useState([])
    const [staff, setStaff] = useState([])
    const [debt, setDebt] = useState()
    const [shelterId, setShelterId] = useState()

    useEffect(() => {
        async function fetchShelterData() {
            const { data, error } = await supabase.from('shelter').select(`
            id,
            debt,
            dog (
                name,
                weight,
                age,
                photo_url,
                description,
                shelter_enter_date
            ),
            staff (
                name,
                mail,
                phone,
                photo_url
            )
        `).eq('id', params['id']).single()
            console.log(data)
            return data
        }

        fetchShelterData().then(data => {
            setPichichos(data.dog)
            setStaff(data.staff)
            setDebt(data.debt)
            setShelterId(data.id)
        }).catch(error => {
            console.log(error)
        })

    }, [])

    return (
        <div className={style.shelterContainer} style={{ marginTop: debt > 0 ? '2rem' : '0' }}>
            {
                debt > 0 ? <DebtBanner debtProp={debt} shelterId={shelterId}></DebtBanner> : ''
            }
            <Flex flexDirection={'column'} padding={'0 2rem'}>
                <PageTitle title="Estos son nuestros amiguitos" />
                <DogsList pichichos={pichichos}/>
            </Flex>
            <Flex flexDirection={'column'} padding={'0 2rem'}>
                <PageTitle title="Nuestro personal" />
                <ul className={style.cardContainer}>
                    {
                        staff.map(person => {
                            return (
                                <PersonalCard
                                    person={person}
                                />
                            )
                        })
                    }
                </ul>
            </Flex>
        </div>
    )
}