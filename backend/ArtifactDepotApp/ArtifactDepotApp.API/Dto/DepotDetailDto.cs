using ArtifactDepotApp.EntityLayer.Concrete;

namespace ArtifactDepotApp.API.Dto
{
    public class DepotDetailDto
    {
        public string Shelf { get; set; }
        public string Condition { get; set; }
        public bool Status { get; set; } = true;
        public int ArtifactId { get; set; }      
        public int DepotId { get; set; }

    }
}
