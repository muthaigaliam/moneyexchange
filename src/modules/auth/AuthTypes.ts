export type AuthPayload {
    name: string;
    email: string;
    password: string;
    telephone: string;
    role_id: number;
  };
  
  export type AuthResponse {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role_id: number;
    };
  };

  export type LoginPayload = {
    email: string;
    password: string;
    name?: string; // Make it optional if not needed
    telephone?: string; // Make it optional if not needed
    role_id?: string;
  };