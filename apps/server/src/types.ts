export type ID = string;

export type SignalKind = 'signal' | 'ask' | 'swap' | 'event';

export type PostScope = 'cell' | 'circle';

export interface Signal {
  id: ID;
  author_id: ID;
  scope: PostScope;
  cell_id?: ID;
  circle_id?: ID;
  kind: SignalKind;
  caption?: string;
  media_url?: string | null;
  tags: string[];
  expires_at: string; // ISO
  created_at: string; // ISO
}

export type AskStatus = 'OPEN' | 'CLAIMED' | 'DONE';

export interface Ask {
  id: ID;
  author_id: ID;
  cell_id?: ID;
  circle_id?: ID;
  title: string;
  body?: string;
  tags: string[];
  status: AskStatus;
  created_at: string;
  closed_at?: string | null;
  claimer_id?: ID | null;
}

export interface Event {
  id: ID;
  title: string;
  starts_at: string;
  ends_at: string;
  location_hint?: string | null;
}

export interface Bulletin {
  id: ID;
  title: string;
  body_md: string;
  pinned: boolean;
  created_at: string;
}

export type FeedItem =
  | { type: 'signal'; data: Signal }
  | { type: 'ask'; data: Ask }
  | { type: 'event'; data: Event }
  | { type: 'bulletin'; data: Bulletin };

