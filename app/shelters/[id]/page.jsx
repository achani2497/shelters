"use client";

import { DogsList } from "./components/DogsList/DogList";
import { PersonalCard } from "./components/PersonalCard";
import style from "./styles.module.css";
import { PageTitle } from "@/app/components/PageTitle/PageTitle";
import { DebtBanner } from "./components/DebtBanner/DebtBanner";
import { Skeleton, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFetchFromShelter } from "@/app/hooks/shelter";
import { Comments } from "./components/Comments/Comments";

export default function Page({ params }) {
  const [pichichos, setPichichos] = useState([]);
  const [staff, setStaff] = useState([]);
  const [debt, setDebt] = useState();
  const [shelterId, setShelterId] = useState();
  const [shelterName, setShelterName] = useState();
  const [comments, setComments] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const [shelterData, finishedFetching] = useFetchFromShelter({
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
      style={{ marginTop: debt > 0 ? "2rem" : "0" }}
    >
      {debt > 0 ? (
        <DebtBanner initialDebt={debt} shelterId={shelterId}></DebtBanner>
      ) : (
        ""
      )}
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
          </ul>
        </Flex>
      </Skeleton>

      {/* Lista de comentarios y caja de comentarios */}
      <Skeleton height={"auto"} isLoaded={isLoaded} fadeDuration={1}>
        <Comments initialComments={comments} shelterId={shelterId} />
      </Skeleton>
    </div>
  );
}
