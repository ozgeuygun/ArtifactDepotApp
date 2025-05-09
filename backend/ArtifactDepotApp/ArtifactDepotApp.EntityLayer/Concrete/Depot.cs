using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ArtifactDepotApp.EntityLayer.Concrete
{
    [Table("Depots")]
    public class Depot
    {        
        [Key]  
        public int DepotId { get; set; }
        public string DepotName { get; set; }
        public decimal DepotLatitude { get; set; }
        public decimal DepotLongitude { get; set; }
        public bool IsActive { get; set; } = true;

    }
}
