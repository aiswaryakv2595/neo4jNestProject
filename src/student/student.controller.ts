import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor (private readonly studentService: StudentService){}

    @Get()
 async findStudent() {
 console.log('retriving nodes as per given query in findAll() method.');
//return ‘Get all Node Labels’;
 return this.studentService.findStudent();
 }

 @Get(':id')
 findStudentId(@Param('id') id:string){
    console.log('get by id');
     return this.studentService.findStudentId(id);
 }

 @Post()
    addStudent(@Body('name') name:string,@Body('email') email:string,@Body('password') password:string){
       return this.studentService.insertStudent(name,email,password);
    }

    @Patch(':id')
    updateStudent(@Param('id') id:string,@Body('name') name:string,@Body('email') email:string,@Body('password') password:string){
       return this.studentService.updateStudent(id,name,email,password);
       
    }
   @Delete(':id')
    removeStudent(@Param('id') id:string){
   return this.studentService.deleteStudent(id);
    }
}
