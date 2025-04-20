import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModel"; // adjust path if needed
import bcrypt from "bcryptjs";
import connectDB from "@/dbconfig/dbconfig";

export const authOptions = {
  providers: [
     
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

 
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error("No user found with this email");

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) throw new Error("Invalid credentials");

        return {
          id: user._id,
          email: user.email,
          name: user.firstname,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id || user._id;
      return token;
    },

    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      return session;
    },
  },

  pages: {
    signIn: "/Account/profile", 
  },
};
