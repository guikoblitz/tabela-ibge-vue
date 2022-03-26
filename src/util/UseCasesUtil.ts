import { DistrictDTO } from 'src/common/dtos/DistrictDTO';
import { StateDTO } from 'src/common/dtos/StateDTO';
import { District } from 'src/common/interfaces/District';
import { State } from 'src/common/interfaces/State';

function convertStateDTOtoState(stateDTO: StateDTO): State {
  const stateUseCase = {
    id: stateDTO.id,
    name: stateDTO.nome,
    abbreviation: stateDTO.sigla,
    label: `${stateDTO.sigla} - ${stateDTO.nome}`,
    region: {
      id: stateDTO.regiao.id,
      name: stateDTO.regiao.nome,
      abbreviation: stateDTO.regiao.sigla,
    },
  } as State;

  return stateUseCase;
}

function convertDistrictDTOtoDistrict(districtDTO: DistrictDTO): District {
  const districtUseCase = {
    id: districtDTO.id,
    name: districtDTO.nome,
    city: {
      id: districtDTO.municipio.id,
      name: districtDTO.municipio.nome,
      microregion: {
        id: districtDTO.municipio.microrregiao.id,
        name: districtDTO.municipio.microrregiao.nome,
        mesoRegion: {
          id: districtDTO.municipio.microrregiao.mesorregiao.id,
          name: districtDTO.municipio.microrregiao.mesorregiao.nome,
          uf: convertStateDTOtoState(districtDTO.municipio.microrregiao.mesorregiao.UF),
        },
      },
      immediateRegion: {
        id: districtDTO.municipio['regiao-imediata'].id,
        name: districtDTO.municipio['regiao-imediata'].nome,
        intermediateRegion: {
          id: districtDTO.municipio['regiao-imediata']['regiao-intermediaria'].id,
          name: districtDTO.municipio['regiao-imediata']['regiao-intermediaria'].nome,
          uf: convertStateDTOtoState(districtDTO.municipio['regiao-imediata']['regiao-intermediaria'].UF),
        },
      },
    },
  } as District;

  return districtUseCase;
}

export { convertStateDTOtoState, convertDistrictDTOtoDistrict };
