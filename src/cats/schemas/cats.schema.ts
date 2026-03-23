import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ToObjectOptions } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

const schemaTransform: ToObjectOptions['transform'] = (
  _doc,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { _id, __v, ...rest },
) => ({
  id: _id.toString(),
  ...rest,
});

@Schema({
  timestamps: true,
  toJSON: {
    transform: schemaTransform,
  },
  toObject: {
    transform: schemaTransform,
  },
})
export class Cat {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
