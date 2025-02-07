import {
    Alert,
    View,
    Button,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';
  import { useState } from 'react';
  import React from 'react';
  import  { useSystem, system } from '@/lib/powersync/PowerSync';
  import * as AuthSession from 'expo-auth-session';
  import {
    GoogleSignin,
    GoogleSigninButton,
    SignInResponse,
    SignInSuccessResponse,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
  import { AppConfig } from '@/lib/AppConfig'


  GoogleSignin.configure({
    webClientId: AppConfig.googleWebClientId, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: AppConfig.googleIosClientId, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });
  


  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleUser, setGoogleUser] = useState<SignInSuccessResponse | null>(null); // Store user info
    const [error, setError] = useState<SignInSuccessResponse | null>(null); // Store error messages
    
    const { supabaseConnector } = useSystem();
  
    // Sign in with email and password
    const onSignInPress = async () => {
      setLoading(true);
      try {
        await supabaseConnector.login(email, password);
        
        // Once login is successful, connect PowerSync
        await system.powersync.connect(system.supabaseConnector);
    
        // Then proceed to navigate to your main app screen, etc.
      } catch (error: any) {
        Alert.alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    // Create a new user
    const onSignUpPress = async () => {
      setLoading(true);
  
      const {
        data: { session },
        error,
      } = await supabaseConnector.client.auth.signUp({
        email: email,
        password: password,
      });
  
      if (error) {
        Alert.alert(error.message);
      } else if (!session) {
        Alert.alert('Please check your inbox for email verification!');
      }
  
      setLoading(false);
    };

    const googleSignIn = async () => {
      try {
        await GoogleSignin.hasPlayServices()
        const userInfo: SignInResponse  = await GoogleSignin.signIn()
        console.log('User Info:', userInfo);
        if (userInfo?.data?.idToken) {
          const { data, error } = await supabaseConnector.client.auth.signInWithIdToken({
            provider: 'google',
            token: userInfo.data.idToken,
          })
          console.log(error, data)
        } else {
          throw new Error('no ID token present!')
        }
      } catch (error: any) {
        console.error('Google Sign In error:', error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    }
  
    return (
      <View style={styles.container}>
        {loading && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              elevation: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              gap: 10,
            }}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{ color: '#fff', fontSize: 20 }}>Loading...</Text>
          </View>
        )}
  
        <Text style={styles.header}>Skins app</Text>
  
        <TextInput
          autoCapitalize="none"
          placeholder="john@doe.com"
          value={email}
          onChangeText={setEmail}
          style={styles.inputField}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputField}
        />
  
        <TouchableOpacity onPress={onSignInPress} style={styles.button}>
          <Text style={{ color: '#fff' }}>Sign in</Text>
        </TouchableOpacity>
          <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleSignIn}
          disabled={loading}
          style={styles.googleButton}
          />
        <Button onPress={onSignUpPress} title="Create Account" color={'#fff'}></Button>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 200,
      padding: 20,
      backgroundColor: '#474B24',
    },
    header: {
      fontSize: 30,
      textAlign: 'center',
      margin: 50,
      color: '#fff',
    },
    inputField: {
      marginVertical: 4,
      height: 50,
      borderWidth: 1,
      borderColor: '#63326E',
      borderRadius: 4,
      padding: 10,
      color: '#fff',
      backgroundColor: '#291711',
    },
    button: {
      marginVertical: 15,
      alignItems: 'center',
      backgroundColor: '#63326E',
      padding: 12,
      borderRadius: 4,
    },
    googleButton: {
      width: '100%', // Make the button fill the container's width
    },
  
  });
  
  export default Login;




const redirectUri = AuthSession.makeRedirectUri({
  // Do not set useProxy to true in standalone/development builds.
  scheme: 'skinapp',
});

console.log('Redirect URI:', redirectUri);
