import { Pipe, PipeTransform } from '@angular/core'
import { Document } from '../services/json-api-types/document'

@Pipe({name: 'documentData'})
export class DocumentDataPipe implements PipeTransform {
  transform<T>(value: Document<T>, ...args): T {
    return value.data
  }
}
