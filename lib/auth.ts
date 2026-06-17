import AsyncStorage from "@react-native-async-storage/async-storage";
import bcrypt from "bcrypt";

const USERS_STORAGE_KEY = "fabsexchange_users";
const CURRENT_USER_KEY = "fabsexchange_current_user";

export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  createdAt: string;
}

export interface AuthState {
  user: Omit<User, "password"> | null;
  isLoading: boolean;
  isSignedIn: boolean;
}

// Get all users from storage
export async function getAllUsers(): Promise<User[]> {
  try {
    const data = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("[v0] Error getting users:", error);
    return [];
  }
}

// Save all users to storage
async function saveUsers(users: User[]): Promise<void> {
  try {
    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("[v0] Error saving users:", error);
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.error("[v0] Error hashing password:", error);
    throw error;
  }
}

// Compare password
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error("[v0] Error comparing password:", error);
    return false;
  }
}

// Register user
export async function registerUser(
  email: string,
  password: string,
  fullName: string
): Promise<{ success: boolean; error?: string; user?: Omit<User, "password"> }> {
  try {
    const users = await getAllUsers();

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      return { success: false, error: "Email already registered" };
    }

    // Validate inputs
    if (!email || !password || !fullName) {
      return { success: false, error: "All fields are required" };
    }

    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters" };
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      fullName,
      createdAt: new Date().toISOString(),
    };

    // Save user
    users.push(newUser);
    await saveUsers(users);

    // Set as current user
    const { password: _, ...userWithoutPassword } = newUser;
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("[v0] Registration error:", error);
    return { success: false, error: "Registration failed" };
  }
}

// Login user
export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: Omit<User, "password"> }> {
  try {
    const users = await getAllUsers();

    // Find user by email
    const user = users.find((u) => u.email === email);
    if (!user) {
      return { success: false, error: "Email not found" };
    }

    // Compare password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return { success: false, error: "Invalid password" };
    }

    // Set as current user
    const { password: _, ...userWithoutPassword } = user;
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("[v0] Login error:", error);
    return { success: false, error: "Login failed" };
  }
}

// Get current user
export async function getCurrentUser(): Promise<Omit<User, "password"> | null> {
  try {
    const data = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("[v0] Error getting current user:", error);
    return null;
  }
}

// Logout user
export async function logoutUser(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error("[v0] Logout error:", error);
  }
}
