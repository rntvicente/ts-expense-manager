export interface Hasher {
  hash(plaintext: string): Promise<string>;
  compare(plaintext: string, encrypted: string): Promise<boolean>;
}
