USE [automotora]
GO

/****** Object:  StoredProcedure [dbo].[sp_obtener_marcas_mas_solicitadas]    Script Date: 05-04-2024 9:44:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Allware>
-- Create date: <2024-04-04>
-- Description:	<Obtener las 3 marcas más solicitadas y la cantidad de solicitudes de cada una, ordenadas descendentemente, en caso de empate, se desplegaran mas de 3 registros>
-- =============================================
CREATE PROCEDURE [dbo].[sp_obtener_marcas_mas_solicitadas]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    with solicitudesMarcas as(
	SELECT
		DENSE_RANK() OVER (ORDER BY COUNT(solicitud_id) DESC) AS ranking,
		RANK() OVER (ORDER BY COUNT(solicitud_id) DESC) AS ranking2,
		marcaAuto_id,
		COUNT(solicitud_id) AS cantidad_solicitudes
	FROM
		dbo.solicitudes
	GROUP BY marcaAuto_id
	)
	select 
		s.ranking,
		m.marca,
		s.cantidad_solicitudes
	from solicitudesMarcas as s
	INNER JOIN dbo.MarcaAuto AS m ON m.marcaAuto_id = s.marcaAuto_id
	where ranking <= 3;

END
GO

