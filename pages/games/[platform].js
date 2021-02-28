import React from "react";
import { useRouter } from "next/router";
import BasicLayout from "../../layouts/BasicLayout";

export default function Platform() {
  const { query } = useRouter(); //de router resupero query

  return (
    <BasicLayout className="platform">
      <h1>Estamos en la plataformas {query.platform}</h1>
    </BasicLayout>
  );
}
