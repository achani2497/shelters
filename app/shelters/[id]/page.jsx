'use client'

import { supabase } from "@/lib/initSupabase"
import { DogsList } from "./components/DogsList/DogList"
import { PersonalCard } from "./components/PersonalCard"
import style from './styles.module.css'
import { PageTitle } from "@/app/components/PageTitle/PageTitle"
import { Flex } from "@chakra-ui/react"
import { DebtBanner } from "./components/DebtBanner/DebtBanner"
import { Skeleton } from "@chakra-ui/react"

import { useEffect, useState } from "react"

function fetch(table, shelterId) {
    return supabase.from(table).select().eq('shelter_id', shelterId)
}

export default function Page({ params }) {

    const [pichichos, setPichichos] = useState([])
    const [staff, setStaff] = useState([])
    const [debt, setDebt] = useState()
    const [shelterId, setShelterId] = useState()
    const [shelterName, setShelterName] = useState()

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        async function fetchShelterData() {
            const { data, error } = await supabase.from('shelter').select(`
                id,
                name,
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
            if(error){
             return error   
            }
            return data
        }

        fetchShelterData().then(data => {
            setPichichos(data.dog)
            setStaff(data.staff)
            setDebt(data.debt)
            setShelterId(data.id)
            setShelterName(data.name)

            setIsLoaded(true)
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
                    <Skeleton height={'auto'} isLoaded={isLoaded}>
                        <PageTitle title={`Estos son los amiguitos que tenemos en ${shelterName}`} />
                        <DogsList pichichos={pichichos}/>
                    </Skeleton>
                </Flex>
                <Flex flexDirection={'column'} padding={'0 2rem'}>
                    <Skeleton height={'auto'} isLoaded={isLoaded}>
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
                    </Skeleton>
                </Flex>
        </div>
    )
}