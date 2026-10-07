/**
 * PORTAL ACADÉMICO UNIVERSITARIO
 * Datos simulados y estructuras del estudiante, cursos, horarios y calificaciones
 */

const academicData = {
    // Información del Estudiante
    student: {
        id: "2511080097",
        fullName: "Christian Cordero Zuñiga",
        shortName: "Christian Cordero",
        documentType: "DNI",
        documentNumber: "61086109",
        faculty: "Facultad de Ingeniería y Ciencias",
        career: "Ingeniería de Sistemas",
        campus: "Campus Central - Cañete",
        currentCycle: "4to Ciclo",
        currentPeriod: "2026-II",
        academicStatus: "Estudiante Regular",
        meritOrder: "Tercio Superior (Puesto 12/145)",
        gpa: 17.42, // Escala 0 - 20
        totalCreditsCareer: 210,
        approvedCredits: 148,
        enrolledCredits: 20,
        institutionalEmail: "2511080097@undc.edu.pe",
        personalEmail: "chriscz879@gmail.com",
        phone: "+51 956 519 518",
        emergencyContact: "Ingrid Zuñiga (Madre) - +51 969 771 456",
        address: "C.P. Herbay Alto, San Vicente de Cañete, Lima, Perú",
        avatar: "assets/mifoto.jpeg",
    },

    // Notificaciones del portal
    notifications: [
        {
            id: 1,
            title: "Nueva Calificación Publicada",
            message: "El docente subió la nota de 'Proyecto Machine Learning' en IA.",
            time: "Hace 20 min",
            type: "success",
            unread: true
        },
        {
            id: 2,
            title: "Recordatorio de Entrega",
            message: "Arquitectura de Software: Sprint 2 vence este domingo 23:59 hrs.",
            time: "Hace 2 horas",
            type: "warning",
            unread: true
        },
        {
            id: 3,
            title: "Jornada Académica 2026",
            message: "Inscripciones abiertas para el Congreso de Ciberseguridad Cloud.",
            time: "Ayer",
            type: "info",
            unread: false
        }
    ],

    // Cursos Matriculados en el Ciclo Actual (2026-II)
    coursesCurrentPeriod: [
        {
            id: "IS-701",
            name: "Desarrollo Web Full Stack",
            code: "IS-701",
            section: "SW-01",
            credits: 4,
            professor: "Huancahuire Bravo Clauido Isaias",
            professorEmail: "chuancahuire@undc.edu.pe",
            classroom: "Pabellón B - Laboratorio 402",  
            type: "Obligatorio",
            progress: 75,
            colorClass: "bg-course-1",
            attendance: "95%",
            description: "Curso enfocado en la creación de aplicaciones web, integrando Frontend, Backend y bases de datos.",
            evaluations: [
                { name: "Evaluación Continua 1", weight: 20, grade: 18.0 },
                { name: "Examen Parcial", weight: 25, grade: 16.5 },
                { name: "Entrega de Proyecto Sprint 1", weight: 25, grade: 17.5 },
                { name: "Examen Final / Proyecto Sprint 2", weight: 30, grade: null }
            ]
        },
        {
            id: "IS-702",
            name: "Inteligencia Artificial y Machine Learning",
            code: "IS-702",
            section: "ML-02",
            credits: 4,
            professor: "Mg. Carmen Vega Torres",
            professorEmail: "cvega@uniglobal.edu.pe",
            classroom: "Pabellón C - Aula 204",
            type: "Obligatorio",
            progress: 70,
            colorClass: "bg-course-2",
            attendance: "100%",
            description: "Algoritmos supervisados y no supervisados, redes neuronales profundas (Deep Learning), procesamiento de lenguaje natural y Computer Vision.",
            evaluations: [
                { name: "Prácticas de Laboratorio (Prom.)", weight: 20, grade: 19.0 },
                { name: "Examen Parcial Teórico", weight: 25, grade: 17.0 },
                { name: "Proyecto Modelo Predictivo", weight: 25, grade: 18.5 },
                { name: "Examen Final Integrador", weight: 30, grade: null }
            ]
        },
        {
            id: "IS-703",
            name: "Seguridad de la Información y Ciberseguridad",
            code: "IS-703",
            section: "SEC-01",
            credits: 3,
            professor: "Ing. Carlos Santana Ortiz",
            professorEmail: "csantana@uniglobal.edu.pe",
            classroom: "Pabellón B - Laboratorio 405",
            type: "Obligatorio",
            progress: 65,
            colorClass: "bg-course-3",
            attendance: "92%",
            description: "Criptografía moderna, análisis de vulnerabilidades (SAST/DAST), ethical hacking, estándares ISO 27001 y DevSecOps.",
            evaluations: [
                { name: "Práctica Calificada 1", weight: 20, grade: 16.0 },
                { name: "Examen Parcial", weight: 30, grade: 15.0 },
                { name: "Laboratorio Penetration Testing", weight: 25, grade: 17.0 },
                { name: "Examen Final", weight: 25, grade: null }
            ]
        },
        {
            id: "IS-704",
            name: "Gestión de Proyectos Ágiles (Agile & DevOps)",
            code: "IS-704",
            section: "PM-03",
            credits: 3,
            professor: "Lic. Patricia Morales Peña",
            professorEmail: "pmorales@uniglobal.edu.pe",
            classroom: "Pabellón A - Aula 302",
            type: "Obligatorio",
            progress: 80,
            colorClass: "bg-course-4",
            attendance: "96%",
            description: "Metodologías ágiles Scrum, Kanban, gestión de releases, artefactos ágiles, estimación y métricas de velocidad de equipo.",
            evaluations: [
                { name: "Sprints y Caso de Estudio", weight: 30, grade: 18.5 },
                { name: "Examen Parcial", weight: 25, grade: 17.0 },
                { name: "Evaluación de Roles Scrum", weight: 20, grade: 19.0 },
                { name: "Examen Final / Auditoría Ágil", weight: 25, grade: null }
            ]
        },
        {
            id: "IS-705",
            name: "Fundamentos de Base de Datos",
            code: "IS-705",
            section: "FS-01",
            credits: 4,
            professor: "Mg. Fernando Ruiz Saldaña",
            professorEmail: "fruiz@uniglobal.edu.pe",
            classroom: "Pabellón B - Laboratorio 401",
            type: "Electivo",
            progress: 75,
            colorClass: "bg-course-5",
            attendance: "98%",
            description: "Curso enfocado en diseñar, organizar y gestionar bases de datos para almacenar y consultar información de manera eficiente.",
            evaluations: [
                { name: "Desafíos de Código Semanales", weight: 20, grade: 19.5 },
                { name: "Examen Parcial Práctico", weight: 30, grade: 18.5 },
                { name: "Infraestructura como Código (IaC)", weight: 20, grade: 17.5 },
                { name: "Proyecto Final Fullstack Cloud", weight: 30, grade: null }
            ]
        },
        {
            id: "HUM-301",
            name: "Ética Profesional y Deontología",
            code: "HUM-301",
            section: "ET-04",
            credits: 2,
            professor: "Dra. Gladys Navarro Rivas",
            professorEmail: "gnavarro@uniglobal.edu.pe",
            classroom: "Pabellón A - Aula 105",
            type: "General",
            progress: 85,
            colorClass: "bg-course-6",
            attendance: "100%",
            description: "Fundamentos bioéticos y deontológicos en el ejercicio de la ingeniería informática, protección de datos y responsabilidad social.",
            evaluations: [
                { name: "Ensayos Críticos y Debates", weight: 30, grade: 16.5 },
                { name: "Examen Parcial", weight: 30, grade: 17.0 },
                { name: "Análisis de Caso Ético AI", weight: 20, grade: 18.0 },
                { name: "Monografía Final", weight: 20, grade: null }
            ]
        }
    ],

    // Horarios Semanales (Lunes a Sábado)
    timeSlots: [
        { time: "08:00 - 10:00", label: "08:00 a 10:00" },
        { time: "10:00 - 12:00", label: "10:00 a 12:00" },
        { time: "12:00 - 14:00", label: "12:00 a 14:00 (Receso)" },
        { time: "14:00 - 16:00", label: "14:00 a 16:00" },
        { time: "16:00 - 18:00", label: "16:00 a 18:00" },
        { time: "18:00 - 20:00", label: "18:00 a 20:00" }
    ],

    scheduleItems: [
        // Lunes
        {
            day: "Lunes",
            time: "08:00 - 10:00",
            courseId: "IS-701",
            courseName: "Desarrollo Web Full Stack",
            classroom: "Lab 402 (Pab. B)",
            professor: "Dr. R. Mendoza",
            colorClass: "bg-course-1"
        },
        {
            day: "Lunes",
            time: "14:00 - 16:00",
            courseId: "IS-705",
            courseName: "Fundamentos de Base de Datos",
            classroom: "Lab 401 (Pab. B)",
            professor: "Mg. F. Ruiz",
            colorClass: "bg-course-5"
        },
        // Martes
        {
            day: "Martes",
            time: "10:00 - 12:00",
            courseId: "IS-702",
            courseName: "Inteligencia Artificial",
            classroom: "Aula 204 (Pab. C)",
            professor: "Mg. C. Vega",
            colorClass: "bg-course-2"
        },
        // Miércoles
        {
            day: "Miércoles",
            time: "08:00 - 10:00",
            courseId: "IS-701",
            courseName: "Desarrollo Web Full Stack",
            classroom: "Lab 402 (Pab. B)",
            professor: "Dr. R. Mendoza",
            colorClass: "bg-course-1"
        },
        {
            day: "Miércoles",
            time: "14:00 - 16:00",
            courseId: "IS-703",
            courseName: "Seguridad Informática",
            classroom: "Lab 405 (Pab. B)",
            professor: "Ing. C. Santana",
            colorClass: "bg-course-3"
        },
        // Jueves
        {
            day: "Jueves",
            time: "10:00 - 12:00",
            courseId: "IS-702",
            courseName: "Inteligencia Artificial",
            classroom: "Aula 204 (Pab. C)",
            professor: "Mg. C. Vega",
            colorClass: "bg-course-2"
        },
        {
            day: "Jueves",
            time: "16:00 - 18:00",
            courseId: "IS-704",
            courseName: "Gestión de Proyectos Ágiles",
            classroom: "Aula 302 (Pab. A)",
            professor: "Lic. P. Morales",
            colorClass: "bg-course-4"
        },
        {
            day: "Jueves",
            time: "18:00 - 20:00",
            courseId: "IS-704",
            courseName: "Gestión Proyectos (Lab)",
            classroom: "Aula 302 (Pab. A)",
            professor: "Lic. P. Morales",
            colorClass: "bg-course-4"
        },
        // Viernes
        {
            day: "Viernes",
            time: "08:00 - 10:00",
            courseId: "HUM-301",
            courseName: "Ética Profesional",
            classroom: "Aula 105 (Pab. A)",
            professor: "Dra. G. Navarro",
            colorClass: "bg-course-6"
        },
        {
            day: "Viernes",
            time: "14:00 - 16:00",
            courseId: "IS-703",
            courseName: "Seguridad Informática",
            classroom: "Lab 405 (Pab. B)",
            professor: "Ing. C. Santana",
            colorClass: "bg-course-3"
        },
        // Sábado
        {
            day: "Sábado",
            time: "10:00 - 12:00",
            courseId: "IS-705",
            courseName: "Fundamentos de Base de Datos (Lab)",
            classroom: "Lab 401 (Pab. B)",
            professor: "Mg. F. Ruiz",
            colorClass: "bg-course-5"
        }
    ],

    // Histórico de Calificaciones por Semestre
    semestersGrades: {
        "2026-II": {
            periodName: "Semestre 2026-II (En Curso)",
            periodGpa: 17.55,
            totalCredits: 20,
            status: "En desarrollo",
            courses: [
                { code: "IS-701", name: "Desarrollo Web Full Stack", credits: 4, ec1: 18.0, parcial: 16.5, ec2: 17.5, final: "-", currentAverage: 17.3, state: "En Curso" },
                { code: "IS-702", name: "Inteligencia Artificial y ML", credits: 4, ec1: 19.0, parcial: 17.0, ec2: 18.5, final: "-", currentAverage: 18.1, state: "En Curso" },
                { code: "IS-703", name: "Seguridad de la Información", credits: 3, ec1: 16.0, parcial: 15.0, ec2: 17.0, final: "-", currentAverage: 15.9, state: "En Curso" },
                { code: "IS-704", name: "Gestión de Proyectos Ágiles", credits: 3, ec1: 18.5, parcial: 17.0, ec2: 19.0, final: "-", currentAverage: 18.1, state: "En Curso" },
                { code: "IS-705", name: "Fundamentos de Base de Datos", credits: 4, ec1: 19.5, parcial: 18.5, ec2: 17.5, final: "-", currentAverage: 18.5, state: "En Curso" },
                { code: "HUM-301", name: "Ética Profesional y Deontología", credits: 2, ec1: 16.5, parcial: 17.0, ec2: 18.0, final: "-", currentAverage: 17.1, state: "En Curso" }
            ]
        },
        "2026-I": {
            periodName: "Semestre 2026-I",
            periodGpa: 17.80,
            totalCredits: 22,
            status: "Culminado",
            courses: [
                { code: "IS-601", name: "Bases de Datos Distribuidas & NoSQL", credits: 4, ec1: 18.0, parcial: 18.0, ec2: 19.0, final: 18.5, currentAverage: 18.4, state: "Aprobado" },
                { code: "IS-602", name: "Ingeniería de Requerimientos Ágiles", credits: 3, ec1: 17.0, parcial: 16.5, ec2: 17.5, final: 17.0, currentAverage: 17.0, state: "Aprobado" },
                { code: "IS-603", name: "Redes y Comunicaciones II", credits: 4, ec1: 16.0, parcial: 15.5, ec2: 17.0, final: 16.5, currentAverage: 16.3, state: "Aprobado" },
                { code: "IS-604", name: "Sistemas Operativos Avanzados", credits: 4, ec1: 18.5, parcial: 18.0, ec2: 19.0, final: 18.0, currentAverage: 18.3, state: "Aprobado" },
                { code: "MAT-402", name: "Investigación de Operaciones", credits: 4, ec1: 19.0, parcial: 17.5, ec2: 18.0, final: 18.5, currentAverage: 18.2, state: "Aprobado" },
                { code: "ECO-201", name: "Economía y Finanzas para Ingeniería", credits: 3, ec1: 17.0, parcial: 18.0, ec2: 17.5, final: 18.0, currentAverage: 17.7, state: "Aprobado" }
            ]
        },
        "2025-II": {
            periodName: "Semestre 2025-II",
            periodGpa: 17.15,
            totalCredits: 21,
            status: "Culminado",
            courses: [
                { code: "IS-501", name: "Estructuras de Datos Avanzadas", credits: 4, ec1: 17.0, parcial: 16.0, ec2: 18.0, final: 17.5, currentAverage: 17.1, state: "Aprobado" },
                { code: "IS-502", name: "Modelado y Diseño de Software", credits: 4, ec1: 18.5, parcial: 17.0, ec2: 18.0, final: 17.0, currentAverage: 17.5, state: "Aprobado" },
                { code: "IS-503", name: "Redes y Comunicaciones I", credits: 3, ec1: 16.0, parcial: 15.0, ec2: 16.5, final: 16.0, currentAverage: 15.8, state: "Aprobado" },
                { code: "MAT-301", name: "Estadística y Probabilidades", credits: 4, ec1: 17.5, parcial: 17.0, ec2: 18.0, final: 17.5, currentAverage: 17.5, state: "Aprobado" },
                { code: "HUM-202", name: "Comunicación Empresarial", credits: 3, ec1: 18.0, parcial: 17.5, ec2: 19.0, final: 18.0, currentAverage: 18.1, state: "Aprobado" },
                { code: "IS-504", name: "Taller de Programación Concurrente", credits: 3, ec1: 16.5, parcial: 16.0, ec2: 17.0, final: 17.0, currentAverage: 16.6, state: "Aprobado" }
            ]
        }
    },

    // Calendario de eventos / próximos exámenes
    upcomingEvents: [
        {
            date: "12 Octubre",
            dayName: "Lun",
            time: "08:00 AM",
            title: "Sprint Review 2 - Arquitectura",
            type: "Entrega",
            badgeClass: "badge-soft-primary"
        },
        {
            date: "15 Octubre",
            dayName: "Jue",
            time: "10:00 AM",
            title: "Presentación Modelo ML de Predicción",
            type: "Exposición",
            badgeClass: "badge-soft-success"
        },
        {
            date: "20 Octubre",
            dayName: "Mar",
            time: "14:00 PM",
            title: "Simulacro Ciberataque DevSecOps",
            type: "Laboratorio",
            badgeClass: "badge-soft-warning"
        },
        {
            date: "02 Noviembre",
            dayName: "Lun",
            time: "Todo el día",
            title: "Inicio Semana de Evaluaciones Finales",
            type: "Institucional",
            badgeClass: "badge-soft-danger"
        }
    ]
};

// Exportar globalmente
window.academicData = academicData;