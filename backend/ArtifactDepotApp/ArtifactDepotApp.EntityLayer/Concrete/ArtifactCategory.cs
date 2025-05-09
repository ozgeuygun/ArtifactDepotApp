using System.ComponentModel.DataAnnotations.Schema;


namespace ArtifactDepotApp.EntityLayer.Concrete
{
    [Table("ArtifactCategories")]
    public class ArtifactCategory
    {
        public int ArtifactCategoryId { get; set; }     
        public string CategoryName { get; set; }
    }
}
