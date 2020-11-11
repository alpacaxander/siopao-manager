import { Pipe, PipeTransform } from '@angular/core'
import { Document } from '../services/json-api-types/document'
import { PrimaryData } from '../services/json-api-types/primary-data'
import { OperatorFunction } from 'rxjs'

@Pipe({name: 'documentData'})
export class DocumentDataPipe implements PipeTransform {
  transform<T>(value: Document<T>, ...args): T {
    return value.data
  }
}
