import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken';
import { inject, injectable } from "tsyringe";
import { AppError } from '../../../../errors/appError';


import { IUsersRepository } from "../../repositories/IUsersRepository";



interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }


    async execute({ email, password }: IRequest): Promise<IResponse> {
        // se usuario existe


        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect")
        }

        // se a senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect")
        }

        // gerar jsonwebtoken

        const token = sign({}, "d9a4a8f06bf40eb1c73668480aa593b4a1723dec", {
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn

    }
}

export { AuthenticateUserUseCase }