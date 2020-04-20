import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
    version: 2,
    tables: [
        tableSchema({
            name: "notes",
            columns: [
                { name: "body", type: "string" },
                { name: "inserted_at", type: "number" }
            ]
        })
    ]
});
