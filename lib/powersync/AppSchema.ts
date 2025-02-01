import { column, Schema, Table } from '@powersync/react-native';

export const TASKS_TABLE = 'tasks';

const tasks = new Table(
  {
    // id column (text) is automatically included
    task_uuid: column.text,
    title: column.text,
    description: column.text,
    emoji: column.text,
    progress: column.text
  },
  { indexes: {} }
);

export const AppSchema = new Schema({
  tasks
});

export type Database = (typeof AppSchema)['types'];
