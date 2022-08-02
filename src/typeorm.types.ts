import { Brackets, ObjectLiteral } from 'typeorm'

export type TypeormWhereOptions = Brackets | string | ((qb: any) => string) | ObjectLiteral | ObjectLiteral[]
export type TypeormWhereParamenters = ObjectLiteral
