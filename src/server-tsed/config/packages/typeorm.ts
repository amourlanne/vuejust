import { ConnectionOptions } from 'typeorm';

export default <ConnectionOptions> {
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: "vuejust",
  password: "vuejust",
  database: "database",
  synchronize: false,
  logging: false,
  entities: [
    "src/entity/**/*.ts"
  ],
  migrations: [
    "src/migrations/**/*.ts"
  ],
  subscribers: [
    "src/subscribers/**/*.ts"
  ]
}
