export class Address {
    id: number;
    town: string;
    country: string;
    road: string;
    number: number;

    constructor() {
        this.id = 0;
        this.town = '';
        this.country = '';
        this.road = '';
        this.number = 0;
    }
}

export class Paso {
    id: number;
    un_number: number;
    created_at: Date;
    end_at: Date;

    constructor() {
        this.id = 0;
        this.un_number = 0;
        this.created_at = new Date();
        this.end_at = new Date();
    }
}

export class User {
    [key: string]: any;
    
    id: number;
    created_at: Date;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    email: string;
    paso: Paso;
    gender: string;
    user_type: string;
    student_type: string;
    university: string;
    appartment: string;
    address: Address;
    phone: string;
    url: string;

    constructor() {
        this.id = 0;
        this.created_at = new Date();
        this.first_name = '';
        this.last_name = '';
        this.username = '';
        this.password = '';
        this.email = '';
        this.paso = new Paso();
        this.gender = '';
        this.user_type = '';
        this.student_type = '';
        this.university = '';
        this.appartment = '';
        this.address = new Address();
        this.phone = '';
        this.url = '';
    }
}

export class ProfileUser {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    email: string;
    paso: Paso;
    gender: string;
    user_type: string;
    student_type: string;
    university: string;
    appartment: string;
    address: Address;
    phone: string;
    url: string;

    constructor() {
        this.first_name = '';
        this.last_name = '';
        this.username = '';
        this.password = '';
        this.email = '';
        this.paso = new Paso();
        this.gender = '';
        this.user_type = '';
        this.student_type = '';
        this.university = '';
        this.appartment = '';
        this.address = new Address();
        this.phone = '';
        this.url = '';
    }
}


export function createUserProfile(user: User): ProfileUser {
    // Create a new ProfileUser object and copy the relevant fields from the User object
    const profileUser: ProfileUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        password: user.password,
        email: user.email,
        paso: user.paso,
        gender: user.gender,
        user_type: user.user_type,
        student_type: user.student_type,
        university: user.university,
        appartment: user.appartment,
        address: user.address,
        phone: user.phone,
        url: user.url,
    };
    return profileUser;
}


export function profileUserToUser(user: User,p : ProfileUser): User {
    user.first_name = p.first_name;
    user.last_name = p.last_name;
    user.username = p.username;
    user.password = p.password;
    user.email = p.email;
    user.paso = p.paso;
    user.gender = p.gender;
    user.user_type = p.user_type;
    user.student_type = p.student_type;
    user.university = p.university;
    user.appartment = p.appartment;
    user.address = p.address;
    user.phone = p.phone;
    user.url = p.url;

    return user;
}

export default User
