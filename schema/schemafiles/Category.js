import Category from '../../models/Category';
import { gql } from 'apollo-server';
// Type Defs

export const typeDef = gql`
  type Category {
    id: ID
    category: String
    createdby: String
  }

  type Query {
    allCategories: [Category]
  }

  type Mutation {
    addCategory(input: CategoryInput): Category
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
    addCategory: (root, { input }) => {
      console.log(input);
      let q = new Category(input);
      return q.save();
    }
  }
};
