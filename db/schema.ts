import {sqliteTable,text,integer} from "drizzle-orm/sqlite-core";
export const scholarships=sqliteTable("scholarships",{id:text("id").primaryKey(),data:text("data").notNull(),version:integer("version").notNull().default(1),updatedAt:text("updated_at").notNull()});
export const activity=sqliteTable("activity",{id:text("id").primaryKey(),projectId:text("project_id").notNull(),message:text("message").notNull(),source:text("source").notNull(),createdAt:text("created_at").notNull()});
export const workspaceMeta=sqliteTable("workspace_meta",{key:text("key").primaryKey(),value:text("value").notNull()});
