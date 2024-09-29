import { JwtPayload } from "jwt-decode";

export interface ExtendedJwtPayload extends JwtPayload {
    zoneinfo?: string;
  }