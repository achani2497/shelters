"use client";

import { PageTitle } from "@/components/PageTitle/PageTitle";
import { VolunteerForm } from "@/components/VolunteerForm/VolunteerForm";
import { useFetchFromShelter } from '@/hooks/shelter';
import { AddIcon } from '@chakra-ui/icons';
import { Button, Flex, Modal, ModalCloseButton, ModalContent, ModalOverlay, Skeleton, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Comments } from "./components/Comments/Comments";
import { DebtBanner } from "./components/DebtBanner/DebtBanner";
import { DogsList } from "./components/DogsList/DogList";
import { PersonalCard } from "./components/PersonalCard";
import style from "./styles.module.css";

export default function Page({ params }: any) {
  const [pichichos, setPichichos] = useState([]);
  const [staff, setStaff] = useState([]);
  const [debt, setDebt] = useState();
  const [shelterId, setShelterId] = useState();
  const [shelterName, setShelterName] = useState();
  const [comments, setComments] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isLoaded, setIsLoaded] = useState(false);

  const { shelterData, finishedFetching } = useFetchFromShelter({
    id: params["id"],
    fields: ["comment", "dog", "staff"],
  });

  useEffect(() => {
    if (shelterData) {
      setPichichos(shelterData.dog);
      setStaff(shelterData.staff);
      setDebt(shelterData.debt);
      setShelterId(shelterData.id);
      setShelterName(shelterData.name);
      setComments(shelterData.comment);
      setIsLoaded(finishedFetching);
    }
  }, [shelterData]);

  return (
    <div
      className={style.shelterContainer}
      style={{ marginTop: debt && debt > 0 ? "2rem" : "0" }}
    >
      {debt && debt > 0 && shelterId !== undefined ? (
        <DebtBanner initialDebt={debt} shelterId={shelterId}></DebtBanner>
      ) : null}
      {/* Lista de Perros */}
      <Skeleton height={"auto"} isLoaded={isLoaded} fadeDuration={1}>
        <Flex flexDirection={"column"}>
          <PageTitle
            title={`Estos son los amiguitos que tenemos en ${shelterName}`}
          />
          <DogsList pichichos={pichichos} />
        </Flex>
      </Skeleton>

      {/* Lista de Personal */}
      <Skeleton height={"auto"} isLoaded={isLoaded} fadeDuration={1}>
        <Flex flexDirection={"column"}>
          <PageTitle title="Nuestros ayudantes" />
          <ul className={style.cardContainer}>
            {staff.map((person, index) => {
              return <PersonalCard key={index} person={person} />;
            })}
            <Button boxShadow={'xl'} height={'415px'} padding={'1rem'} rounded={'md'} onClick={onOpen}>
              <Flex flexDirection={'column'} gap={'1rem'} justifyContent={'center'} alignItems={'center'} height={'100%'} width={'100%'} rounded={'md'} bgColor={'rgba(255,255, 255, .7)'} style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,.3)' }}>
                <AddIcon boxSize={10} />
                <Text fontWeight={'bold'}>Anotate como voluntario!</Text>
              </Flex>
            </Button>
          </ul>
        </Flex>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <VolunteerForm shelter_id={shelterId} embeded={true} />
          </ModalContent>
        </Modal>
      </Skeleton>

      {/* Lista de comentarios y caja de comentarios */}
      {
        isLoaded && shelterId !== undefined ? (

          <Comments initialComments={comments} shelterId={shelterId} />
        ) : (
          <Skeleton height={"400px"} fadeDuration={1} />
        )
      }
    </div >
  );
}
