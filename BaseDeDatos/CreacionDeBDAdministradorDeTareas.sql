CREATE DATABASE [AdministradorTareas]
GO
USE [AdministradorTareas]
GO
/****** Object:  Table [dbo].[Colaborador]    Script Date: 11/7/2024 13:09:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Colaborador](
	[ColaboradorID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NULL,
 CONSTRAINT [PK_Colaborador] PRIMARY KEY CLUSTERED 
(
	[ColaboradorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Estados]    Script Date: 11/7/2024 13:09:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Estados](
	[EstadoID] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Estados] PRIMARY KEY CLUSTERED 
(
	[EstadoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Notas_x_Tarea]    Script Date: 11/7/2024 13:09:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notas_x_Tarea](
	[NotaID] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](300) NOT NULL,
	[TareaID] [int] NOT NULL,
 CONSTRAINT [PK_Notas_x_Tarea] PRIMARY KEY CLUSTERED 
(
	[NotaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Prioridad]    Script Date: 11/7/2024 13:09:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Prioridad](
	[PrioridadID] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Prioridad] PRIMARY KEY CLUSTERED 
(
	[PrioridadID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tarea]    Script Date: 11/7/2024 13:09:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tarea](
	[TareaID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Descripcion] [varchar](500) NOT NULL,
	[FechaInicial] [date] NULL,
	[FechaFinal] [date] NULL,
	[ColaboradorID] [int] NULL,
	[EstadoID] [int] NULL,
	[PrioridadID] [int] NULL,
 CONSTRAINT [PK_Tarea] PRIMARY KEY CLUSTERED 
(
	[TareaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Notas_x_Tarea]  WITH CHECK ADD  CONSTRAINT [FK_Notas_x_Tarea_Tarea] FOREIGN KEY([TareaID])
REFERENCES [dbo].[Tarea] ([TareaID])
GO
ALTER TABLE [dbo].[Notas_x_Tarea] CHECK CONSTRAINT [FK_Notas_x_Tarea_Tarea]
GO
ALTER TABLE [dbo].[Tarea]  WITH CHECK ADD  CONSTRAINT [FK_Tarea_Colaborador] FOREIGN KEY([ColaboradorID])
REFERENCES [dbo].[Colaborador] ([ColaboradorID])
GO
ALTER TABLE [dbo].[Tarea] CHECK CONSTRAINT [FK_Tarea_Colaborador]
GO
ALTER TABLE [dbo].[Tarea]  WITH CHECK ADD  CONSTRAINT [FK_Tarea_Estados] FOREIGN KEY([EstadoID])
REFERENCES [dbo].[Estados] ([EstadoID])
GO
ALTER TABLE [dbo].[Tarea] CHECK CONSTRAINT [FK_Tarea_Estados]
GO
ALTER TABLE [dbo].[Tarea]  WITH CHECK ADD  CONSTRAINT [FK_Tarea_Prioridad] FOREIGN KEY([PrioridadID])
REFERENCES [dbo].[Prioridad] ([PrioridadID])
GO
ALTER TABLE [dbo].[Tarea] CHECK CONSTRAINT [FK_Tarea_Prioridad]
GO
/****** Object:  StoredProcedure [dbo].[SP_ActualizarTarea]    Script Date: 11/7/2024 13:09:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROC [dbo].[SP_ActualizarTarea]
@id int,
@nombre varchar(50),
@descripcion varchar(500),
@fechaIni date,
@fechaFin date,
@colaborador int,
@estado int,
@prioridad int,
@IsOk BIT OUTPUT

AS BEGIN

BEGIN TRY

UPDATE [dbo].[Tarea]
   SET [Nombre] = @nombre
      ,[Descripcion] = @descripcion
      ,[FechaInicial] = @fechaIni
      ,[FechaFinal] = @fechaFin
      ,[ColaboradorID] = @colaborador
      ,[EstadoID] = @estado
      ,[PrioridadID] = @prioridad
 WHERE [TareaID] = @id;

 SET @IsOk = 1

 END TRY

 BEGIN CATCH
		SET @IsOk = 0
END CATCH

 END
GO
/****** Object:  StoredProcedure [dbo].[SP_Colaboradores]    Script Date: 11/7/2024 13:09:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROC [dbo].[SP_Colaboradores]
AS BEGIN
SELECT [ColaboradorID]
      ,[Nombre]
  FROM [dbo].[Colaborador]
  END
GO
/****** Object:  StoredProcedure [dbo].[SP_CrearNuevaTarea]    Script Date: 11/7/2024 13:09:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROC [dbo].[SP_CrearNuevaTarea](
@nombre varchar(50),
@descripcion varchar(500),
@fechaIni date,
@fechaFin date,
@colaborador int,
@estado int,
@prioridad int,
@IsOk BIT OUTPUT
)
AS BEGIN

BEGIN TRY


INSERT INTO [dbo].[Tarea]
           ([Nombre]
           ,[Descripcion]
           ,[FechaInicial]
           ,[FechaFinal]
           ,[ColaboradorID]
           ,[EstadoID]
           ,[PrioridadID])
     VALUES
           (@nombre
           ,@descripcion
           ,@fechaIni
           ,@fechaFin
           ,@colaborador
           ,@estado
           ,@prioridad)

	SET @IsOk = 1
	
	END TRY
	BEGIN CATCH
		SET @IsOk = 0
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_EliminarTarea]    Script Date: 11/7/2024 13:09:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROC [dbo].[SP_EliminarTarea](
@Id int,
@IsOk BIT OUTPUT
)
AS BEGIN

BEGIN TRY

DELETE
FROM [dbo].[Tarea]
WHERE [TareaID] = @Id

SET @IsOk = 1

END TRY

BEGIN CATCH
SET @IsOk = 0
END CATCH

END
GO
/****** Object:  StoredProcedure [dbo].[SP_Estados]    Script Date: 11/7/2024 13:09:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROC [dbo].[SP_Estados]
AS BEGIN
SELECT [EstadoID]
      ,[Descripcion]
  FROM [dbo].[Estados]
 END
GO
/****** Object:  StoredProcedure [dbo].[SP_Prioridad]    Script Date: 11/7/2024 13:09:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROC [dbo].[SP_Prioridad]
AS BEGIN
SELECT [PrioridadID]
      ,[Descripcion]
  FROM [dbo].[Prioridad]
  END
GO
/****** Object:  StoredProcedure [dbo].[SP_SeleccionarTareas]    Script Date: 11/7/2024 13:09:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROC [dbo].[SP_SeleccionarTareas]
AS BEGIN 
SELECT [TareaID],
		T.[Nombre],
		T.[Descripcion],
		T.[FechaInicial],
		T.[FechaFinal],
		C.Nombre AS Colaborador,
		E.Descripcion AS Estado,
		P.Descripcion AS Prioridad

FROM [dbo].[Tarea] AS T

INNER JOIN [dbo].[Colaborador] AS C 
ON C.[ColaboradorID] = T.[ColaboradorID]

INNER JOIN [dbo].[Prioridad] AS P 
ON T.[PrioridadID] = P.[PrioridadID]

INNER JOIN [dbo].[Estados] AS E
ON T.[EstadoID] = E.[EstadoID]

ORDER BY T.[FechaInicial] ASC
END
GO
