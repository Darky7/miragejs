import { createServer, Model, hasMany, belongsTo } from "miragejs";

export default function () {
  createServer({
    models: {
      user: Model.extend({
        company: belongsTo()
      }),
      company: Model.extend({
        users: hasMany()
      })
    },
    seeds(server) {
      let capgeminiGenre = server.create("company", { name: "Capgemini" });
      let germinalGenre = server.create("company", { name: "Germinal" });
      let altranCompany = server.create("company", { name: "Altran" });

      server.create("user", { name: "John Does" });
      server.create("user", { name: "John Doe" });
      server.create("user", { name: "John Deo" });
      server.create("user", { name: "Jon Doex" });

      server.create("user", { name: "John Doe Capgemini", company: capgeminiGenre });
      server.create("user", { name: "John Doe Germinal", company: germinalGenre });
      server.create("user", { name: "John Doe Altran", company: altranCompany });
    },
    routes() {
      this.get("/api/users", (schema) => {
        console.log(schema.users.all());
        return schema.users.all();
      });
      this.post("/api/add_user", (schema, request) => {
        let body = JSON.parse(request.requestBody);
        return schema.users.create(body);
      });
      this.delete("/api/user/:id", (schema, request) => {
        let id = request.params.id;
        return schema.users.find(id).destroy();
      });
      this.get("/api/companies", (schema) => {
        return schema.companies.all();
      });

      this.get("/api/company/:id/users", (schema, request) => {
        let companyId = request.params.id;
        return schema.companies.find(companyId).users;
      });
    }
  });
}
