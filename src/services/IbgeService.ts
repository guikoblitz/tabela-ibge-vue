import { DistrictDTO } from 'src/common/dtos/DistrictDTO';
import { StateDTO } from 'src/common/dtos/StateDTO';
import ibgeApi from './Api';

async function getStates(): Promise<StateDTO[] | null> {
  try {
    const response = await ibgeApi.get('estados');
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function getState(uf: number | string): Promise<StateDTO | null> {
  try {
    const response = await ibgeApi.get(`estados/${uf}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function getDistrictsByState(uf: number | string): Promise<DistrictDTO[] | null> {
  try {
    const response = await ibgeApi.get(`estados/${uf}/distritos`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export { getStates, getState, getDistrictsByState };
