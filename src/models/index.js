// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Item, User, Fridgebase, FridgebaseConnection, Items } = initSchema(schema);

export {
  Item,
  User,
  Fridgebase,
  FridgebaseConnection,
  Items
};