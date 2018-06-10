import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import {
  typeDef as Category,
  resolvers as categoryResolvers
} from './schemafiles/Category';
import {
  typeDef as AppUser,
  resolvers as AppUserResolvers
} from './schemafiles/AppUser';

// merging all resolvers together with the merge function from lodash
const resolvers = merge(categoryResolvers, AppUserResolvers);

// creating the schema using te typedef and resolvers together
const schema = makeExecutableSchema({
  typeDefs: [Category, AppUser],
  resolvers: resolvers
});

export default schema;
