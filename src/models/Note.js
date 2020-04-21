import { Model } from "@nozbe/watermelondb";
import { field, date, children, action } from "@nozbe/watermelondb/decorators";

export default class Movie extends Model {
    static table = "notes";

    @field("body") body;

    @date("inserted_at") insertedAt;

    @children("reviews") reviews;

    @action async deleteNote() {
        await this.markAsDeleted();
        await this.destroyPermanently();
    }
}
