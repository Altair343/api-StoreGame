# Api del proyecto StoreGame

[Dashboard](https://github.com/Altair343/dashboard-StoreGame)

[App](https://github.com/Altair343/app-StoreGame)

#### Instalación
Instalamos los módulos
```bash
npm install
```
Renombramos el archivo .env.example a .env.
Dentro del archivo . env, ponemos las url y keys de los diferentes servicios que se utilizaran. 

Escribimos la url local u online de la base de datos Nosql
```javascript
MONGODB_URI = 
```
Escribimos las credenciales para la conexión a cloudinary
```javascript
CLUD_NAME = 
CLUD_KEY = 
CLUD_SECRET = 
```
Escribimos la palabra secreta para codificar con JSON Web Tokens
```javascript
JSON_SECRET = 
``` 
Escribimos la secret Key que nos proporciona stripe
```javascript
STRIPE_SECRET =
``` 

Para ejecutar el servidor en un entorno de pruebas local
```bash
npm run dev
```

Para ejecutar el servidor en un entorno de producción
```bash
npm run build
```
y 
```bash
npm run start
```
