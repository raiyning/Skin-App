/*TODO: refactor for future flexibility 

Auth Service: Create a separate service that abstracts all authentication and session management. This service can interact with Supabase for now and with your backend API in the future without changing the rest of the app.
Token and Session Management: Abstract token and session management into reusable services that handle both storage and retrieval of tokens. This helps avoid changing multiple parts of the app when switching to a backend.
Redirection and State Handling: Modularize the redirection and session checks by using custom hooks or services. These can be easily updated when switching to a backend API.
*/

// import { SupabaseClient } from '@supabase/supabase-js';
// import { AppConfig } from '@/lib/AppConfig';

// export class AuthService {
//   private static client: SupabaseClient;

//   // Initialize the client
//   static initializeClient() {
//     if (!this.client) {
//       this.client = new SupabaseClient(AppConfig.supabaseUrl, AppConfig.supabaseAnonKey);
//     }
//   }

//   static async login(username: string, password: string) {
//     // Handle login logic
//     const { data, error } = await this.client.auth.signInWithPassword({
//       email: username,
//       password: password,
//     });

//     if (error) throw error;
//     return data?.user;
//   }

//   static async fetchCredentials() {
//     // Fetch session logic
//     const { data: { session }, error } = await this.client.auth.getSession();
//     if (error || !session) throw new Error('Could not fetch session');

//     return {
//       token: session.access_token,
//       userID: session.user.id,
//       expiresAt: session.expires_at,
//     };
//   }

//   static async logout() {
//     // Handle logout
//     const { error } = await this.client.auth.signOut();
//     if (error) throw error;
//   }

//   static getClient() {
//     return this.client;
//   }
// }
