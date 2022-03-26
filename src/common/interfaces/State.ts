export interface State {
  id: number;

  name: string;

  label: string;

  region: Region;

  abbreviation: string;
}

interface Region {
  id: number;

  name: string;

  abbreviation: string;
}
