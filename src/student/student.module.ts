import { Module } from '@nestjs/common';
import {StudentController} from './student.controller';
import {StudentService} from './student.service';
import * as neo4j from 'neo4j-driver';
export const neo4jProvider = {
 provide: 'Neo4j',
 useFactory: () => neo4j.driver('bolt://localhost',neo4j.auth.basic('neo4j','123456'))
};
@Module({
    exports: ['Neo4j'],
    imports: [],
    controllers: [StudentController],
    providers: [ StudentService,neo4jProvider]
})
export class StudentModule {}
