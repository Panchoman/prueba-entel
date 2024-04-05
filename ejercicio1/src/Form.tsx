import { useState } from "react";
import dude from "./assets/dude.svg";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { add } from "./redux/carsSlice.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const Brands = {
  Subaru: ["Impreza", "Outback"],
  Mitsubishi: ["Lancer", "Outlander"],
  Daihatsu: ["Terios", "Mira"],
  Suzuki: ["Jimny", "Swift"],
  Honda: ["Civic", "CR-V"],
};

function validarFormato(texto: string) {
  // Expresión regular para el formato [letra][letra][letra][letra][numero][numero] o [letra][letra][numero][numero][numero][numero]
  var formato1 = /^[a-zA-Z]{4}\d{2}$/;
  var formato2 = /^[a-zA-Z]{2}\d{4}$/;

  // Comprobación de ambos formatos
  if (formato1.test(texto) || formato2.test(texto)) {
    return true; // El texto coincide con alguno de los formatos
  } else {
    return false; // El texto no coincide con ninguno de los formatos
  }
}
const Fn = {
  // Valida el rut con su cadena completa "XXXXXXXX-X"
  validaRut: function (rutCompleto: string) {
    const rutFixed = rutCompleto.replaceAll(".", "");
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutFixed)) return false;
    var tmp = rutFixed.split("-");
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == "K") digv = "k";
    return Fn.dv(rut) == digv;
  },
  dv: function (T: any) {
    var M = 0,
      S = 1;
    for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    return S ? S - 1 : "k";
  },
};
// #region Componentes
const FormContainer = styled(Container)`
  font-family: Barlow;
  padding-bottom: 100px;
`;
const LogoContainer = styled(Col)`
  text-align: right;
`;
const Logo = styled.img`
  position: relative;
  display: inline;
  height: 337px;
  @media (max-width: 768px) {
    height: 150px;
    margin-top: 15px;
    margin-right: 20px;
  }
`;
const Texts = styled.div`
  margin-top: 100px;
  color: #002eff;
  font-size: 56px;
  font-family: barlow;
  text-align: right;
  @media (max-width: 768px) {
    text-align: left;
    line-height: 34px;
    margin-top: 0px;
  }
`;
const TextLeft = styled.span`
  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 24px;
    padding-right 100px;
    padding-top: 30px;
    padding-left: 30px;
    display: block
  }
`;
const TextRight = styled.span`
  margin-left: 16px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 30px;
    margin-left: 0px;
    padding-left: 30px;
  }
`;
const FormBody = styled(Container)`
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
const Subtitle = styled.section`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;
const TextInput = styled.input<{ $width?: string }>`
  border: solid 2px #002eff;
  border-radius: 8px;
  font-size: 20px;
  display: inline;
  padding: 12px;
  width: 100%;
  outline: none;
`;
const SelectInput = styled(Form.Select)`
  border: solid 2px #002eff;
  outline: none;
  padding: 15px;
  border-radius: 8px;
`;
const TextInputLabel = styled.span`
  position: relative;
  top: -70px;
  left: 20px;
  font-size: 14px;
  background-color: white;
  width: auto;
  padding-left: 8px;
  padding-right: 8px;
  color: #002eff;
  font-weight: 500;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const SelectInputLabel = styled.span`
  position: relative;
  top: -70px;
  left: 20px;
  font-size: 14px;
  background-color: white;
  width: auto;
  padding-left: 8px;
  padding-right: 8px;
  color: #002eff;
  font-weight: 500;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const FormDivider = styled.hr``;
const SendContainer = styled.section`
  text-align: right;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
const SendButton = styled.button`
  font-family: Barlow;
  border-radius: 100px;
  font-size: 16px;
  background-color: #002eff;
  color: white;
  border: none;
  padding: 12px;
  width: 140px;
  margin-top: 16px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 220px;
  }
`;
const Header = styled(Row)`
  margin-bottom: -84.5px;
  @media (max-width: 768px) {
    margin-bottom: -46px;
  }
`;
const Warning = styled.span`
  color: red;
  padding-left: 10px;
`;
const Option = styled.option``;
// #endregion
function AddCar() {
  // #region Estados
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(true);
  const [validRut, setValidRut] = useState(true);
  const [validPlate, setValidPlate] = useState(true);
  const [validPrice, setValidPrice] = useState(true);
  const [rut, setRut] = useState("");
  const [price, setPrice] = useState("");
  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState(Object.keys(Brands)[0]);
  const [model, setModel] = useState(Brands[brand][0]);
  // #endregion
  const dispatch = useDispatch();
  // #region Manejos de estados
  const handleSubmit = () => {
    const isNameValid = name.trim() != "";
    setValidName(isNameValid);
    const isValidPrice = price > 0;
    setValidPrice(isValidPrice);
    const isPlateValid = validarFormato(plate);
    setValidPlate(isPlateValid);
    const rutFixed = rut.replaceAll(".", "");
    const isRutValid = Fn.validaRut(rut) ? true : false;
    setValidRut(isRutValid);
    if (isNameValid && isValidPrice && isPlateValid && isRutValid) {
      const car = {
        name,
        rut: rutFixed,
        brand,
        model,
        color: "Rojo",
        plate,
        id: Date.now(),
      };
      console.log("auto agregado");
      console.log(car);
      dispatch(add(car));
    }
  };
  const handleBrandChange = (event: any) => {
    setBrand(event.target.value);
    setModel(Brands[event.target.value][0]);
  };
  const handlePriceChange = (event: any) => {
    !isNaN(event.target.value) && setPrice(event.target.value);
  };
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };
  const handleModelChange = (event: any) => {
    setModel(event.target.value);
  };
  const handlePlateChange = (event: any) => {
    setPlate(event.target.value);
  };
  const handleRutChange = (event: any) => {
    setRut(event.target.value);
  };
  // #endregion
  return (
    <FormContainer>
      <Header>
        <Col xs={6}>
          <Texts>
            <TextLeft>Formulario</TextLeft>
            <TextRight>de Prueba</TextRight>
          </Texts>
        </Col>
        <LogoContainer xs={6}>
          <Logo src={dude} />
        </LogoContainer>
      </Header>
      <FormDivider />
      <Row>
        <Col xs={1} />
        <Col>
          <FormBody>
            <Title>Nuevo formulario</Title>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the bed industry's standard dummy
              text ever since.
            </Text>
            <Subtitle>Datos del vendedor:</Subtitle>
            <Row>
              <Col md={6}>
                <TextInput
                  onChange={(event: any) => setName(event.target.value)}
                  value={name}
                />
                <TextInputLabel>
                  Nombre completo{!validName && <Warning>*</Warning>}
                </TextInputLabel>
              </Col>
              <Col md={6}>
                <TextInput value={rut} onChange={handleRutChange} />
                <TextInputLabel>
                  Rut Vendedor{!validRut && <Warning>*</Warning>}
                </TextInputLabel>
              </Col>
            </Row>
            <FormDivider />
            <Subtitle>Datos del vehículo:</Subtitle>
            <Row>
              <Col md={4}>
                <TextInput value={plate} onChange={handlePlateChange} />
                <TextInputLabel>
                  Patente del vehículo{!validPlate && <Warning>*</Warning>}
                </TextInputLabel>
              </Col>
              <Col md={4}>
                <SelectInput onChange={handleBrandChange} value={brand}>
                  {Object.keys(Brands).map((brand) => (
                    <Option key={brand} value={brand}>
                      {brand}
                    </Option>
                  ))}
                </SelectInput>
                <SelectInputLabel>Marca del vehículo</SelectInputLabel>
              </Col>
              <Col md={4}>
                <SelectInput onChange={handleModelChange}>
                  {Brands[brand].map((model: string) => (
                    <Option key={model} value={model}>
                      {model}
                    </Option>
                  ))}
                </SelectInput>
                <SelectInputLabel>Modelo del vehículo</SelectInputLabel>
              </Col>
              <Col md={4}>
                <TextInput value={price} onChange={handlePriceChange} />
                <TextInputLabel>
                  Precio del vehículo{!validPrice && <Warning>*</Warning>}
                </TextInputLabel>
              </Col>
            </Row>
            <FormDivider />
            <SendContainer>
              <SendButton onClick={handleSubmit}>Enviar</SendButton>
            </SendContainer>
          </FormBody>
        </Col>
        <Col xs={1} />
      </Row>
    </FormContainer>
  );
}

export default AddCar;
