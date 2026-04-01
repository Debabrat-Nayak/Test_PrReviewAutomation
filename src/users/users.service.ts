import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { log } from 'console';

@Injectable()
export class UsersService {
     constructor(
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>,
  ) {}

  async create(data:Partial<User>){

    let check=data.contacts?.[0]?.value
    const filterUser=await this.userModel.find().exec()
    console.log(filterUser,'getAlluser');
      const Filteruser=filterUser.filter(e=>console.log(e.contacts[0].value==check))

      if(filterUser){
return {message:"Entery is duplicate"}
      }

    
    return this.userModel.create(data)
    // console.log(check.contacts);
    
  }

  getAllUser(){
    return this.userModel.find().exec()
  }

    async getUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async updateUserById(id: string, data: any) {
  return this.userModel.findByIdAndUpdate(
    id,
    data,
    { new: true }
  ).exec();
}

async deleteById(id:string){
return this.userModel.findByIdAndDelete(id).exec
}

async getMUser(){
  return this.userModel.find({ gender: 'male' });
}
}
