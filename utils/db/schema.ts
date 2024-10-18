import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  stripeCustomerId: text("stripe_customer_id").unique(),
  name: text("name"),
  email: text("email").notNull().unique(),
  points: integer("points").default(50),
  createdAt: timestamp("created_at").default(new Date()),
});

export const Subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  stripeSubscriptionId: varchar("stripe_subscription_id", {
    length: 255,
  }).notNull(),
  plan: varchar("plan", { length: 50 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  currentPeriodStart: timestamp("current_period_start").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  cancelPeriodEnd: boolean("cancel_period_end").notNull().default(false),
});

export const GeneratedContent = pgTable("generated_content", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  content: text("content").notNull(),
  prompt: text("prompt").notNull(),
  contentType: varchar("content_type", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
