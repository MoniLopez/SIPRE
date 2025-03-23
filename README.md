<h1 align="center">Simulador Predial</h1>

![Login](https://github.com/user-attachments/assets/c1e1fe2a-67ad-4f83-8525-18a5a4cb3232)

## Descripción

El **Simulador Predial** es un sistema web desarrollado para el **Instituto Registral y Catastral del Estado de Puebla**, diseñado para que el personal autorizado realice revaluaciones prediales de manera eficiente.

El sistema permite:
- Ajustar valores prediales con base en tasas e incrementos definidos.
- Simular cambios en los impuestos y visualizar su impacto.
- Generar reportes detallados.
- Exportar información en formato Excel, facilitando la actualización del padrón predial.

## Funcionalidades Principales

### 📊 Configuración de Tasas
![municipioEnProceso](https://github.com/user-attachments/assets/d753323a-0fe7-4963-80e2-f4d3f1d9a279)

Los usuarios pueden visualizar los valores de valuación anteriores y definir nuevos valores para actualizar el padrón predial.

### 📈 Estadísticas y Resultados
![estadisticas](https://github.com/user-attachments/assets/5ae20c04-6e5e-4e8a-b718-e099b0890d92)

El sistema muestra gráficos y datos sobre los cálculos realizados con las nuevas tasas, permitiendo su modificación antes de ser guardados.

### 📑 Padrón de Cuentas Valuadas

![padronFactura](https://github.com/user-attachments/assets/2857f92b-2d1b-4e4d-a124-af93c858cf37)

Muestra el detalle de cada cuenta revaluada, asegurando una gestión clara y precisa de la información.

### 📥 Exportación de Datos

![exportarAlerta](https://github.com/user-attachments/assets/4e5499a9-a236-4363-92a0-e61b8d5169f8)

El usuario puede descargar el padrón actualizado en un archivo con el formato previamente definido.

## Tecnologías Utilizadas

El sistema fue desarrollado con **Angular 15** e implementa los siguientes conceptos y herramientas:
- **Consumo de APIs** para la obtención y actualización de datos.
- **Interfaces y Guards** para la gestión de accesos y validaciones de usuario.
- **Ciclo de Vida de Componentes** para la gestión eficiente de datos y vistas.
- **Validación de Formularios** para garantizar la captura correcta de la información.
- **Objetos y Modelado de Datos** para una estructura robusta y escalable.

## Instalación y Uso

Si deseas ejecutar este proyecto localmente, sigue estos pasos:

```bash
# Clona el repositorio
git clone https://github.com/MoniLopez/SIPRE.git

# Entra en la carpeta del proyecto
cd SIPRE

# Instala las dependencias
npm install

# Ejecuta el proyecto
gng serve --open
```

Asegúrate de contar con **Node.js** y **Angular CLI** instalados en tu equipo.

---
**© 2024 - Departo de Desarrollo Geomático**


