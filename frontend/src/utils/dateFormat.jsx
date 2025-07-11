import { format } from 'date-fns';

export const dateFormat = (date) => {
  return format(new Date(date), 'dd/MM/yyyy');
};
