import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Prospect {
  @prop()
  _id: string;

  @prop()
  name: string;

  @prop()
  email: string;

  @prop()
  doxado_id: string;

  @prop()
  doctor: string;

  @prop()
  slug: string;
}

export const ProspectModel = getModelForClass(Prospect);
