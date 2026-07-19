export interface InMemoryUser {
  id: string;
  name?: string;
  email?: string;
  role?: 'admin' | 'user';
}
