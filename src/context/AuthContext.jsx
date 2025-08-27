import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { supabase } from "../supabase";

const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  // State to store the current session
  const [session, setsession] = useState("hi");

  // Function to fetch the initial session from Supabase
  async function getIntialSession() {
    try {
      // Get session from Supabase auth
      // Retrieves the current session from Supabase authentication.
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        // Throw error if session retrieval fails
        throw new error();
      }
      // Update session state with retrieved data
      setsession(data.session);

      // Set up a listener for authentication state changes in Supabase
      // This callback will be triggered whenever the user's authentication state changes
      // The _event parameter contains information about the type of change (e.g., SIGNED_IN, SIGNED_OUT)
      // The session parameter contains the updated session data after the change
      supabase.auth.onAuthStateChange((_event, session) => {
        // Update the session state with the new session data
        setsession(session);
      });
    } catch (e) {
      // Log any errors that occur during session retrieval
      console.log("aaya error : ", e);
    }
  }

  // Effect to fetch initial session when component mounts
  useEffect(() => {
    getIntialSession();
  }, []);

  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Error while signing in - ", error);
        return { success: false, error: error.message };
      }
      console.log("Supabase sign in success : ",data)
      return {success: true, data}
    } catch (e) {
      console.error("Unexpected while Sigin - ", e);
      return {success: false, error: 'Unexpected error agaaya bhai'}
    }
  };

  const signOutUser = async () =>{
    try {
         const {  error } = await supabase.auth.signOut()

        if (error) {
            console.error("Error while signing out:", error.message);
            return { success: false, error: error.message };
        }
        console.log("Supabase sign out success")
        } catch (e) {
        console.error("Unexpected Error while Signing Out : ",e)
        return {success: false, error: 'Unexpected error agaya bhai'}
    }
  }

  const signUpUser = async (email, password) => {
    try {
         const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.error("Error while signing up:", error.message);
            return { success: false, error: error.message };
        }
        console.log("Supabase sign up success : ",data)
    } catch (e) {
        console.error("Unexpected Error while Signing UP : ",e)
        return {success: false, error: 'Unexpected error agaya bhai'}
    }
  }

  return (
    <AuthContext.Provider value={{ session,signOutUser, signInUser, signUpUser }}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
