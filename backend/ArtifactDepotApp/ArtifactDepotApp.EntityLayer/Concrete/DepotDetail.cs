using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ArtifactDepotApp.EntityLayer.Concrete
{
    [Table("DepotDetails")]
    public class DepotDetail
    {
        [Key]
        public int DetailId { get; set; } 
        public string Shelf { get; set; }
        public string Condition { get; set; }
        public bool Status { get; set; } = true;

        public int ArtifactId { get; set; }
        public Artifact Artifact { get; set; }

        public int DepotId { get; set; }
        public Depot Depot { get; set; }

    }
}
