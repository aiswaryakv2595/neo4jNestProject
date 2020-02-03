import { Injectable, Inject } from '@nestjs/common';
import * as v1 from 'neo4j-driver';
@Injectable()
export class Neo4jService {
    constructor(@Inject('Neo4j') private readonly neo4j: v1.Driver) {}
async findAll(): Promise<any> {
	let data = [];
//return this.neo4j.session().run('MATCH (n:school) RETURN n');
   const session = this.neo4j.session();
   return session.run('MATCH (n:school) RETURN n')
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

	async findOne(id:string){
		let data = [];
const session = this.neo4j.session();
	return session.run(`MATCH (n:school) WHERE id(n)=${id} RETURN n`)
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

 async insertSchool(name:string,email:string,password:string,place:string){
	let data = [];
		const session = this.neo4j.session();
		return session.run(`MATCH (n:school) MERGE(p:school {name:{nameParam},email:{emailParam},
		password:{passParam},place:{placeParam}}) RETURN p`,{nameParam:name,emailParam:email, passParam:password,placeParam:place})
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
	async updateSchool(id:string,name:string,email:string,password:string,place:string){
        if(name){
		const session = this.neo4j.session();
			const result = await session.run(`MATCH (n:school) WHERE id(n)=${id} SET n.name={nameParam} RETURN n`, { nameParam: name });
			session.close();
			return result.records;
		 }
		 if(email){
			const session = this.neo4j.session();
				const result = await session.run(`MATCH (n:school) WHERE id(n)=${id} SET n.email={emailParam} RETURN n`, { emailParam: email });
				session.close();
				return result.records;
			 } 
		if(password){
			const session = this.neo4j.session();
			const result = await session.run(`MATCH (n:school) WHERE id(n)=${id} SET n.password={passwordParam} RETURN n`, { passwordParam: password });
			session.close();
			return result.records;
				 } 
			if(place){
			const session = this.neo4j.session();
			const result = await session.run(`MATCH (n:school) WHERE id(n)=${id} SET n.place={placeParam} RETURN n`, { placeParam: place });
			session.close();
			return result.records;
		 } 
	}
	async deleteSchool(id:string){
		const session = this.neo4j.session();
		const result = await session.run(`MATCH (n:school) WHERE id(n)=${id} DELETE n`);
		session.close();
		return result.records;
    }	
 
	async insertRelation(name:string,sname:string,relation:string){
       
		const session = this.neo4j.session();
		const result = await session.run(`MATCH (a:school{name:{nameParam}}),
		(b:student{name:{namesParam}}) MERGE(a)-[r:${relation}]-(b) RETURN a,b`,{nameParam:name,namesParam:sname});
		session.close();
		return result.records;
	}
}
