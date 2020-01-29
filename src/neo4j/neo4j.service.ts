import { Injectable, Inject } from '@nestjs/common';
import * as v1 from 'neo4j-driver';
@Injectable()
export class Neo4jService {
    constructor(@Inject('Neo4j') private readonly neo4j: v1.Driver) {}
async findAll(): Promise<any> {
   
//return this.neo4j.session().run('MATCH (n:school) RETURN n');
   const session = this.neo4j.session();
		return session.run('MATCH (n:school) RETURN n').then(result => {
			session.close();
			return result.records;
		});
}

	async findOne(id:string){
const session = this.neo4j.session();
	const result = await session.run(`MATCH (n:school) WHERE id(n)=${id} RETURN n`);
	session.close();
	return result.records;
 }

 async insertProduct(name:string,email:string,password:string,place:string){
        // const prodId=Math.random().toString();
        // const newProduct=new Product(prodId,title,desc,price);
        // this.products.push(newProduct);
		// return prodId;
		const session = this.neo4j.session();
		const result = await session.run(`MATCH (n:school) MERGE(p:school {name:{nameParam},email:{emailParam},
		password:{passParam},place:{placeParam}}) RETURN p`,{nameParam:name,emailParam:email, passParam:password,placeParam:place});
	 session.close();
	 return result.records;
	}
	async updateProduct(id:string,name:string,email:string,password:string,place:string){
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
	async deleteProduct(id:string){
		const session = this.neo4j.session();
		const result = await session.run(`MATCH (n:school) WHERE id(n)=${id} DELETE n`);
		session.close();
		return result.records;
    }	
 
}
