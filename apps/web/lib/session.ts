"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
    user: {
        id: string;
        name: string;
    };
    access_token: string;
    // refresh_token: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
const encoderKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: Session) {
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await new SignJWT(payload)
        .setProtectedHeader({
            alg: "HS256",
        })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encoderKey);

    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: expiredAt,
        sameSite: "lax",
        path: "/",
    });
}

export async function getSession() {
    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) return null;

    try {
        const { payload } = await jwtVerify(cookie, encoderKey, {
            algorithms: ["HS256"],
        });

        return payload as Session;
    } catch (error) {
        console.error("Failed to verify session", error);
        redirect("/auth/signin");
    }
}

export async function deleteSession() {
    (await cookies()).delete("session");
}
