import { Injectable } from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUserInput } from '../auth/dto/login-user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  findAll() {
    return this.userModel
      .find()
      .select(['name', '_id', 'email'])
      .skip(0)
      .limit(10);
  }

  findOne(id: string) {
    return this.userModel.findById(id).select('-password');
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  update(id: Schema.Types.ObjectId, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput);
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }

  async loginUser(loginInput: LoginUserInput) {
    const { email, password } = loginInput;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Password or email address incorrect');
    }

    return user;
  }
}
