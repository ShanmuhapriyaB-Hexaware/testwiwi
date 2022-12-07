import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WinstonModule } from "nest-winston";
import { format, transports } from "winston";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./middlewares/logger.middleware";
import { MenuModule } from "./modules/menu.module";
import { Menu } from "./entities/menu.entity";
import { RestaurantModule } from "./modules/restaurant.module";
import { Restaurant } from "./entities/restaurant.entity";

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] : ${message}`;
});

const entities = [Menu, Restaurant];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        url: config.get<string>('DB_CONNECTION_STRING'),
        entities,
        synchronize: true
      })
    }),
    WinstonModule.forRoot({
      level: "info",
      format: combine(label({ label: "right now!" }), timestamp(), myFormat),
      transports: [
        new transports.File({
          filename: "logs/debug.log",
          level: "debug",
        }),
      ],
    }),
        MenuModule,
        RestaurantModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
