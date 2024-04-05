USE [automotora]
GO

/****** Object:  StoredProcedure [dbo].[sp_obtener_vendedor_menos_solicitudes_ultimos_30_dias]    Script Date: 05-04-2024 9:50:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Allware>
-- Create date: <2024-04-04>
-- Description:	<Obtener el vendedor con menos solicitudes generadas en los últimos 30 días, considera los que no tienen ventas y en caso de empate, muestra todos los registros encontrados>
-- =============================================
CREATE PROCEDURE [dbo].[sp_obtener_vendedor_menos_solicitudes_ultimos_30_dias]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    WITH solicitudesVendedor AS (
	SELECT
		v.vendedor_id,
		v.nombres,
		v.apellido_paterno,
		v.apellido_materno,
		DENSE_RANK() OVER (ORDER BY COUNT(s.solicitud_id) ASC) AS ranking,
		COUNT(s.solicitud_id) AS cantidad_solicitudes
	FROM
		dbo.Vendedor AS v
		LEFT JOIN dbo.solicitudes AS s ON s.vendedor_id = v.vendedor_id AND s.fecha >= DATEADD(DAY, -30, GETDATE()) -- Obtener las solicitudes de los últimos 30 días
	GROUP BY
	v.vendedor_id,v.nombres,v.apellido_paterno,v.apellido_materno)
	SELECT
		ranking,
		vendedor_id,
		nombres,
		apellido_paterno,
		apellido_materno,
		cantidad_solicitudes
	FROM solicitudesVendedor
	where ranking = 1;

END
GO

