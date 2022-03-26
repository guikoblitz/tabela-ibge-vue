import { State } from 'src/common/interfaces/State';
import { getStates } from 'src/services/IbgeService';

async function getStatesUseCase(): Promise<State[]> {
  const statesDTO = await getStates();
  const statesUseCase: State[] = [];

  if (statesDTO && statesDTO.length > 0) {
    statesDTO.forEach((stateDTO) => {
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
      statesUseCase.push(stateUseCase);
    });
  }

  return statesUseCase;
}

export { getStatesUseCase };
