import { Session } from '@supabase/supabase-js';
import { PowerSyncProvider } from "@/lib/powersync/PowerSyncProvider";
import { useSystem } from "@/lib/powersync/PowerSync";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Stack, Slot, useRouter, useSegments } from 'expo-router';


const InitialLayout = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [initialized, setInitialized] = useState<boolean>(false);
  
    const segments = useSegments();
    const router = useRouter();
  
    const { supabaseConnector } = useSystem();
    const system = useSystem();
  
  // Example: once a valid session is detected, activate system.init()
  useEffect(() => {
    if (session && !initialized) {
      system.init();
      setInitialized(true);
    }
  }, [session, initialized, system]);
  
    useEffect(() => {
      // Listen for changes to authentication state
      const { data } = supabaseConnector.client.auth.onAuthStateChange(async (event, session) => {
        console.log('supabase.auth.onAuthStateChange', event, session);
        setSession(session);
        setInitialized(true);
      });
      return () => {
        data.subscription.unsubscribe();
      };
    }, []);
  
    useEffect(() => {
      if (!initialized) return;
  
      // Check if the path/url is in the (auth) group
      const inAuthGroup = segments[0] === '(tabs)';
  
      if (session && !inAuthGroup) {
        // Redirect authenticated users to the list page
        router.replace('/(tabs)');
      } else if (!session) {
        // Redirect unauthenticated users to the login page
        router.replace('/login-page');
      }
    }, [session, initialized]);
  
    return <Slot />;
  };
  

const RootLayout = () => {
return (
    <>
    <PowerSyncProvider>
      <InitialLayout></InitialLayout>
    </PowerSyncProvider>
    </>
)
}

export default RootLayout