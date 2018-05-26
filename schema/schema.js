import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import {
  typeDef as Category,
  resolvers as categoryResolvers
} from './schemafiles/Category';

// merging all resolvers together with the merge function from lodash
const resolvers = merge(categoryResolvers);

// creating the schema using te typedef and resolvers together
const schema = makeExecutableSchema({
  typeDefs: [Category],
  resolvers: resolvers
});

export default schema;
