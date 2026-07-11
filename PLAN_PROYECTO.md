
# Proyecto MRWG: My Relationship with God

## 🎯 Objetivo

Crear una PWA (Progressive Web App) gratuita para el fortalecimiento de la relación espiritual, permitiendo lectura bíblica, gestión de apuntes y control de bienestar digital mediante el registro de tiempos de uso.

## 🛠️ Stack Tecnológico

* **Frontend:** React, Vite, Tailwind CSS (v4).
* **Backend & Auth:** Supabase.
* **Despliegue:** GitHub Pages (con `HashRouter`).
* **Licencia:** MIT.

## 🗺️ Fases del Proyecto

### Fase 1: Entorno Base (Completado)

* [X] Configuración de React + Vite + Tailwind CSS.
* [X] Integración con GitHub y despliegue inicial en GitHub Pages.
* [X] Configuración del archivo `.env` y conexión con Supabase.

### Fase 2: El Cerebro (Backend)

* [X] Configuración de tablas en Supabase:
  * `profiles` (Usuarios y horarios).
  * `bibles` (RV60, KJV).
  * `notes` (Apuntes y devocionales).
* [X] Configuración de políticas de seguridad (RLS) en Supabase.

### Fase 3: Frontend Core (Lectura y Apuntes)

* [ ] Configuración de `react-router-dom` (HashRouter).
* [ ] Módulo Lector: Visualización de textos bíblicos (JSON) por libro y capítulo.
* [ ] Módulo Notas: CRUD (Crear, Leer, Editar, Borrar) para apuntes libres.
* [ ] Sistema de plantillas para apuntes (Predicas, Clases, Estudio).

### Fase 4: Bienestar Digital y Rutinas

* [ ] Módulo de configuración de horarios (AM/PM).
* [ ] Lógica de Check-in: Registro de tiempos de conexión.
* [ ] Dashboard: Gráficas de "tiempo de pantalla vs. tiempo en la Palabra".

### Fase 5: PWA e Instalación

* [ ] Configuración de `manifest.json`.
* [ ] Implementación de `service-worker.js` para modo offline.
* [ ] Optimización final para dispositivos móviles.

## 📋 Reglas de Oro del Proyecto

1. **Costo $0:** Mantenerse siempre dentro de los planes gratuitos de Supabase, Vercel/GitHub y servicios de código abierto.
2. **Privacidad:** El control del tiempo debe basarse en el registro voluntario (Check-in) del usuario.
3. **Escalabilidad:** El sistema de apuntes debe ser flexible mediante plantillas JSON.
