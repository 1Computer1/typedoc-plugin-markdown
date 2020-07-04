import { ArrayType, IntersectionType, IntrinsicType, ReferenceType, StringLiteralType, TupleType, TypeOperatorType, UnionType } from 'typedoc/dist/lib/models/types';
export declare function type(this: ArrayType | IntersectionType | IntrinsicType | ReferenceType | StringLiteralType | TupleType | UnionType | TypeOperatorType): string | ArrayType | IntersectionType | IntrinsicType | ReferenceType | StringLiteralType | TupleType | TypeOperatorType | UnionType;
