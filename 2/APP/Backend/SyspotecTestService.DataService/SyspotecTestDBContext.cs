using Microsoft.EntityFrameworkCore;
using SyspotecTestService.DataService.Entities;

namespace SyspotecTestService.DataService;

public partial class SyspotecTestDBContext : DbContext
{
    public SyspotecTestDBContext()
    {
    }

    public SyspotecTestDBContext(DbContextOptions<SyspotecTestDBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AsignadosUsuario> AsignadosUsuarios { get; set; }

    public virtual DbSet<EstadoTicket> EstadoTickets { get; set; }

    public virtual DbSet<Ticket> Tickets { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8_general_ci");
           // .HasCharSet("utf8");

        modelBuilder.Entity<AsignadosUsuario>(entity =>
        {
            entity.HasKey(e => new { e.IdTicket })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0 });

            entity.HasIndex(e => e.IdEstado, "Fk_AsignadosUsuarios_Estado_Id_idx");

            entity.HasIndex(e => e.IdTicket, "Fk_AsignadosUsuarios_Ticket_Id_idx");

            entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");
            entity.Property(e => e.IdTicket).HasColumnName("idTicket");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.IdEstado).HasColumnName("idEstado");

            entity.HasOne(d => d.Estado).WithMany(p => p.AsignadosUsuarios)
                .HasForeignKey(d => d.IdEstado)
                .HasConstraintName("Fk_AsignadosUsuarios_Estado_Id");

            entity.HasOne(d => d.Ticket).WithOne(p => p.AsignadosUsuarios)
                .HasForeignKey<AsignadosUsuario>(d => d.IdTicket)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Fk_AsignadosUsuarios_Ticket_Id");

            entity.HasOne(d => d.Usuario).WithMany(p => p.AsignadosUsuarios)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("Fk_AsignadosUsuarios_Usuario_Id");
        });

        modelBuilder.Entity<EstadoTicket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(45)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(200)
                .HasColumnName("descripcion");
            entity.Property(e => e.Numero).HasColumnName("numero");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(100)
                .HasColumnName("prioridad");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Cedula)
                .HasMaxLength(25)
                .HasColumnName("cedula");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
