USE [automotora]
GO

/****** Object:  StoredProcedure [dbo].[sp_obtener_modelos_sin_solicitudes]    Script Date: 05-04-2024 0:33:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Allware>
-- Create date: <2024-04-04>
-- Description:	<Obtener modelos que no tengan solicitudes>
-- =============================================
CREATE PROCEDURE [dbo].[sp_obtener_modelos_sin_solicitudes]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT
		ma.marca,
		mo.modelo
	FROM
		dbo.ModeloAuto AS mo
	INNER JOIN dbo.MarcaAuto AS ma ON ma.marcaAuto_id = mo.marcaAuto_id
	LEFT JOIN dbo.solicitudes AS s ON s.modeloAuto_id = mo.modeloAuto_id
	WHERE s.modeloAuto_id IS NULL;

END
GO

