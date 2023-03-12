import mongoose, { ValidateOpts, ValidatorProps } from 'mongoose';

export const referenceValidator: ValidateOpts<mongoose.Types.ObjectId> = {
  propsParameter: true,
  validator: async function (
    id: mongoose.Types.ObjectId,
    props?: ValidatorProps
  ): Promise<boolean> {
    const ref = this.schema.path(props.path).options.ref;

    if (!ref) {
      throw new Error(
        `Property '${props.path}' is not a reference to another document.`
      );
    } else if (!this.db.modelNames().includes(ref)) {
      throw new Error(`No model with name '${ref}' exists.`);
    }

    const doc = await this.db.model(ref).findById(id).exec();

    return !!doc;
  },
  message: function (props: ValidatorProps): string {
    return `Not a valid '${props.path}' reference!`;
  },
};
