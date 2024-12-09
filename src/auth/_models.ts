export interface AuthModel {
  sessionId: string;          // uuid
  userId: string;             // uuid
  ipAddress: {
    value: string | null;
  };
  device: {
    value: string | null;
  };
  lastUpdatedAt: string;      // date-time
  lastActivityAt: string | null;
  status: string | null;
  accessToken: string;
  expiredAt: string;          // date-time
  expiredAfter: string;       // date-span
}

export interface UserModel {
  userId: string;             // uuid
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  nationalCode: string | null;
  avatar: string | null;
}
