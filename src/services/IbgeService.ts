import ibgeApi from './Api';

export default {
  async getStates(): Promise<any | undefined> {
    // tipar o any
    try {
      const response = await ibgeApi.get('estados');
      if (response.status === 200) {
        return response.data;
      }
      return undefined;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async getDistrictsByState(filter: number | string): Promise<any | undefined> {
    // tipar o any
    try {
      const response = await ibgeApi.get(`pokemon/${filter}`);
      if (response.status === 200) {
        return response.data;
      }
      return undefined;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};
