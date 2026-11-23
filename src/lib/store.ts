import { ObjectId } from "mongodb";
import { getDb, isMongoConfigured } from "./mongodb";
import {
  DEFAULT_CONTENT,
  DEFAULT_NEWS,
  DEFAULT_SERVICES,
  DEFAULT_SETTINGS,
  DEFAULT_STATS,
  DEFAULT_TEAM,
  NewsItem,
  ServiceItem,
  Settings,
  SiteContent,
  StatItem,
  TeamMember,
} from "./content";

const COLLECTION = "content";

type StoredDoc = {
  _id?: ObjectId;
  type: "settings" | "stat" | "service" | "team" | "news";
  order?: number;
  data?: Record<string, unknown>;
};

async function seedIfEmpty() {
  const db = await getDb();
  const col = db.collection<StoredDoc>(COLLECTION);
  const count = await col.estimatedDocumentCount();
  if (count > 0) return;
  const docs: StoredDoc[] = [
    { type: "settings", data: DEFAULT_SETTINGS as unknown as Record<string, unknown> },
    ...DEFAULT_STATS.map((s) => ({ type: "stat" as const, order: s.order, data: { ...s } })),
    ...DEFAULT_SERVICES.map((s) => ({ type: "service" as const, order: s.order, data: { ...s } })),
    ...DEFAULT_TEAM.map((t) => ({ type: "team" as const, order: t.order, data: { ...t } })),
    ...DEFAULT_NEWS.map((n) => ({ type: "news" as const, order: n.order, data: { ...n } })),
  ];
  await col.insertMany(docs);
}

function compose(docs: StoredDoc[]): SiteContent {
  const settingsDoc = docs.find((d) => d.type === "settings");
  const settings = (settingsDoc?.data as unknown as Settings) || DEFAULT_SETTINGS;
  const pick = <T extends { id: string; order: number }>(type: string, fallback: T[]): T[] => {
    const items = docs
      .filter((d) => d.type === type)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((d) => ({ ...(d.data as Record<string, unknown>), id: String(d._id) }) as unknown as T);
    return items.length > 0 ? items : fallback;
  };
  return {
    settings,
    stats: pick<StatItem>("stat", DEFAULT_STATS),
    services: pick<ServiceItem>("service", DEFAULT_SERVICES),
    team: pick<TeamMember>("team", DEFAULT_TEAM),
    news: pick<NewsItem>("news", DEFAULT_NEWS),
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!isMongoConfigured()) return DEFAULT_CONTENT;
  try {
    await seedIfEmpty();
    const db = await getDb();
    const docs = await db.collection<StoredDoc>(COLLECTION).find({}).toArray();
    if (docs.length === 0) return DEFAULT_CONTENT;
    return compose(docs);
  } catch (err) {
    console.error("Failed to load content from DB, falling back to defaults", err);
    return DEFAULT_CONTENT;
  }
}

export async function saveSettings(settings: Settings) {
  const db = await getDb();
  await db.collection<StoredDoc>(COLLECTION).updateOne(
    { type: "settings" },
    { $set: { type: "settings", data: settings as unknown as Record<string, unknown> } },
    { upsert: true }
  );
}

export async function createItem(type: string, data: Record<string, unknown>, order: number) {
  const db = await getDb();
  const result = await db.collection<StoredDoc>(COLLECTION).insertOne({ type: type as StoredDoc["type"], order, data });
  return String(result.insertedId);
}

export async function updateItem(id: string, data: Record<string, unknown>, order: number) {
  const db = await getDb();
  await db.collection<StoredDoc>(COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: { data, order } });
}

export async function deleteItem(id: string) {
  const db = await getDb();
  await db.collection<StoredDoc>(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}
