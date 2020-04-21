import { Model } from "@nozbe/watermelondb";
import { field, action } from "@nozbe/watermelondb/decorators";

export default class Note extends Model {
    static table = "notes";

    @field("body") body;

    @field("date") date;

    @action async deleteNote() {
        await this.markAsDeleted();
        await this.destroyPermanently();
    }
}
