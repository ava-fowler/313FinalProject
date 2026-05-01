import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updatePassword as fbUpdatePassword } from 'firebase/auth';
import { firebaseAuth } from '../firebase';

export type UserRole = 'admin' | 'customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ADMIN_EMAIL = 'admin@webapp.com';

  // ----------------------
  // Save user to localStorage
  // ----------------------
  private storeUser(email: string, username: string, role: UserRole, password?: string) {
    const user: any = { email, username, role };
    if (password) {
      user.password = password;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // ----------------------
  // Get current user
  // ----------------------
  getCurrentUser() {
    const raw = localStorage.getItem('currentUser');
    return raw ? JSON.parse(raw) : null;
  }

  // ----------------------
  // Role helpers
  // ----------------------
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  isCustomer(): boolean {
    return this.getCurrentUser()?.role === 'customer';
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin';
  }

  // ----------------------
  // Logout
  // ----------------------
  logout(): Promise<void> {
    localStorage.removeItem('currentUser');
    return signOut(firebaseAuth);
  }

  // ----------------------
  // Register (Firebase)
  // ----------------------
  async registerUser(email: string, username: string, password: string): Promise<void> {
    if (!email || !username || !password) throw new Error('Email, username, and password required');

    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password, username);
    await updateProfile(userCredential.user, { displayName: username });

    const role: UserRole = email.toLowerCase() === this.ADMIN_EMAIL ? 'admin' : 'customer';
    this.storeUser(email, username, role, password);
  }

  // ----------------------
  // Login (Firebase)
  // ----------------------
  async loginUser(email: string, password: string): Promise<UserRole> {
    if (!email || !password) throw new Error('Email and password required');

    const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);

    const role: UserRole = email.toLowerCase() === this.ADMIN_EMAIL ? 'admin' : 'customer';
    const username = this.getCurrentUser()?.username ?? credential.user.displayName ?? credential.user.email ?? email;
    this.storeUser(email, username, role, password);

    return role;
  }

  // ----------------------
  // Update username (Firebase + localStorage)
  // ----------------------
  async updateUsername(newUsername: string): Promise<void> {
    if (!newUsername) throw new Error('Username cannot be empty');
    const current = firebaseAuth.currentUser;
    if (!current) throw new Error('No authenticated user');

    await updateProfile(current, { displayName: newUsername });

    // preserve role and password if present
    const currentUser = this.getCurrentUser();
    const role: UserRole = currentUser?.role ?? (current.email?.toLowerCase() === this.ADMIN_EMAIL ? 'admin' : 'customer');
    this.storeUser(current.email ?? '', newUsername, role, currentUser?.password);
  }

  // ----------------------
  // Update password (Firebase)
  // ----------------------
  async updatePassword(newPassword: string): Promise<void> {
    if (!newPassword) throw new Error('Password cannot be empty');
    const current = firebaseAuth.currentUser;
    if (!current) throw new Error('No authenticated user');

    try {
      await fbUpdatePassword(current, newPassword);
      // Update localStorage with new password
      const currentUser = this.getCurrentUser();
      const role: UserRole = currentUser?.role ?? (current.email?.toLowerCase() === this.ADMIN_EMAIL ? 'admin' : 'customer');
      this.storeUser(current.email ?? '', currentUser?.username ?? current.email ?? '', role, newPassword);
    } catch (err: any) {
      // Firebase may require recent login; surface a helpful message
      if (err?.code === 'auth/requires-recent-login') {
        throw new Error('Please sign in again and retry updating your password.');
      }
      throw new Error(err?.message || 'Failed to update password');
    }
  }
}