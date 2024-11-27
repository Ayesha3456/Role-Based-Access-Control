export interface User {
  id: number;
  username: string;
  role: {
    id: number;
    name: string;
    permissions: string[];
  };
}
