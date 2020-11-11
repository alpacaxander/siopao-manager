import { OperatorFunction } from 'rxjs'
import { map } from 'rxjs/operators'
import { Document } from '../services/json-api-types/document'

export function DocumentData<T>(): OperatorFunction<Document<T>, T>{
  return map((response: Document<T>) => response.data)
}
