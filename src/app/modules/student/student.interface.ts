import { Schema, model, connect } from 'mongoose';
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type Student = {
  id: string;
  name: UserName;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  email: string;
  contactNumber?: string;
  emergencyNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'O+' | 'AB+';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage: string;
  isActive: 'Active' | 'Blocked';
};
