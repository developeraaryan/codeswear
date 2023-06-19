import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import User from "../../../Models/User";
import CryptoJS from "crypto-js";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "select_account",
                    access_type: "offline",
                    response_type: "code",
                }
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,

        }),
        Credentials({
            name: 'Credentials',
            async authorize(credentials, req) {
                // check if user exists
                const result = await User.findOne({ email: credentials.email });
                if (!result) {
                    throw new Error('No user found with this email Please Sign Up');
                }
                // check if password matches
                const bytes = CryptoJS.AES.decrypt(result.password, process.env.AES_SECRET)
                let decryptPass = (bytes.toString(CryptoJS.enc.Utf8))
                if (decryptPass !== credentials.password || result.email !== credentials.email) {
                    throw new Error('Invalid credentials');
                }
                // if all ok, return user   
                return result;
            },
        }),
    ],

    secret: process.env.SECRET, // Add a JWT secret
}

export default NextAuth(authOptions);