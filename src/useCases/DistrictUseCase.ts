import { District } from 'src/common/interfaces/District';
import { getDistrictsByState } from 'src/services/IbgeService';

async function getDistrictsByStateUseCase(stateId: number | string): Promise<District[]> {
  const districtsDTO = await getDistrictsByState(stateId);
  const districtsUseCase: District[] = [];

  if (districtsDTO && districtsDTO.length > 0) {
    districtsDTO.forEach((districtDTO) => {
      const districtUseCase = {
        id: districtDTO.id,
        name: districtDTO.nome,
        city: {
          id: districtDTO.municipio.id,
        },
      } as District;
      districtsUseCase.push(districtUseCase);
    });
  }

  return districtsUseCase;
}

export { getDistrictsByStateUseCase };
