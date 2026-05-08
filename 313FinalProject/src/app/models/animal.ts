export interface Animal {
  id: string;
  name: string;
  breed: string;
  sex: string;
  species?: string;
  age?: string;
  personality?: string; // <-- ADD THIS
  shelterDuration?: string; // <-- ADD THIS
  status?: string;
  imageUrl?: string;
  createdAt?: any;
}
