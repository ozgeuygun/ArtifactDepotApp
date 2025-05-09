using ArtifactDepotApp.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtifactDepotApp.DataAccessLayer.Context
{
    public class ArtifactContext:DbContext
    {
        public ArtifactContext(DbContextOptions<ArtifactContext> options) : base(options) { }
        public DbSet<Artifact> Artifacts { get; set; }
        public DbSet<ArtifactMaterial> ArtifactMaterials { get; set; }
        public DbSet<ArtifactCategory> ArtifactCategories { get; set; }
        public DbSet<ExcavationSite> ExcavationSites { get; set; }
        public DbSet<Depot> Depots { get; set; }
        public DbSet<DepotDetail> DepotDetails { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Artifact>()
                .Property(a => a.Width)
                .HasColumnType("decimal(18,2)");


            modelBuilder.Entity<Artifact>()
                .Property(a => a.Height)
                .HasColumnType("decimal(18,2)");


            modelBuilder.Entity<Artifact>()
                .Property(a => a.ArtifactLongitude)
                .HasColumnType("decimal(12,6)");


            modelBuilder.Entity<Artifact>()
                .Property(a => a.ArtifactLatitude)
                .HasColumnType("decimal(12,6)");

           
            modelBuilder.Entity<Depot>()
                .Property(e => e.DepotLongitude)
                .HasColumnType("decimal(12,6)");

           
            modelBuilder.Entity<Depot>()
                .Property(e => e.DepotLatitude)
                .HasColumnType("decimal(12,6)");

            modelBuilder.Entity<ExcavationSite>()
                .Property(e => e.SiteLongitude)
                .HasColumnType("decimal(12,6)");

         
            modelBuilder.Entity<ExcavationSite>()
                .Property(e => e.SiteLatitude)
                .HasColumnType("decimal(12,6)");

            base.OnModelCreating(modelBuilder);
        }


    }
}
