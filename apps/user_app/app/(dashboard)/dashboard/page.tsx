import React from "react";
import ClientOnly from "../../components/ClientOnly";
import DashboardClient from "./DashboardClient";
import Container from "../../components/Container";

const DashboardPage = async () => {
  return (
    <ClientOnly>
      <Container>
        <DashboardClient />
      </Container>
    </ClientOnly>
  );
};

export default DashboardPage;
