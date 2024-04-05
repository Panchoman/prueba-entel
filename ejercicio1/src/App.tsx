import { useState } from "react";
import styled from "styled-components";
import AddCar from "./Form";
import List from "./List";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

const MENU = {
  FORMULARIO: "FORMULARIO",
  LISTA_FORMULARIO: "LISTA_FORMULARIO",
};

const Nav = styled.section`
  background-color: white;
  top: 0;
  text-align: right;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 50px;
  padding-right: 50px;
  @media (max-width: 768px) {
    padding: 20px;
    padding-right: 10px;
  }
  -webkit-box-shadow: 0px 5px 5px 0px rgba(204, 204, 204, 1);
  -moz-box-shadow: 0px 5px 5px 0px rgba(204, 204, 204, 1);
  box-shadow: 0px 5px 5px 0px rgba(204, 204, 204, 1);
`;
const Button = styled.button<{ $active?: boolean }>`
  text-size: 18px;
  color: #002eff;
  background-color: ${(props: any) => (props.$active ? "#f3f5ff" : "white")};
  font-weight: 500;
  margin-left: 8px;
  margin-right: 8px;
  border-radius: 24px;
  padding: 8px 16px 8px 16px;
  border: none;
  font-family: barlow;
  cursor: pointer;
  @media (max-width: 768px) {
    background-color:white;
    color: black;
    border-radius: 0;
    font-weight: ${(props: any) => (props.$active ? "bold" : "500")};
    border-bottom: ${(props: any) => (props.$active ? "2px solid black" : "none")};
  }
`;
const ContainerApp = styled(Container)`
  padding: 0px;
`;
const ColApp = styled(Col)`
  padding: 0;
  max-width: 100%;
`;
function App() {
  const [menu, setMenu] = useState(MENU.FORMULARIO);
  return (
    <ContainerApp fluid>
      <Nav>
        <Button
          $active={menu == MENU.FORMULARIO}
          onClick={() => setMenu(MENU.FORMULARIO)}
        >
          Formulario
        </Button>
        <Button
          $active={menu == MENU.LISTA_FORMULARIO}
          onClick={() => setMenu(MENU.LISTA_FORMULARIO)}
        >
          Lista Formulario
        </Button>
      </Nav>
      <Row>
        <ColApp>
          {menu == MENU.FORMULARIO && <AddCar />}
          {menu == MENU.LISTA_FORMULARIO && <List />}
        </ColApp>
      </Row>
    </ContainerApp>
  );
}

export default App;
