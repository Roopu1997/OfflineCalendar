/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { mySchema } from "./src/models/schema";
import { dbModels } from "./src/models/index.js";
import createHome from './App';

const adapter = new SQLiteAdapter({
    dbName: "CalendarInfo",
    schema: mySchema
});

const database = new Database({
    adapter,
    modelClasses: dbModels,
    actionsEnabled: true
});

const Home = createHome({ database });

AppRegistry.registerComponent(appName, () => Home);
