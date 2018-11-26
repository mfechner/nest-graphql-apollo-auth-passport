import { Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';
import { ObjectID } from 'mongodb';

@Scalar('ObjectID')
export class ObjectidScalar {
    description = 'The `ObjectID` scalar type represents a [`BSON`](https://en.wikipedia.org/wiki/BSON) ID commonly used in `mongodb`.';

    parseValue(value) {
        if (typeof value === 'string') {
            return ObjectID.createFromHexString(value);
        } else {
            throw new Error('${typeof value} not convertible to ObjectID');
        }
    }

    serialize(value) {
        if (value instanceof ObjectID) {
            return value.toHexString();
        } else if (typeof value === 'string') {
            return value;
        } else {
            throw new Error(`${Object.getPrototypeOf(value).constructor.name} not convertible to `);
        }
    }

    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return ObjectID.createFromHexString(ast.value);
        } else {
            throw new Error(`${ast.kind} not convertible to ObjectID`);
        }
    }
}
