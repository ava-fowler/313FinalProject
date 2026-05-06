export interface Animal {
  id?: string;
  name: string;
  breed: string;
  sex: string;
  species?: string;
  age?: string | number;
  status?: string;
  about?: string;
  imageUrl?: string;
  shelterDuration?: string; // <-- ADD THIS
  personality?: string; // <-- ADD THIS
}
