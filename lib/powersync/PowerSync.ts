import '@azure/core-asynciterator-polyfill';
import 'react-native-polyfill-globals/auto';
import { PowerSyncDatabase } from '@powersync/react-native';
import React from 'react';

import Logger from 'js-logger';
import { AppConfig } from '@/lib/AppConfig';
import { SupabaseConnector } from '@/lib/powersync/SupabaseConnector';
import { AppSchema, Database } from './AppSchema';
import { Kysely, wrapPowerSyncWithKysely } from '@powersync/kysely-driver';


Logger.useDefaults();

export class System {
  supabaseConnector: SupabaseConnector;
  powersync: PowerSyncDatabase;
  db: Kysely<Database>;

  constructor() {
    this.supabaseConnector = new SupabaseConnector(this);
    this.powersync = new PowerSyncDatabase({
      schema: AppSchema,
      database: {
        dbFilename: 'sqlite.db'
      }
    });
    this.db = wrapPowerSyncWithKysely(this.powersync);
  }

  async init() {
    console.log('Initializing system');
    await this.powersync.init();
    await this.powersync.connect(this.supabaseConnector);

  }
}

export const system = new System();

export const SystemContext = React.createContext(system);
export const useSystem = () => React.useContext(SystemContext);
