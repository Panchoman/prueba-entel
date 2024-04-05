CREATE TABLE dbo.MarcaAuto (
    [marcaAuto_id] [int] PRIMARY KEY IDENTITY(1,1), -- Id incremental
    [marca]  [nvarchar](100) NOT NULL, -- Nombre de la marca
	[create_at] DATETIME DEFAULT GETDATE(),
	[updated_at] [timestamp] NULL,
	[habilitado] [BIT] DEFAULT 1
) ON [PRIMARY]

GO

CREATE TABLE dbo.ModeloAuto (
    [modeloAuto_id] [int] PRIMARY KEY IDENTITY(1,1), -- Id incremental
    [modelo] [nvarchar](100) NULL,
    [marcaAuto_id] [int] NOT NULL,
    [created_at] DATETIME DEFAULT GETDATE(),
    [updated_at] [timestamp] NULL,
    [habilitado] [BIT] DEFAULT 1,
    FOREIGN KEY (marcaAuto_id) REFERENCES dbo.MarcaAuto(marcaAuto_id) -- Clave foránea que referencia a MarcaAuto
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[Vendedor](
	[vendedor_id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[nombres] [nvarchar](100) NULL,
	[apellido_paterno] [nvarchar](50) NULL,
	[apellido_materno] [nvarchar](50) NULL,
	[tipo_documento] [nchar](10) NULL,
	[documento] [nchar](10) NULL,
	[create_at] DATETIME DEFAULT GETDATE(),
	[updated_at] [timestamp] NULL,
	[habilitado] [BIT] DEFAULT 1,
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[Solicitudes](
	[solicitud_id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[fecha] DATETIME DEFAULT GETDATE(),
	[monto] [money] NULL,
	[marcaAuto_id] [int] NOT NULL,
	[modeloAuto_id] [int] NOT NULL,
	[vendedor_id] [int] NOT NULL,
	FOREIGN KEY (marcaAuto_id) REFERENCES dbo.MarcaAuto(marcaAuto_id), -- Clave foránea que referencia a MarcaAuto
	FOREIGN KEY (modeloAuto_id) REFERENCES dbo.ModeloAuto(modeloAuto_id), -- Clave foránea que referencia a ModeloAuto
	FOREIGN KEY (vendedor_id) REFERENCES dbo.Vendedor(vendedor_id) -- Clave foránea que referencia a Vendedor
) ON [PRIMARY]
GO
