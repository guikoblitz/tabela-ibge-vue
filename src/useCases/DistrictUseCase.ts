import { City } from 'src/common/interfaces/City';
import { District } from 'src/common/interfaces/District';
import { getDistrictsByState } from 'src/services/IbgeService';
import { convertDistrictDTOtoDistrict } from 'src/util/UseCasesUtil';

async function getDistrictsByStateUseCase(stateId: number | string, returnCities = false): Promise<City[] | District[]> {
  const districtsDTO = await getDistrictsByState(stateId);
  const districtsUseCase: District[] = [];
  const cities: City[] = [];

  if (districtsDTO && districtsDTO.length > 0) {
    districtsDTO.forEach((districtDTO) => {
      const districtUseCase = convertDistrictDTOtoDistrict(districtDTO);
      districtsUseCase.push(districtUseCase);

      if (returnCities) {
        const foundCity = cities.find((city) => city.id === districtUseCase.city.id);
        if (!foundCity) {
          cities.push(districtUseCase.city);
        }
      }
    });
  }

  if (returnCities) return cities;
  return districtsUseCase;
}

export { getDistrictsByStateUseCase };
