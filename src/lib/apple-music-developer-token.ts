export interface AppleMusicSigningEnv {
  APPLE_MUSIC_KEY_ID?: string;
  APPLE_MUSIC_PRIVATE_KEY?: string;
  APPLE_MUSIC_TEAM_ID?: string;
}

const TOKEN_LIFETIME_SECONDS = 60 * 60;

const textEncoder = new TextEncoder();

const base64UrlEncode = (input: string | Uint8Array): string => {
  const bytes = typeof input === "string" ? textEncoder.encode(input) : input;
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCodePoint(byte);
  }

  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
};

const pemToPkcs8 = (pem: string): ArrayBuffer => {
  const normalised = pem
    .replaceAll("-----BEGIN PRIVATE KEY-----", "")
    .replaceAll("-----END PRIVATE KEY-----", "")
    .replaceAll(/\s/gu, "");
  const binary = atob(normalised);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.codePointAt(index) ?? 0;
  }

  return bytes.buffer;
};

const importSigningKey = async (
  privateKeyPem: string
): Promise<CryptoKey | null> => {
  try {
    return await crypto.subtle.importKey(
      "pkcs8",
      pemToPkcs8(privateKeyPem),
      { name: "ECDSA", namedCurve: "P-256" },
      false,
      ["sign"]
    );
  } catch {
    return null;
  }
};

export const createAppleMusicDeveloperToken = async (
  env: AppleMusicSigningEnv
): Promise<string | null> => {
  const teamId = env.APPLE_MUSIC_TEAM_ID?.trim();
  const keyId = env.APPLE_MUSIC_KEY_ID?.trim();
  const privateKeyPem = env.APPLE_MUSIC_PRIVATE_KEY?.trim();

  if (!teamId || !keyId || !privateKeyPem) {
    return null;
  }

  const key = await importSigningKey(privateKeyPem);
  if (!key) {
    return null;
  }

  const issuedAt = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: "ES256", kid: keyId }));
  const payload = base64UrlEncode(
    JSON.stringify({
      exp: issuedAt + TOKEN_LIFETIME_SECONDS,
      iat: issuedAt,
      iss: teamId,
    })
  );
  const unsigned = `${header}.${payload}`;
  const signature = await crypto.subtle.sign(
    { hash: "SHA-256", name: "ECDSA" },
    key,
    textEncoder.encode(unsigned)
  );
  const signatureBytes = es256SignatureToRaw(new Uint8Array(signature));
  if (!signatureBytes) {
    return null;
  }

  return `${unsigned}.${base64UrlEncode(signatureBytes)}`;
};

const trimLeadingZeroes = (bytes: Uint8Array): Uint8Array => {
  let start = 0;
  while (start < bytes.length - 1 && bytes[start] === 0) {
    start += 1;
  }

  return bytes.slice(start);
};

const readDerByte = (
  der: Uint8Array,
  offset: number
): { offset: number; value: number } => ({
  offset: offset + 1,
  value: der[offset] ?? 0,
});

const derEcdsaSignatureToRaw = (der: Uint8Array): Uint8Array | null => {
  let offset = 0;
  const { offset: afterSequenceTag, value: sequenceTag } = readDerByte(
    der,
    offset
  );
  offset = afterSequenceTag;
  if (sequenceTag !== 0x30) {
    return null;
  }

  const { offset: afterSequenceLength, value: sequenceLength } = readDerByte(
    der,
    offset
  );
  offset = afterSequenceLength;
  if (sequenceLength + 2 !== der.length) {
    return null;
  }

  const { offset: afterIntegerTagR, value: integerTagR } = readDerByte(
    der,
    offset
  );
  offset = afterIntegerTagR;
  if (integerTagR !== 0x02) {
    return null;
  }

  const { offset: afterRLength, value: rLength } = readDerByte(der, offset);
  offset = afterRLength;
  const r = trimLeadingZeroes(der.slice(offset, offset + rLength));
  offset += rLength;

  const { offset: afterIntegerTagS, value: integerTagS } = readDerByte(
    der,
    offset
  );
  offset = afterIntegerTagS;
  if (integerTagS !== 0x02) {
    return null;
  }

  const { offset: afterSLength, value: sLength } = readDerByte(der, offset);
  offset = afterSLength;
  const s = trimLeadingZeroes(der.slice(offset, offset + sLength));

  const raw = new Uint8Array(64);
  raw.set(r, 32 - r.length);
  raw.set(s, 64 - s.length);
  return raw;
};

const es256SignatureToRaw = (signature: Uint8Array): Uint8Array | null => {
  if (signature.length === 64) {
    return signature;
  }

  return derEcdsaSignatureToRaw(signature);
};
