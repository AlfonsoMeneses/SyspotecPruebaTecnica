USE [Syspotec_Test]
GO
/****** Object:  Table [dbo].[AsignadosUsuarios]    Script Date: 14/06/2023 3:32:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AsignadosUsuarios](
	[idTicket] [int] NOT NULL,
	[idUsuario] [int] NOT NULL,
	[fecha] [datetime] NOT NULL,
	[idEstado] [int] NULL,
 CONSTRAINT [PK_AsignadosUsuarios] PRIMARY KEY CLUSTERED 
(
	[idTicket] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EstadoTickets]    Script Date: 14/06/2023 3:32:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstadoTickets](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](45) NOT NULL,
 CONSTRAINT [PK_EstadoTicket] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tickets]    Script Date: 14/06/2023 3:32:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tickets](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](200) NULL,
	[numero] [int] NOT NULL,
	[prioridad] [nvarchar](100) NULL,
 CONSTRAINT [PK_Ticket] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 14/06/2023 3:32:14 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NOT NULL,
	[cedula] [nvarchar](25) NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AsignadosUsuarios]  WITH CHECK ADD  CONSTRAINT [Fk_AsignadosUsuarios_Estado_Id] FOREIGN KEY([idEstado])
REFERENCES [dbo].[EstadoTickets] ([id])
GO
ALTER TABLE [dbo].[AsignadosUsuarios] CHECK CONSTRAINT [Fk_AsignadosUsuarios_Estado_Id]
GO
ALTER TABLE [dbo].[AsignadosUsuarios]  WITH CHECK ADD  CONSTRAINT [Fk_AsignadosUsuarios_Ticket_Id] FOREIGN KEY([idTicket])
REFERENCES [dbo].[Tickets] ([id])
GO
ALTER TABLE [dbo].[AsignadosUsuarios] CHECK CONSTRAINT [Fk_AsignadosUsuarios_Ticket_Id]
GO
ALTER TABLE [dbo].[AsignadosUsuarios]  WITH CHECK ADD  CONSTRAINT [Fk_AsignadosUsuarios_Usuario_Id] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuarios] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AsignadosUsuarios] CHECK CONSTRAINT [Fk_AsignadosUsuarios_Usuario_Id]
GO
