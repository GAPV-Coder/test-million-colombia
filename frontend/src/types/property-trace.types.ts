export interface PropertyTraceDto {
    idPropertyTrace?: string
    idProperty: string
    dateSale: Date
    name: string
    value: number
    tax: number
}

export interface CreatePropertyTraceDto {
    idProperty: string
    dateSale: Date
    name: string
    value: number
    tax: number
}