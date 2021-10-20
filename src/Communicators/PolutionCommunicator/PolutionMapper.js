

class PolutionMapper {

  createPolution (obj) {
    let polutionObj = {
      co: obj.list[0].components.co,
      no2: obj.list[0].components.no2,
      o3: obj.list[0].components.o3,
      so2: obj.list[0].components.so2,
      pm2_5: obj.list[0].components.pm2_5,
      nh3: obj.list[0].components.nh3
    };
    return polutionObj;
  }
}

export const polutionMapper = new PolutionMapper();