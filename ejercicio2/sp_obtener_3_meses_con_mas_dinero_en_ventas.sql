USE [automotora]
GO

/****** Object:  StoredProcedure [dbo].[sp_obtener_3_meses_con_mas_dinero_en_ventas]    Script Date: 05-04-2024 0:32:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Allware>
-- Create date: <2024-04-04>
-- Description:	<Obtener 3 meses con más dinero en ventas, considera meses con montos iguales en un mismo puesto>
-- =============================================
CREATE PROCEDURE [dbo].[sp_obtener_3_meses_con_mas_dinero_en_ventas]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	with ventas as (
	SELECT
		DENSE_RANK() OVER (ORDER BY SUM(monto) DESC) AS Ranking,
		DATEADD(MONTH, DATEDIFF(MONTH, 0, fecha), 0) AS Mes,
		SUM(monto) AS TotalVentas
	FROM
		dbo.Solicitudes
	GROUP BY
		DATEADD(MONTH, DATEDIFF(MONTH, 0, fecha), 0)
	)
	select
	  Ranking,	
	  CONCAT(
			FORMAT(Mes, 'MMMM yyyy', 'es-CL'),
			' - $',
			FORMAT(TotalVentas, '#,##0', 'es-CL')) AS TotalVentas
	from ventas
	where Ranking <= 3
	order by Ranking asc, Mes desc;

END
GO

