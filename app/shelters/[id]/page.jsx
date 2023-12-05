'use client'

import { supabase } from "@/lib/initSupabase"
import { DogCard } from "./components/DogCard"
import { PersonalCard } from "./components/PersonalCard"
import style from './styles.module.css'
import { PageTitle } from "@/app/components/PageTitle/PageTitle"
import { Flex } from "@chakra-ui/react"
import { DebtBanner } from "./components/DebtBanner/DebtBanner"

import { useEffect, useState } from "react"

function fetch(table, shelterId) {
    return supabase.from(table).select().eq('shelter_id', shelterId)
}

async function pichichosFetch(shelterId) {
    const { data, error } = await fetch('dog', shelterId);
    if (data) {
        return data
    } else {
        console.log(error)
        return []
    }
}

async function personalFetch(shelterId) {
    const { data, error } = await fetch('staff', shelterId);
    if (data) {
        return data
    } else {
        console.log(error)
        return []
    }

}

export default function Page({ params }) {

    const [pichichos, setPichichos] = useState([])
    const [staff, setStaff] = useState([])
    const [debt, setDebt] = useState()

    useEffect(() => {
        async function fetchShelterData() {
            const { data, error } = await supabase.from('shelter').select(`
            debt,
            dog (
                name,
                weight,
                age,
                photo_url,
                description
            ),
            staff (
                name,
                mail,
                phone,
                photo_url
            )
        `).eq('id', params['id']).single()
            return data
        }

        fetchShelterData().then(data => {
            setPichichos(data.dog)
            setStaff(data.staff)
            setDebt(data.debt)
        }).catch(error => {
            console.log(error)
        })

    }, [])

    return (
        <div className={style.shelterContainer} style={{ marginTop: debt > 0 ? '7rem' : '0' }}>
            {
                debt > 0 ? <DebtBanner debt={debt}></DebtBanner> : ''
            }
            <Flex flexDirection={'column'} padding={'0 2rem'}>
                <PageTitle title="Estos son nuestros amiguitos" />
                <ul className={style.cardContainer}>
                    {
                        pichichos.map(pichicho => {
                            return (
                                <DogCard
                                    dog={pichicho}
                                />
                            )
                        })
                    }
                </ul>
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