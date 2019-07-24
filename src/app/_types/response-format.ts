import { Categories } from './categories';

export interface ResponseCategories {
    success: boolean;
    data: Categories[];
    status: string;
  }