import {User} from "../../domain/model/entities/user.entity.js";

export class UserAssembler {
    static toEntityFromResource(resource) {
        return new User({
            id: resource.id,
            firstName: resource.firstName,
            lastName: resource.lastName,
            email: resource.email,
            role: resource.role,
            specialty: resource.specialty,
            token: resource.token
        });
    }
}