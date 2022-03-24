import ibgeApi from './Api';

async function getStates(): Promise<any | undefined> {
  // TODO tipar o any
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

async function getDistrictsByState(uf: number | string): Promise<any | undefined> {
  // TODO tipar o any
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

export { getStates, getDistrictsByState };
