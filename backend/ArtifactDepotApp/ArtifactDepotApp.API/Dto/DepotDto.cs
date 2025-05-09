namespace ArtifactDepotApp.API.Dto
{
    public class DepotDto
    {
        public string DepotName { get; set; }
        public decimal DepotLatitude { get; set; }
        public decimal DepotLongitude { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
