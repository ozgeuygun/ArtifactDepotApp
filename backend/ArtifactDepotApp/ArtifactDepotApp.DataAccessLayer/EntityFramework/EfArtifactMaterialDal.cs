using ArtifactDepotApp.DataAccessLayer.Abstract;
using ArtifactDepotApp.DataAccessLayer.Context;
using ArtifactDepotApp.DataAccessLayer.Repositories;
using ArtifactDepotApp.EntityLayer.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtifactDepotApp.DataAccessLayer.EntityFramework
{
    public class EfArtifactMaterialDal : GenericRepository<ArtifactMaterial>, IArtifactMaterialDal
    {
        public EfArtifactMaterialDal(ArtifactContext artifactContext) : base(artifactContext)
        {
        }
    }
}
