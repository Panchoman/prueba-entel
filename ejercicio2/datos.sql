INSERT INTO dbo.MarcaAuto(marca)
values
('TOYOTA'),
('SUZUKI'),
('CHEVROLET'),
('JEEP'),
('CITROEN');

GO

INSERT INTO dbo.ModeloAuto(modelo,marcaAuto_id)
VALUES ('Yaris',1),
('Supra',1),
('Jimny',2),
('Vitara',2),
('LUV',3),
('Camaro',3),
('Renegade',4),
('Cherokee',4),
('Compass',4),
('C3',5),
('C4',5)

GO

INSERT INTO dbo.Vendedor(nombres,apellido_paterno,apellido_materno,tipo_documento,documento)
VALUES
('Oscar','Carreño','Tolmo','RUT','15540970-3'),
('Catalina','Castro','Zamorano','RUT','15543970-K'),
('Federico','Carreño',null,'RUT','1-9'),
('Juan','Perez','Perez','PASAPORTE','F1234567'),
('Victor','Victorino','Vitorio','RUT','2-7');

GO
INSERT INTO dbo.solicitudes (fecha, monto, marcaAuto_id, modeloAuto_id, vendedor_id)
VALUES 
(GETDATE(), 20000000, 1, 1, 1),
(GETDATE(), 20000000, 1, 1, 1),
(GETDATE(), 2000000, 1, 1, 2),
(GETDATE(), 7000000, 3, 6, 1),
(GETDATE(), 16000000, 2, 3, 2),
(GETDATE(), 30000000, 4, 7, 2),
(GETDATE(), 30000000, 4, 8, 2),
('2024-02-02 17:03:41.270', 20000000, 1, 1, 1),
('2024-03-05 17:03:41.270', 20000000, 1, 1, 1),
('2024-03-04 17:03:41.270', 20000000, 1, 1, 1),
('2024-03-10 17:03:41.270', 7000000, 3, 6, 1),
('2024-03-18 17:03:41.270', 16000000, 2, 3, 1),
('2024-03-29 17:03:41.270', 30000000, 4, 7, 3),
('2023-12-02 17:03:41.270', 20000000, 1, 1, 1),
('2023-12-05 17:03:41.270', 20000000, 1, 1, 1),
('2023-10-04 17:03:41.270', 20000000, 1, 1, 1),
('2023-10-10 17:03:41.270', 7000000, 3, 6, 1),
('2023-10-18 17:03:41.270', 16000000, 2, 3, 1),
('2023-09-29 17:03:41.270', 30000000, 4, 7, 3),
('2023-12-01 17:03:41.270', 20000000, 1, 1, 1),
('2023-10-18 17:03:41.270', 16000000, 2, 3, 1),
('2023-10-10 17:03:41.270', 17990000, 5, 11, 5),
('2023-10-10 17:03:41.270', 16010000, 3, 5, 5);

COMMIT;