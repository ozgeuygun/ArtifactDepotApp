using System.ComponentModel.DataAnnotations.Schema;


namespace ArtifactDepotApp.EntityLayer.Concrete
{
    [Table("ExcavationSites")]
    public class ExcavationSite
    {    
        public int ExcavationSiteId { get; set; }
        public string SiteName { get; set; }
        public decimal SiteLatitude { get; set; }
        public decimal SiteLongitude { get; set; }
    }
}
