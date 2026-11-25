export interface User {
  id: number;
  nama: string;
  email: string;
  no_hp?: string;
  role_id: number;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  refresh_token?: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
}

export interface ProfileResponse {
  message: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  nama: string;
  email: string;
  password: string;
  no_hp?: string;
}

export interface ApiError {
  message: string;
  error?: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data.message || "Terjadi kesalahan saat login";
      throw new Error(errorMsg);
    }

    // Save tokens and user session in localStorage
    if (typeof window !== "undefined") {
      if (data.token) localStorage.setItem("access_token", data.token);
      if (data.refresh_token)
        localStorage.setItem("refresh_token", data.refresh_token);
      if (data.user)
        localStorage.setItem("user_profile", JSON.stringify(data.user));
    }

    return data as LoginResponse;
  },

  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data.message || "Terjadi kesalahan saat registrasi";
      throw new Error(errorMsg);
    }

    return data as RegisterResponse;
  },

  async getProfile(): Promise<ProfileResponse> {
    const token = this.getToken();
    if (!token) {
      throw new Error("Token autentikasi tidak ditemukan");
    }

    const res = await fetch(`${API_BASE_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data.message || "Gagal mengambil profil";
      throw new Error(errorMsg);
    }

    if (typeof window !== "undefined" && data.user) {
      localStorage.setItem("user_profile", JSON.stringify(data.user));
    }

    return data as ProfileResponse;
  },

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_profile");
    }
  },

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  },

  getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refresh_token");
    }
    return null;
  },

  getUser(): User | null {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user_profile");
      if (user) {
        try {
          return JSON.parse(user) as User;
        } catch {
          return null;
        }
      }
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
