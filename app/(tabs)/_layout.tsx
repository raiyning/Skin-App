import {Tabs} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function RootLayout() {
  return (
    <Tabs 
    screenOptions={{
      tabBarActiveTintColor: '#ffd33d',
      headerStyle: {
        backgroundColor: '#25292e'
      },
      headerShadowVisible: false,
      headerTintColor: '#fff',
      tabBarStyle: {
        backgroundColor: 'black'
      }
      }} >
      <Tabs.Screen 
      name="index" 
      options={{ 
        title: 'Home',
        tabBarIcon:({color, focused}) => (
          <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}/>
        )
      }} 
      />
      <Tabs.Screen
        name="overall"
        options={{
          title: 'Overall',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "list-sharp" : "list-outline"} color={color} size={24}/>
          ),
        }}
      />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name={focused ? "clipboard-text" : 'clipboard-text-outline'} color={color} size={24}/>
            ),
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            title: 'Setting',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'settings-sharp' : 'settings-outline'} color={color} size={24}/>
            ),
          }}
        />
    </Tabs>
    
  )
}