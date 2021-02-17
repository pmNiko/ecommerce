import { useState } from "react";
import {
  Container,
  Menu,
  Grid,
  Icon,
  Label,
  GridColumn,
} from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";

export default function MenuWeb() {
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => setShowModal(true);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatforms />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            <MenuOption onShowModal={onShowModal} />
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title="Inicia sesion"
        size="small"
      >
        <h2>Contenido del modal</h2>
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

function MenuOption({ onShowModal }) {
  return (
    <Menu>
      <Menu.Item onClick={onShowModal}>
        <Icon name="user outline" />
        Mi cuenta
      </Menu.Item>
    </Menu>
  );
}
