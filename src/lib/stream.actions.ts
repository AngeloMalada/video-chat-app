'use server';

import { currentUser } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';
import { env } from '@/lib';

const STREAM_API_KEY = env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = env.STREAM_SECRET_KEY;

export async function tokenProvider() {
  const user = await currentUser();

  if (!user) throw new Error('User is not authenticated');
  if (!STREAM_API_KEY) throw new Error('Stream API key secret is missing');
  if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.generateUserToken({
    user_id: user.id,
    validity_in_seconds: expirationTime,
    iat: issuedAt,
  });

  return token;
}
