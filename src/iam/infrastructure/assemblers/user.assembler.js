import {User} from "../../domain/model/entities/user.entity.js";

export class UserAssembler {
    static toEntityFromResource(resource) {
        return new User({...resource});
    }
    static toEntitiesFromResponse(response) {
        let resources = response.data instanceof Array ? response.data : response.data['users'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}