USE [automotora]
GO

/****** Object:  StoredProcedure [dbo].[sp_obtener_solicitudes_mes_actual]    Script Date: 05-04-2024 0:33:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Allware>
-- Create date: <2024-04-04>
-- Description:	<Obtener solicitudes del mes actual>
-- =============================================
CREATE PROCEDURE [dbo].[sp_obtener_solicitudes_mes_actual]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    DECLARE @InicioMesActual DATE = DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0);
	DECLARE @InicioMesSiguiente DATE = DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()) + 1, 0);

	SELECT
		s.solicitud_id,
		s.fecha,
		s.monto,
		ma.marca,
		mo.modelo,
		v.nombres,
		v.apellido_paterno,
		v.apellido_materno
	FROM dbo.solicitudes AS s
	INNER JOIN dbo.MarcaAuto AS ma ON ma.marcaAuto_id = s.marcaAuto_id
	INNER JOIN dbo.ModeloAuto AS mo ON mo.modeloAuto_id = s.modeloAuto_id
	INNER JOIN dbo.Vendedor AS v ON v.vendedor_id = s.vendedor_id
	WHERE fecha >= @InicioMesActual AND fecha < @InicioMesSiguiente;

END
GO

