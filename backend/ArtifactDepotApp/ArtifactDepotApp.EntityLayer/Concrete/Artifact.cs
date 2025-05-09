using System.ComponentModel.DataAnnotations.Schema;


namespace ArtifactDepotApp.EntityLayer.Concrete
{
    [Table("Artifacts")]
    public class Artifact
    {  
        public int ArtifactId { get; set; }
        public string ArtifactName { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public decimal ArtifactLatitude { get; set; }  
        public decimal ArtifactLongitude { get; set; } 
        public bool IsDeleted { get; set; } = false;  

        public int ArtifactMaterialId { get; set; }
        public ArtifactMaterial? ArtifactMaterial { get; set; }

        public int ArtifactCategoryId { get; set; }
        public ArtifactCategory? ArtifactCategory { get; set; }

        public int ExcavationSiteId { get; set; }
        public ExcavationSite? ExcavationSite { get; set; }

    }
}
