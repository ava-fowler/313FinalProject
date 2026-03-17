import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
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
  private storeUser(email: string, role: UserRole) {
    const user = { email, role };
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
  async registerUser(email: string, password: string): Promise<void> {
    if (!email || !password) throw new Error('Email and password required');

    await createUserWithEmailAndPassword(firebaseAuth, email, password);

    const role: UserRole = email.toLowerCase() === this.ADMIN_EMAIL ? 'admin' : 'customer';
    this.storeUser(email, role);
  }

  // ----------------------
  // Login (Firebase)
  // ----------------------
  async loginUser(email: string, password: string): Promise<UserRole> {
    if (!email || !password) throw new Error('Email and password required');

    await signInWithEmailAndPassword(firebaseAuth, email, password);

    const role: UserRole = email.toLowerCase() === this.ADMIN_EMAIL ? 'admin' : 'customer';
    this.storeUser(email, role);

    return role;
  }
}