import Category from '../../models/Category';
import { gql } from 'apollo-server';
import bcrypt from 'bcryptjs';
// Type Defs

export const typeDef = gql`
  type Category {
    id: ID
    category: String
    createdby: String
  }

  type ReturnMessage {
    message: String
  }

  type Query {
    allCategories: [Category]
  }

  type Mutation {
    addCategory(input: CategoryInput): Category
    delCategory(id: ID): ReturnMessage
  }

  input CategoryInput {
    category: String
    createdby: String
  }
`;

//Writing the resolvers for the queries in the schema file for queries
export const resolvers = {
  Query: {
    allCategories: () => {
      return Category.find();
    }
  },
  Mutation: {
    addCategory: (root, { input }, context) => {
      let q = new Category(input);
      return q.save();
    },
    delCategory: (root, { id }) => {
      console.log(id);
      var x = Category.findByIdAndRemove(id, (err, cat) => {
        if (err) return false;
        return true;
      });
      if (x) {
        return {
          message: 'Category Deleted Successfully'
        };
      } else {
        return {
          message: 'Category  Deletion PRoblem'
        };
      }
    }
  }
};
