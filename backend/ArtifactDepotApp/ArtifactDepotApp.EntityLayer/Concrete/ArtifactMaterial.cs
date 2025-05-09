using System.ComponentModel.DataAnnotations.Schema;


namespace ArtifactDepotApp.EntityLayer.Concrete
{
    [Table("ArtifactMaterials")]
    public class ArtifactMaterial
    {       
        public int ArtifactMaterialId { get; set; }
        public string ArtifactMaterialName { get; set; }

    }
}
