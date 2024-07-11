USE [AdministradorTareas]
GO

INSERT INTO [dbo].[Estados] ([Descripcion]) VALUES ('Pendiente');
INSERT INTO [dbo].[Estados] ([Descripcion]) VALUES ('En Proceso');
INSERT INTO [dbo].[Estados] ([Descripcion]) VALUES ('Finalizada');

GO


INSERT INTO [dbo].[Colaborador] ([Nombre]) VALUES ('No asignado');
INSERT INTO [dbo].[Colaborador] ([Nombre]) VALUES ('Monica');
INSERT INTO [dbo].[Colaborador] ([Nombre]) VALUES ('Andy');
INSERT INTO [dbo].[Colaborador] ([Nombre]) VALUES ('Bryan');
INSERT INTO [dbo].[Colaborador] ([Nombre]) VALUES ('Roberto');
INSERT INTO [dbo].[Colaborador] ([Nombre]) VALUES ('Junior');
INSERT INTO [dbo].[Colaborador] ([Nombre]) VALUES ('Alejandra');
INSERT INTO [dbo].[Colaborador] ([Nombre]) VALUES ('Yuliana');
INSERT INTO [dbo].[Colaborador] ([Nombre]) VALUES ('Valery');
INSERT INTO [dbo].[Colaborador] ([Nombre]) VALUES ('Tatiana');
INSERT INTO [dbo].[Colaborador] ([Nombre]) VALUES ('Fernanda');

GO

INSERT INTO [dbo].[Prioridad] ([Descripcion]) VALUES ('Baja');
INSERT INTO [dbo].[Prioridad] ([Descripcion]) VALUES ('Media');
INSERT INTO [dbo].[Prioridad] ([Descripcion]) VALUES ('Alta');

GO

INSERT INTO [dbo].[Tarea]
           ([Nombre]
           ,[Descripcion]
           ,[FechaInicial]
           ,[FechaFinal]
           ,[ColaboradorID]
           ,[EstadoID]
           ,[PrioridadID])
     VALUES
('Crear base de datos de notas'
,'Descripcion de prueba'
,'2024-01-01'
,'2024-01-01'
,4
,3
,2);

INSERT INTO [dbo].[Tarea]
           ([Nombre]
           ,[Descripcion]
           ,[FechaInicial]
           ,[FechaFinal]
           ,[ColaboradorID]
           ,[EstadoID]
           ,[PrioridadID])
     VALUES
('Comprar procesador'
,'ir a la tienda de san jose por un procesador'
,'2024-07-01'
,'2024-08-01'
,5
,1
,1);




