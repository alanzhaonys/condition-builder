import { Operator } from './Operator';

export interface Filter {
  leftCondition: string;
  operator: Operator;
  value: string;
}
