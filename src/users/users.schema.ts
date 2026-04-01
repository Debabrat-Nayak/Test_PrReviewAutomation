import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type UserDocument = User & Document;

//  Contact Schema
@Schema()
export class Contact {

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    value: string;

}


const ContactSchema = SchemaFactory.createForClass(Contact)


//  Address Schema
@Schema()
export class Address {

    @Prop()
    line: string;

    @Prop()
    landmark: string;

    @Prop({required:true}) 
    pincode: string;

    @Prop({required:true})
    city: string;

    @Prop()
    state: string;
}
const AddressSchema = SchemaFactory.createForClass(Address);



@Schema({ timestamps: true })
export class User {

    @Prop({ required: true })
    name: string;

    @Prop({required:true})
    age: number;

    @Prop({
        enum: ['male', 'female', 'others']
    })
    gender: string;
// TODO : : Add contact value unique key
    @Prop({ type: [ContactSchema] })
    contacts: Contact[];


    @Prop({ type: AddressSchema })
    address: Address;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index(
  { 'contacts.value': 1 },
  { unique: true, sparse: true }
);