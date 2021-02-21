import React, { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";

export default function MenuWeb() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar sesion");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  useEffect(() => {
    // fn asincrona autoinvocada ya que useEffect no lo permite
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]); //se ejecutara cuando auth sea modificado

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatforms />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            {user !== undefined && (
              <MenuOption
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}

function MenuPlatforms() {
  return (
    <Menu>
      <Link href="play-station">
        <Menu.Item as="a">Playstation</Menu.Item>
      </Link>
      <Link href="xbox">
        <Menu.Item as="a">Xbox</Menu.Item>
      </Link>
      <Link href="nintendo-switch">
        <Menu.Item as="a">Nintendo Switch</Menu.Item>
      </Link>
    </Menu>
  );
}

function MenuOption({ onShowModal, user, logout }) {
  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="game" />
              Mis pedidos
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            <Menu.Item as="a">
              <Icon name="heart outline" />
              Favoritos
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
            </Menu.Item>
          </Link>
          <Menu.Item className="m-0" onClick={logout}>
            <Icon name="power off" />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </Menu.Item>
      )}
    </Menu>
  );
}
