import styled from "styled-components";
import trash from "./assets/trash.svg";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "./redux/carsSlice.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Container = styled.section`
  font-family: Barlow;
  padding-bottom: 100px;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 24px;
`;
const Title = styled.section`
  font-size: 30px;
  font-weight: bold;
`;
const Text = styled.section`
  margin-top: 8px;
  margin-bottom: 54px;
  font-size: 18px;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TableCell = styled.td`
  text-align: center;
  padding-top: 18px;
  padding-bottom: 18px;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
`;
const TableHeader = styled.thead``;
const TableHeaderCell = styled.th`
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const TableRow = styled.tr``;
const TableIconTrash = styled.img`
  cursor: pointer;
`;
const TableBody = styled.tbody``;
const TableFooter = styled.section`
  text-align: center;
  margin-top: 32px;
`;
function List() {
  const cars = useSelector((state: any) => state.cars.list);
  const dispatch = useDispatch();
  return (
    <Container>
      <Row>
        <Col xs={1} />
        <Col>
          <Title>Lista del formulario</Title>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the bed industry's standard dummy
            text ever since.
          </Text>
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Rut vendedor</TableHeaderCell>
                <TableHeaderCell>Patente vehículo</TableHeaderCell>
                <TableHeaderCell>Marca vehículo</TableHeaderCell>
                <TableHeaderCell>Modelo vehículo</TableHeaderCell>
                <TableHeaderCell>Color vehículo</TableHeaderCell>
                <TableHeaderCell>Eliminar</TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {cars.slice(0, 10).map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.name}</TableCell>
                  <TableCell>{car.rut}</TableCell>
                  <TableCell>{car.plate}</TableCell>
                  <TableCell>{car.brand}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.color}</TableCell>
                  <TableCell>
                    <TableIconTrash
                      onClick={() => dispatch(remove(car.id))}
                      src={trash}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {cars.length > 0 && (
            <TableFooter>
              Mostrando registros del 1 al {cars.length < 10 ? cars.length : 10}{" "}
              de un total de {cars.length} registros.
            </TableFooter>
          )}
          {cars.length == 0 && (
            <TableFooter>No hay registros que mostrar.</TableFooter>
          )}
        </Col>
        <Col xs={1} />
      </Row>
    </Container>
  );
}

export default List;
