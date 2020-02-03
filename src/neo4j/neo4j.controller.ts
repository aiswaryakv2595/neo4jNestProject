import { Controller, Get, Param, Body, Post, Patch, Delete } from '@nestjs/common';
import {Neo4jService} from './neo4j.service';

@Controller('neo4j')
export class Neo4jController {
    constructor (private readonly retriveNodes: Neo4jService){}
@Get()
 async findAll() {
 console.log('retriving nodes as per given query in findAll() method.');
//return ‘Get all Node Labels’;
 return this.retriveNodes.findAll();
 }
 @Get(':id')
 findOne(@Param('id') id:string){
    console.log('get by id');
     return this.retriveNodes.findOne(id);
 }

 @Post()
    addSchool(@Body('name') name:string,@Body('email') email:string,@Body('password') password:string,@Body('place') place:string){
       return this.retriveNodes.insertSchool(name,email,password,place);
    }

    @Patch(':id')
    updateSchool(@Param('id') id:string,@Body('name') name:string,@Body('email') email:string,@Body('password') password:string,@Body('place') place:string){
       return this.retriveNodes.updateSchool(id,name,email,password,place);
       
    }
    @Delete(':id')
    removeSchool(@Param('id') id:string){
   return this.retriveNodes.deleteSchool(id);
    }

    @Post('relation')
    addRelation(@Body('name') name:string,@Body('names') sname:string,@Body('relation') relation:string){
       return this.retriveNodes.insertRelation(name,sname,relation);
    }
}
