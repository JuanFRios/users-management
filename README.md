# Administracion de usuarios

## Ambiente 
- Angular CLI Version: 10.0.4
- Angular Core Version: 10.0.4
- Node Version: 12(LTS)
- Default Port: 8000

## Demo:

https://users-management-psi.vercel.app/users/list

## Especificaciones de solución
La solución propuesta se basa en la arquitectura más popular de Angular: 
- **Core:** Contiene elementos importantes para el correcto funcionamiento de toda la app: 
    - *token-interceptor:*  Para incluir un token a las peticiones http.
    - *token-guard:* Para restringir acceso a rutas.
    - *storage-service:* Para administrar items del storage
- **Shared**: Contiene elementos que se comparten entre diferentes componentes o modulos del aplicativo en este caso se tienen.
    - *Input-component*: El cual es una abstracción de un input en un formulario con validaciones, permitiendo crear formularios de forma mas sencilla, y manteniendolo flexible mediante la proyeccion de contenido con <ng-content>
    - *Confirmation-message-component*: Componente que sirve para mostrar mensajes de confirmación al usario, y que puede ser extendido para alertas o advertencias, segun las necesidades.
    - *Filter-user-by-name*: Pipe que sirve para filtrar una lista de usuarios que tengan cierta cadena de texto en su nombre.
- **Feature:** Contiene dos modulos que se cargan de forma perezosa segun la ruta activa, esto con el fin de mejorar el rendimiento de la aplicacion, y permitiendo la escalabilidad.

Con el objetivo de mostrar competencias en SCSS se aplicaron estilos a algunos componentes usando metodología BEM y la tecnica de 'mobile first'. Sin embargo, y para no desobedecer a los requerimientos de la prueba, se hizo uso de la libreria h8k-design para otros componentes.
## Project Specifications

**Read Only Files**
- src/app/app.component.spec.ts
- src/app/customer-list/customer-list.component.spec.ts

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```

