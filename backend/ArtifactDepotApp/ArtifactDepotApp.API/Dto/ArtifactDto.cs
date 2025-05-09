using ArtifactDepotApp.EntityLayer.Concrete;

namespace ArtifactDepotApp.API.Dto
{
    public class ArtifactDto
    {
        public string ArtifactName { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public decimal ArtifactLatitude { get; set; }  
        public decimal ArtifactLongitude { get; set; } 
        public bool IsDeleted { get; set; } = false;  
        public int ArtifactMaterialId { get; set; }      
        public int ArtifactCategoryId { get; set; }    
        public int ExcavationSiteId { get; set; }
    
    }
}
