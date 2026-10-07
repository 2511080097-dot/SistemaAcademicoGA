# 🎓 Sistema Académico Universitario - Portal del Estudiante

Una aplicación web moderna, interactiva y totalmente responsiva diseñada para que los estudiantes universitarios puedan consultar su información académica de manera ágil, intuitiva y organizada.

---

## 🌟 Características Principales

1. **📊 Resumen General (Dashboard):**
   - Banner dinámico de bienvenida personalizado.
   - Indicadores académicos clave (KPIs): Promedio Ponderado Acumulado (PPA), Créditos aprobados vs. requeridos, Cursos activos y porcentaje global de asistencia.
   - Acceso rápido a asignaturas vigentes con barras de progreso curricular.
   - Módulo de eventos y evaluaciones próximas con fechas y horarios.

2. **📚 Mis Cursos:**
   - Visualización en cuadrícula (*cards*) con código de curso, sección, créditos, docente, aula y asistencia.
   - Filtro de búsqueda en tiempo real por nombre, código o docente.
   - **Modal de Detalle Completo:** Incluye sumilla del sílabo, datos de contacto del docente y desglose ponderado de evaluaciones continuas y parciales.

3. **🗓️ Horario Semanal:**
   - **Matriz Visual (Lunes a Sábado):** Bloques horarios codificados por colores con docente y aula asignada.
   - **Vista en Lista:** Alternativa secuencial ideal para navegación en dispositivos móviles.
   - Botón de **Impresión / Exportación** estilizado con soporte de reglas `@media print`.

4. **📝 Récord de Calificaciones:**
   - Selector dinámico de semestre (`2026-II`, `2026-I`, `2025-II`).
   - Tabla detallada con notas de Evaluaciones Continuas (EC1, EC2), Parcial, Examen Final y Promedio Ponderado.
   - Insignias visuales por estado (Aprobado, En Curso, Requiere atención).
   - 🧮 **Simulador Interactivo de Nota Final:** Calcula automáticamente la calificación exacta requerida en el Examen Final según el peso porcentual del curso para alcanzar una meta deseada.

5. **👤 Perfil del Estudiante:**
   - Encabezado con fotografía, código de matrícula, facultad, carrera y mención de honor (*Tercio Superior*).
   - Indicador de avance de Malla Curricular (créditos aprobados vs. totales).
   - **Formulario de Actualización de Contacto:** Permite editar correo personal, teléfono, contacto de emergencia y dirección, con **persistencia automática en `localStorage`**.
   - Descarga simulada de certificados oficiales (Constancia de Matrícula, Malla Curricular).

6. **🔔 Notificaciones y Barra Superior:**
   - Centro de notificaciones con conteo de no leídas y opción de marcar como leídas.
   - Buscador global integrado.
   - Menú de usuario rápido y diseño responsivo con menú lateral desplegable para pantallas pequeñas.

---

## 📂 Estructura del Proyecto

```plaintext
SistemaAcademicoGA/
│
├── index.html              # Estructura principal y maquetación SPA
├── css/
│   └── style.css           # Estilos personalizados, variables CSS, animaciones y soporte para impresión
├── js/
│   ├── data.js             # Fuente de datos simulados (estudiante, cursos, horarios, calificaciones, eventos)
│   └── app.js              # Lógica de navegación, renderizado dinámico, simulador y persistencia
├── assets/
│   └── avatar.svg          # Avatar vectorial limpio con soporte offline
└── README.md               # Documentación y guía del proyecto
```

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructura semántica y accesible.
- **CSS3:** Variables nativas (`custom properties`), efectos de sombra, gradientes y diseño adaptativo.
- **JavaScript (ES6+):** Renderizado dinámico del DOM, gestión de estados, cálculos matemáticos y persistencia en `localStorage`.
- **Bootstrap 5.3:** Sistema de grillas, componentes interactivos (Modals, Toasts, Dropdowns, Cards, Badges).
- **Bootstrap Icons:** Iconografía moderna y consistente.

---

## 🚀 Cómo Ejecutar la Aplicación

No requiere instalaciones complejas ni dependencias de backend:

1. **Directamente en el navegador:**
   - Haz doble clic sobre el archivo [index.html](file:///c:/Users/aldac/OneDrive/Desktop/SistemaAcademicoGA/index.html) o haz clic derecho > *Abrir con* > tu navegador favorito (Google Chrome, Microsoft Edge, Firefox, etc.).

2. **O mediante un servidor local (opcional):**
   - Con la extensión **Live Server** en VS Code / IDE.
   - O mediante la terminal de comandos:
     ```powershell
     python -m http.server 8080
     ```
     Y abre `http://localhost:8080` en tu navegador.

