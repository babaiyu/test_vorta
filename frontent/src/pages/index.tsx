import type { NextPage } from "next";
import Header from "../components/Header";
import Hero from "../components/Hero";
import List from "../components/List";
import patientsHook from "../hooks/patientsHook";

const Home: NextPage = () => {
  const { patients, changeStatus } = patientsHook();

  const onChangeStatus = async (id: number, status: boolean) => {
    await changeStatus(id, status);
  };

  return (
    <>
      <Header />
      <Hero />
      <List
        data={patients}
        onChangeStatus={(id: number, status: boolean) =>
          onChangeStatus(id, status)
        }
      />
    </>
  );
};

export default Home;
