import React from "react";
import Head from "next/head";

// componente basico para hacer seo
export default function Seo(props) {
  const { title, description } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}

// propiedades por defecto
Seo.defaultProps = {
  title: "Gaming - Tus juegos favoritos",
  description:
    "Tus juegos favoritos para Steam, Playstation, Xbox, Switch al mejor precio.",
};
