import AppUser from '../../models/AppUser';
import { gql } from 'apollo-server';
import 'babel-polyfill';
// Type Defs

export const typeDef = gql`
  type AppUser {
    id: ID
    fullname: String
    emailid: String
    password: String
    mobilenumber: String
    createddate: String
  }

  extend type Query {
    UserExists(emailid: String, password: String): ReturnMessage
  }

  extend type Mutation {
    addAppUser(input: AppUserInput): AppUser
  }

  input AppUserInput {
    fullname: String
    emailid: String
    password: String
    mobilenumber: String
  }
`;

//Writing the resolvers for the queries in the schema file for queries
export const resolvers = {
  Query: {
    UserExists: async (root, { emailid, password }, context) => {
      var ex;
      await AppUser.findOne({ emailid: emailid }, (err, user) => {
        ex = user.checkPassword(password);
      });
      if (ex) {
        return { message: 'User Exists' };
      } else {
        return { message: 'Not Found' };
      }
    }
  },
  Mutation: {
    addAppUser: (root, { input }, context) => {
      console.log(input);
      let user = new AppUser(input);
      return user.save();
    }
  }
};
