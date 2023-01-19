import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { create } from 'domain';
import { CreatePetDto } from './dto/createPet.dto';
import { Pet } from './entities/pet.entity';
import { PetsService } from './pets.service';

@Controller('pets')
@ApiTags('pets')
export class PetsController {
    constructor(private readonly petsService: PetsService) {}

    // POST - add dog
    @Post()
    @ApiOperation({ summary: "Create a Pet" })
    @ApiCreatedResponse({
        description: "The Pet created succesfully",
        type: Pet
    })
    createPet(
        @Body() createPetDto: CreatePetDto
    ): Pet {
        return this.petsService.insertPet(createPetDto);
    }

    // GET - get all dogs
    @Get()
    @ApiOperation({ summary: "Get all Pets" })
    @ApiCreatedResponse({
        status: 200,
        description: "OK",
    })
    getAllPets(): Pet[] {
        return this.petsService.getPets();
    }

    // GET - get dog
    @Get(':id')
    @ApiOperation({ summary: "Get a single Pet" })
    @ApiCreatedResponse({
        status: 200,
        description: "OK",
    })
    @ApiCreatedResponse({
        status: 404,
        description: "Pet id not found",
    })
    getPet(@Param('id') id: string): Pet {
        return this.petsService.getSinglePet(id);
    }

    // PATCH - update dog
    @Patch(':id')
    @ApiOperation({ summary: "Update Pet's data" })
    @ApiCreatedResponse({
        status: 200,
        description: "OK",
    })
    @ApiCreatedResponse({
        status: 404,
        description: "Pet id not found",
    })
    updatePet(
        @Param('id') id: string,
        @Body() createPetDto: CreatePetDto
    ): any {
        return this.petsService.updateSinglePet(id, createPetDto);
    }

    // DELETE - delete dog
    @Delete(':id')
    @ApiOperation({ summary: "Delete a single Pet" })
    @ApiCreatedResponse({
        status: 200,
        description: "OK",
    })
    @ApiCreatedResponse({
        status: 404,
        description: "Pet id not found",
    })
    DeletePet(@Param('id') id: string): any {
        return this.petsService.deleteSinglePet(id);
    }

}
