import {
    ISpecificationsRepository,
    ICreateSpecificationDTO
} from '../ISpecificationsRepository'

import { Specification } from '../../entities/Specification'
import { getRepository, Repository } from 'typeorm';

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification)
    }



    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        // const specification = new Specification();

        // Object.assign(specification, {
        //     name,
        //     description,
        //     created_at: new Date()
        // })

        // this.specifications.push(specification)

        const specification = this.repository.create({
            name, description
        });

        await this.repository.save(specification)
    }

    async findByName(name: string): Promise<Specification> {
        // const specification = await this.specifications.find(
        //     (specification) => specification.name === name
        // );
        const specification = this.repository.findOne({ name })

        return specification;
    }

}

export { SpecificationsRepository }

