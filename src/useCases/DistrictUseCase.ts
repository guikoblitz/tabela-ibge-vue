import { District } from 'src/common/interfaces/District';
import { getDistrictsByState } from 'src/services/IbgeService';
import { convertDistrictDTOtoDistrict } from 'src/util/UseCasesUtil';

async function getDistrictsByStateUseCase(stateId: number | string): Promise<District[]> {
  const districtsDTO = await getDistrictsByState(stateId);
  const districtsUseCase: District[] = [];

  if (districtsDTO && districtsDTO.length > 0) {
    districtsDTO.forEach((districtDTO) => {
      const districtUseCase = convertDistrictDTOtoDistrict(districtDTO);
      districtsUseCase.push(districtUseCase);
    });
  }

  return districtsUseCase;
}

export { getDistrictsByStateUseCase };
