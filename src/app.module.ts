import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jController } from './neo4j/neo4j.controller';
import { Neo4jService } from './neo4j/neo4j.service';
import { Neo4jModule } from './neo4j/neo4j.module';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { StudentModule } from './student/student.module';



@Module({
  
  imports: [Neo4jModule, StudentModule],
  controllers: [AppController, Neo4jController, StudentController],
  providers: [AppService, Neo4jService, StudentService],
})
export class AppModule {}
