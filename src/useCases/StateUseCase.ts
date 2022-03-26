import { State } from 'src/common/interfaces/State';
import { getStates } from 'src/services/IbgeService';
import { convertStateDTOtoState } from 'src/util/UseCasesUtil';

async function getStatesUseCase(): Promise<State[]> {
  const statesDTO = await getStates();
  const statesUseCase: State[] = [];

  if (statesDTO && statesDTO.length > 0) {
    statesDTO.forEach((stateDTO) => {
      const stateUseCase = convertStateDTOtoState(stateDTO);
      statesUseCase.push(stateUseCase);
    });
  }

  const sortedStatesUseCase = statesUseCase.sort((st1: State, st2: State) => {
    if (st1.abbreviation > st2.abbreviation) {
      return 1;
    }
    if (st1.abbreviation < st2.abbreviation) {
      return -1;
    }
    return 0;
  });

  return sortedStatesUseCase;
}

export { getStatesUseCase };
