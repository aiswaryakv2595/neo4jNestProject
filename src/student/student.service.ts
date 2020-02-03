import { Injectable, Inject } from '@nestjs/common';
import * as v1 from 'neo4j-driver';
@Injectable()
export class StudentService {
    constructor(@Inject('Neo4j') private readonly neo4j: v1.Driver) {}

    async findStudent(): Promise<any> {
   let data=[];
           const session = this.neo4j.session();
                return session.run('MATCH (n:student) RETURN n')
                .then(result => {
                    session.close();
                    result.records.map(value => {
                      const node = value.get(0);
                      data.push({
                        name:node.properties.name,
                        email:node.properties.email,
                        password:node.properties.password
                      });
                    });
                    //driver.close();
                        return data;
                      })
        }
        async findStudentId(id:string){
            let data = [];
    const session = this.neo4j.session();
        return session.run(`MATCH (n:student) WHERE id(n)=${id} RETURN n`)
        .then(result => {
            session.close();
            result.records.map(value => {
              const node = value.get(0);
              data.push({
                name:node.properties.name,
                email:node.properties.email,
                password:node.properties.password,
                place:node.properties.place
              });
            });
            //driver.close();
                return data;
              })
     }
    
     async insertStudent(name:string,email:string,password:string){
       
            const session = this.neo4j.session();
            const result = await session.run(`MATCH (n:student) MERGE(p:student {name:{nameParam},email:{emailParam},
            password:{passParam}}) RETURN p`,{nameParam:name,emailParam:email, passParam:password});
            session.close();
			return result.records;
        }

        async updateStudent(id:string,name:string,email:string,password:string){
          if(name){
      const session = this.neo4j.session();
        const result = await session.run(`MATCH (n:student) WHERE id(n)=${id} SET n.name={nameParam} RETURN n`, { nameParam: name });
        session.close();
        return result.records;
       }
       if(email){
        const session = this.neo4j.session();
          const result = await session.run(`MATCH (n:student) WHERE id(n)=${id} SET n.email={emailParam} RETURN n`, { emailParam: email });
          session.close();
          return result.records;
         } 
      if(password){
        const session = this.neo4j.session();
        const result = await session.run(`MATCH (n:student) WHERE id(n)=${id} SET n.password={passwordParam} RETURN n`, { passwordParam: password });
        session.close();
        return result.records;
           } 
          }
          
async deleteStudent(id:string){
  const session = this.neo4j.session();
  const result = await session.run(`MATCH (n:student) WHERE id(n)=${id} DELETE n`);
  session.close();
  return result.records;
     }	
         
}
