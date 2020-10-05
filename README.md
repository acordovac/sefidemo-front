# OpenStreeMap / OpenLayers / Nominatim Search map Demo


App hecha con angular para  realizar diferentes demos de funcionalidad.
El más importante es integrar el servicio de mapas OSM con el API de búsqueda abierta Nominatim,
utilizando la librería y types de OL, aunque incluye un demo no funcional para un CRUD. 
Requiere un back con los endpoints demo.    

## Funcionalidad

El demo incluye una página de documentación donde incluye más detalles de la implementación 
y un ejemplo de esta en una ventana emergente.

Al abrir este ejemplo el usuario puede navegar el mapa, que por defecto se centra en las coordenadas
del CRUM. Podrá agregar un marcador dando clic en la ubicación deseada, la áplicación provee maneras
de copiar solo las coordenadas, copiar un link de Google Maps para abrir la ubicación en una nueva ventana,
o simplemente usar el link generado.

También puede buscar ubicaciones en un campo de texto, tras lo cuál el servicio presentará opciones compatibles.

La API de búsqueda funciona mejor si se delimita mediante comas, de la siguiente manera:

```
xalapa, juan de la luz enriquez
```
```
coatepec, iglesia
```
```
xalapa, 91050
```
Tras seleccionar una de las opciones, el mapa colocará el marcador y centrará la ubicación, además de
las opciones antes mencionadas.


## Dependencias

* 	[Angular 10](https://angular.io/) - Framework de desarrollo para frontend
* 	[OpenStreetMap](https://www.openstreetmap.org/) - Mapa del mundo de uso libre 
* 	[OpenLayers](https://www.openstreetmap.org/) - Librería dinámica y abierta basada en capas para Mapas 
* 	[Nominatim Search](https://nominatim.org//) - Librería para geo-codificación libre, para búsquedas por nombre o coordenadas 
* 	[Material Angular](https://nominatim.org//) - Componentes de angular basados en Material Design 


## Herramientas externas usadas

* 	Ninguna

## To-Do

* 	[x] Permitir múltiples marcadores
* 	[x] Permitir búsqueda por parámetros elegidos por el usuario 

## Cómo correr la aplicación



* [Clone](https://github.com/acordovac/sefidemo-front) - Clonar el repositorio de github 
* Desde línea de comandos bajar las dependencias de angular

```
npm install
```

* Levantar el servidor localmente con el comando
```
ng serve [--open]
```
* Alternativamente, puede levantarse el servidor usando el administrador de paquetes angular pasando el script `start` del archivo `package.json`

```
npm run start
```
## Dentro de la aplicación

Desde el menú principal, haga clic en la opción `DEMO OpenStreetMaps`


### Web Page URLs

|  URL     |  Método HTTP | Disponible |
|----------|--------------|--------------|
|`http://localhost:8080/location` | GET | Sí |


###Package structure

## Files and Directories

```
.
├── angular.json
├── e2e
│   ├── protractor.conf.js
│   ├── src
│   │   ├── app.e2e-spec.ts
│   │   └── app.po.ts
│   └── tsconfig.json
├── karma.conf.js
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── core
│   │   │   ├── services
│   │   │   │   ├── auth
│   │   │   │   │   ├── auth-interceptor.service.spec.ts
│   │   │   │   │   ├── auth-interceptor.service.ts
│   │   │   │   │   ├── auth.service.spec.ts
│   │   │   │   │   └── auth.service.ts
│   │   │   │   ├── nominatim-osm
│   │   │   │   │   ├── nominatim-osm.service.spec.ts
│   │   │   │   │   └── nominatim-osm.service.ts
│   │   │   │   ├── token-storage
│   │   │   │   │   ├── token-storage.service.spec.ts
│   │   │   │   │   └── token-storage.service.ts
│   │   │   │   └── user
│   │   │   │       ├── user.service.spec.ts
│   │   │   │       └── user.service.ts
│   │   │   └── utils
│   │   │       └── user-utils.ts
│   │   ├── modules
│   │   │   ├── admin
│   │   │   │   ├── admin.component.css
│   │   │   │   ├── admin.component.html
│   │   │   │   ├── admin.component.spec.ts
│   │   │   │   ├── admin.component.ts
│   │   │   │   ├── admin.module.ts
│   │   │   │   ├── admin-routing.module.js
│   │   │   │   └── admin-routing.module.ts
│   │   │   ├── home
│   │   │   │   ├── home.component.css
│   │   │   │   ├── home.component.html
│   │   │   │   ├── home.component.spec.ts
│   │   │   │   └── home.component.ts
│   │   │   ├── osm-map
│   │   │   │   └── map-doc
│   │   │   │       ├── map-doc.component.css
│   │   │   │       ├── map-doc.component.html
│   │   │   │       ├── map-doc.component.spec.ts
│   │   │   │       └── map-doc.component.ts
│   │   │   └── user
│   │   │       ├── create-user
│   │   │       │   ├── create-user.component.css
│   │   │       │   ├── create-user.component.html
│   │   │       │   ├── create-user.component.spec.ts
│   │   │       │   └── create-user.component.ts
│   │   │       ├── edit-user
│   │   │       │   ├── edit-user.component.css
│   │   │       │   ├── edit-user.component.html
│   │   │       │   ├── edit-user.component.spec.ts
│   │   │       │   └── edit-user.component.ts
│   │   │       └── list-user
│   │   │           ├── list-user.component.css
│   │   │           ├── list-user.component.html
│   │   │           ├── list-user.component.spec.ts
│   │   │           └── list-user.component.ts
│   │   └── shared
│   │       ├── components
│   │       │   ├── confirm-dialog
│   │       │   │   ├── confirm-dialog.component.css
│   │       │   │   ├── confirm-dialog.component.html
│   │       │   │   ├── confirm-dialog.component.spec.ts
│   │       │   │   └── confirm-dialog.component.ts
│   │       │   ├── footer
│   │       │   │   ├── footer.component.css
│   │       │   │   ├── footer.component.html
│   │       │   │   ├── footer.component.spec.ts
│   │       │   │   └── footer.component.ts
│   │       │   ├── header
│   │       │   │   ├── header.component.css
│   │       │   │   ├── header.component.html
│   │       │   │   ├── header.component.spec.ts
│   │       │   │   └── header.component.ts
│   │       │   ├── location
│   │       │   │   ├── location.component.css
│   │       │   │   ├── location.component.html
│   │       │   │   ├── location.component.spec.ts
│   │       │   │   └── location.component.ts
│   │       │   ├── login
│   │       │   │   ├── login.component.css
│   │       │   │   ├── login.component.html
│   │       │   │   ├── login.component.spec.ts
│   │       │   │   └── login.component.ts
│   │       │   └── map-dialog
│   │       │       ├── map-dialog.component.css
│   │       │       ├── map-dialog.component.html
│   │       │       ├── map-dialog.component.spec.ts
│   │       │       └── map-dialog.component.ts
│   │       ├── models
│   │       │   ├── nominatim-response.ts
│   │       │   └── user.ts
│   │       └── pipes
│   │           └── user
│   │               ├── user.pipe.spec.ts
│   │               └── user.pipe.ts
│   ├── assets
│   │   └── images
│   │       ├── 1 b3KYGwRDsHF_5eL1cC66pA.jpeg
│   │       ├── logo.png
│   │       ├── pinpoint2.png
│   │       └── pinpoint.png
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   └── test.ts
├── tsconfig.app.json
├── tsconfig.base.json
├── tsconfig.json
├── tsconfig.spec.json
└── tslint.json
```

