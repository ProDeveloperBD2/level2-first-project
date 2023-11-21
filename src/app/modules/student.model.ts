import { Schema, model, connect, modelNames } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
    trim: true,
    maxlength: [10, 'First Name can not be more than 10 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.substring(1);
        return firstNameStr === value;
      },
      message: '{VALUE} Is Not in Capitalize Format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is Required'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} Is Not Valid',
    },
  },
});
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, 'Father Name is Required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is Required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is Required'],
  },
  motherName: { type: String, required: [true, 'Mother Name is Required'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is Required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is Required'],
  },
});
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, 'Name is Required'] },
  occupation: { type: String, required: [true, 'Occupation is Required'] },
  contactNo: { type: String, required: [true, 'Contact Number is Required'] },
  address: { type: String, required: [true, 'Address is Required'] },
});
const studentSchema = new Schema<Student>({
  id: { type: String, required: [true, 'ID is Required'], unique: true },
  name: {
    type: userNameSchema,
    required: [true, 'Name is Required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female'],
      message: '{VALUE} is not valid',
    },
    required: [true, 'Gender is Required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} Is Not A Valid Email Type',
    },
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact Number is Required'],
  },
  emergencyNumber: {
    type: String,
    required: [true, 'Emergency Number is Required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'O+', 'AB+'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is Required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is Required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian is Required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian is Required'],
  },
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ['Active', 'Blocked'],
    default: 'Active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
