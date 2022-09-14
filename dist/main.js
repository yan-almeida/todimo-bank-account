"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/exception-filters/http.exception-filter");
const timeout_interceptor_1 = require("./common/interceptors/timeout.interceptor");
const int_pipe_1 = require("./common/pipes/int.pipe");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Web API - Todimo')
        .setDescription('API responsável: Todimo')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }), new int_pipe_1.IntPipe());
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)), new timeout_interceptor_1.TimeoutInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    await app.listen(3000);
    const url = await app.getUrl();
    common_1.Logger.debug(`Swagger application is running on: ${url}/swagger`);
}
bootstrap();
//# sourceMappingURL=main.js.map