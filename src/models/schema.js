import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
    version: 3,
    tables: [
        tableSchema({
            name: "notes",
            columns: [
                { name: "body", type: "string" },
                { name: "date", type: "string" }
            ]
        })
    ]
});
