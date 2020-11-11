export class Document<T> {
  data: T
  errors: []
  meta: {}

  constructor(data: T) {
    this.data = data
  }
}
