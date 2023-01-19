import { Injectable, NotFoundException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { CreatePetDto } from './dto/createPet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
    // In-memmory db for Pets
    pets: Pet[] = [];

    insertPet(pet: CreatePetDto): Pet {
        const id = nanoid();
        const newPet = new Pet(id, pet.name, pet.description, pet.dateOfBirth);
        this.pets.push(newPet);
        // If no nanoid
        //this.pets[id] = new_pet;
        return newPet;
    }

    getPets(): Pet[] {
        return [...this.pets];
    }

    getSinglePet(id: string): Pet {
        const idx = this.pets.findIndex((item) => item.petId == id);
        if (idx < 0) {
            throw new NotFoundException('Could not found matchin id');
        }
        return { ...this.pets[idx] };
    }

    updateSinglePet(id: string, createPetDto: CreatePetDto) {
        const idx = this.pets.findIndex((item) => item.petId == id);
        const newPet = new Pet(id, createPetDto.name, createPetDto.description, createPetDto.dateOfBirth);
        if (idx < 0) {
            throw new NotFoundException('Could not found matchin id');
        }
        else this.pets[idx] = newPet;
        return [...this.pets];
    }

    deleteSinglePet(id: string) {
        const idx = this.pets.findIndex((item) => item.petId == id);
        if (idx < 0) {
            throw new NotFoundException('Could not found matchin id');
        }
        else this.pets.splice(idx, 1);
        return [...this.pets];
    }


}
