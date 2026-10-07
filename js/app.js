/**
 * PORTAL ACADÉMICO UNIVERSITARIO - LÓGICA PRINCIPAL
 * Controlador de vistas, interactividad, simulador de notas y gestión de datos.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar estado desde LocalStorage si existe
    initLocalStorage();

    // Renderizado inicial
    renderSidebarUserInfo();
    renderTopbar();
    renderDashboardView();
    setupNavigation();
    setupMobileSidebar();
    setupGlobalSearch();

    // Configurar tooltips de Bootstrap
    initTooltips();
});

// ==========================================================================
// ESTADO Y PERSISTENCIA LOCAL
// ==========================================================================

function initLocalStorage() {
    const savedStudent = localStorage.getItem('academic_student_profile');
    if (savedStudent) {
        try {
            const parsed = JSON.parse(savedStudent);
            window.academicData.student = { ...window.academicData.student, ...parsed };
        } catch (e) {
            console.error("Error al cargar perfil guardado", e);
        }
    }
}

function saveStudentProfile(updatedData) {
    window.academicData.student = { ...window.academicData.student, ...updatedData };
    localStorage.setItem('academic_student_profile', JSON.stringify(window.academicData.student));
    renderSidebarUserInfo();
    renderTopbar();
    showToast('¡Perfil actualizado con éxito!', 'success');
}

// ==========================================================================
// RENDERIZADO DE COMPONENTES GLOBALES (SIDEBAR & TOPBAR)
// ==========================================================================

function renderSidebarUserInfo() {
    const student = window.academicData.student;
    
    // Elementos en el sidebar
    const nameEl = document.getElementById('sidebar-user-name');
    const careerEl = document.getElementById('sidebar-user-career');
    const codeEl = document.getElementById('sidebar-user-code');
    const avatarEl = document.getElementById('sidebar-user-avatar');

    if (nameEl) nameEl.textContent = student.shortName;
    if (careerEl) careerEl.textContent = student.career;
    if (codeEl) codeEl.textContent = `Cod: ${student.id}`;
    if (avatarEl) avatarEl.src = student.avatar;
}

function renderTopbar() {
    const student = window.academicData.student;
    const topNameEl = document.getElementById('topbar-user-name');
    const topAvatarEl = document.getElementById('topbar-user-avatar');

    if (topNameEl) topNameEl.textContent = student.shortName;
    if (topAvatarEl) topAvatarEl.src = student.avatar;

    renderNotifications();
}

function renderNotifications() {
    const notifContainer = document.getElementById('notifications-list');
    const notifBadge = document.getElementById('notifications-badge-count');
    const notifications = window.academicData.notifications;

    const unreadCount = notifications.filter(n => n.unread).length;
    if (notifBadge) {
        notifBadge.textContent = unreadCount;
        notifBadge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
    }

    if (!notifContainer) return;

    if (notifications.length === 0) {
        notifContainer.innerHTML = `<li class="p-3 text-center text-muted small">No hay notificaciones</li>`;
        return;
    }

    notifContainer.innerHTML = notifications.map(notif => `
        <li class="notification-item p-3 border-bottom ${notif.unread ? 'bg-light' : ''}">
            <div class="d-flex align-items-start gap-2">
                <div class="mt-1">
                    <span class="badge rounded-circle p-1 bg-${notif.type}">&bull;</span>
                </div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <strong class="small text-dark">${notif.title}</strong>
                        <span class="text-muted" style="font-size: 0.7rem;">${notif.time}</span>
                    </div>
                    <p class="mb-0 text-muted" style="font-size: 0.8rem;">${notif.message}</p>
                </div>
            </div>
        </li>
    `).join('') + `
        <li class="p-2 text-center bg-light">
            <button class="btn btn-sm btn-link text-primary text-decoration-none fw-semibold p-0" onclick="markAllNotificationsAsRead()">
                Marcar todas como leídas
            </button>
        </li>
    `;
}

window.markAllNotificationsAsRead = function() {
    window.academicData.notifications.forEach(n => n.unread = false);
    renderNotifications();
    showToast('Notificaciones marcadas como leídas', 'info');
};

// ==========================================================================
// CONTROLADOR DE NAVEGACIÓN ENTRE VISTAS
// ==========================================================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-route-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = link.getAttribute('data-view');
            switchView(targetView);

            // Cerrar sidebar en móvil si está abierto
            closeMobileSidebar();
        });
    });
}

function switchView(viewName) {
    // Actualizar enlaces activos
    document.querySelectorAll('.nav-route-btn').forEach(link => {
        if (link.getAttribute('data-view') === viewName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Ocultar todas las vistas
    document.querySelectorAll('.app-view-section').forEach(section => {
        section.classList.add('d-none');
    });

    // Mostrar vista objetivo y renderizar su contenido
    const activeSection = document.getElementById(`view-${viewName}`);
    if (activeSection) {
        activeSection.classList.remove('d-none');
        activeSection.classList.add('fade-in');
    }

    // Renderizar lógica específica de la vista
    switch (viewName) {
        case 'dashboard':
            renderDashboardView();
            break;
        case 'courses':
            renderCoursesView();
            break;
        case 'schedule':
            renderScheduleView('grid');
            break;
        case 'grades':
            renderGradesView();
            break;
        case 'profile':
            renderProfileView();
            break;
    }

    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Redirección directa desde tarjetas
window.navigateTo = function(viewName) {
    switchView(viewName);
};

// ==========================================================================
// VISTA: DASHBOARD / RESUMEN GENERAL
// ==========================================================================

function renderDashboardView() {
    const student = window.academicData.student;
    const courses = window.academicData.coursesCurrentPeriod;
    const events = window.academicData.upcomingEvents;

    // Actualizar banner de bienvenida
    const welcomeName = document.getElementById('dash-student-name');
    if (welcomeName) welcomeName.textContent = student.fullName.split(' ')[0];

    // Actualizar KPI cards
    const kpiGpa = document.getElementById('dash-kpi-gpa');
    const kpiCredits = document.getElementById('dash-kpi-credits');
    const kpiCourses = document.getElementById('dash-kpi-courses');
    const kpiAttendance = document.getElementById('dash-kpi-attendance');

    if (kpiGpa) kpiGpa.textContent = student.gpa.toFixed(2);
    if (kpiCredits) kpiCredits.textContent = `${student.approvedCredits} / ${student.totalCreditsCareer}`;
    if (kpiCourses) kpiCourses.textContent = courses.length;
    if (kpiAttendance) kpiAttendance.textContent = "96.8%";

    // Renderizar resumen de cursos activos
    const dashCoursesContainer = document.getElementById('dash-active-courses');
    if (dashCoursesContainer) {
        dashCoursesContainer.innerHTML = courses.slice(0, 4).map(course => `
            <div class="col-md-6 mb-3">
                <div class="p-3 border rounded-3 bg-white h-100 d-flex flex-column justify-content-between shadow-sm">
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge ${course.colorClass} border">${course.code}</span>
                            <span class="badge bg-light text-dark border">${course.credits} Créditos</span>
                        </div>
                        <h6 class="fw-bold mb-1 text-dark">${course.name}</h6>
                        <small class="text-muted d-block mb-3"><i class="bi bi-person me-1"></i>${course.professor}</small>
                    </div>
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span class="small text-muted">Avance de Sesiones</span>
                            <span class="small fw-bold text-primary">${course.progress}%</span>
                        </div>
                        <div class="progress" style="height: 6px;">
                            <div class="progress-bar bg-primary" role="progressbar" style="width: ${course.progress}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Renderizar eventos próximos
    const eventsContainer = document.getElementById('dash-upcoming-events');
    if (eventsContainer) {
        eventsContainer.innerHTML = events.map(evt => `
            <div class="d-flex align-items-center gap-3 p-3 border-bottom">
                <div class="text-center p-2 rounded-3 bg-light border" style="min-width: 58px;">
                    <div class="fw-bold text-primary" style="font-size: 1.1rem;">${evt.date.split(' ')[0]}</div>
                    <small class="text-muted text-uppercase" style="font-size: 0.68rem;">${evt.dayName}</small>
                </div>
                <div class="flex-grow-1">
                    <span class="badge ${evt.badgeClass} mb-1">${evt.type}</span>
                    <h6 class="mb-0 text-dark fw-semibold" style="font-size: 0.88rem;">${evt.title}</h6>
                    <small class="text-muted"><i class="bi bi-clock me-1"></i>${evt.time}</small>
                </div>
            </div>
        `).join('');
    }
}

// ==========================================================================
// VISTA: MIS CURSOS
// ==========================================================================

function renderCoursesView(filterKeyword = '') {
    const container = document.getElementById('courses-grid-container');
    if (!container) return;

    let courses = window.academicData.coursesCurrentPeriod;

    if (filterKeyword) {
        const kw = filterKeyword.toLowerCase().trim();
        courses = courses.filter(c => 
            c.name.toLowerCase().includes(kw) || 
            c.code.toLowerCase().includes(kw) ||
            c.professor.toLowerCase().includes(kw)
        );
    }

    if (courses.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-search text-muted display-4"></i>
                <h5 class="mt-3 text-secondary">No se encontraron asignaturas</h5>
                <p class="text-muted small">Intenta con otro término o código de curso.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = courses.map(course => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="course-card">
                <div class="course-header">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="course-tag ${course.colorClass} border">${course.code} &bull; Sec. ${course.section}</span>
                        <span class="badge bg-light text-dark border">${course.credits} Créditos</span>
                    </div>
                    <h5 class="course-title text-dark">${course.name}</h5>
                    <p class="course-code text-muted mb-3"><i class="bi bi-tag me-1"></i>Tipo: ${course.type}</p>
                    
                    <div class="course-meta-item">
                        <i class="bi bi-person-workspace"></i>
                        <span class="text-truncate" title="${course.professor}">${course.professor}</span>
                    </div>
                    <div class="course-meta-item">
                        <i class="bi bi-geo-alt"></i>
                        <span>${course.classroom}</span>
                    </div>
                    <div class="course-meta-item">
                        <i class="bi bi-check2-circle text-success"></i>
                        <span>Asistencia: <strong class="text-success">${course.attendance}</strong></span>
                    </div>

                    <div class="mt-3">
                        <div class="d-flex justify-content-between text-muted small mb-1">
                            <span>Progreso del Sílabo</span>
                            <span class="fw-bold text-primary">${course.progress}%</span>
                        </div>
                        <div class="progress" style="height: 6px;">
                            <div class="progress-bar bg-primary" style="width: ${course.progress}%"></div>
                        </div>
                    </div>
                </div>

                <div class="course-footer">
                    <button class="btn btn-sm btn-outline-primary w-100 rounded-pill fw-semibold" onclick="openCourseDetailsModal('${course.id}')">
                        <i class="bi bi-info-circle me-1"></i> Ver Sílabo y Notas
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Modal de detalle del curso
window.openCourseDetailsModal = function(courseId) {
    const course = window.academicData.coursesCurrentPeriod.find(c => c.id === courseId);
    if (!course) return;

    const modalTitle = document.getElementById('courseModalTitle');
    const modalBody = document.getElementById('courseModalBody');

    if (modalTitle) modalTitle.innerHTML = `<span class="badge ${course.colorClass} me-2">${course.code}</span> ${course.name}`;

    if (modalBody) {
        // Calcular promedio ponderado acumulado actual del curso
        let totalWeighted = 0;
        let totalWeights = 0;
        const evalRows = course.evaluations.map(ev => {
            if (ev.grade !== null) {
                totalWeighted += ev.grade * (ev.weight / 100);
                totalWeights += ev.weight;
            }
            return `
                <tr>
                    <td class="fw-medium">${ev.name}</td>
                    <td class="text-center"><span class="badge bg-light text-dark border">${ev.weight}%</span></td>
                    <td class="text-center font-monospace fw-bold">
                        ${ev.grade !== null ? `<span class="text-${ev.grade >= 14 ? 'success' : (ev.grade >= 11 ? 'warning' : 'danger')}">${ev.grade.toFixed(1)}</span>` : '<span class="text-muted fst-italic">Pendiente</span>'}
                    </td>
                </tr>
            `;
        }).join('');

        modalBody.innerHTML = `
            <div class="mb-4">
                <h6 class="fw-bold text-dark border-bottom pb-2"><i class="bi bi-card-text text-primary me-2"></i>Descripción y Sílabo</h6>
                <p class="text-muted small">${course.description}</p>
            </div>

            <div class="row g-3 mb-4">
                <div class="col-sm-6">
                    <div class="p-3 bg-light rounded-3 border">
                        <div class="info-label">Docente Asignado</div>
                        <div class="info-value small text-dark">${course.professor}</div>
                        <a href="mailto:${course.professorEmail}" class="small text-decoration-none text-primary d-inline-block mt-1">
                            <i class="bi bi-envelope me-1"></i>${course.professorEmail}
                        </a>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="p-3 bg-light rounded-3 border">
                        <div class="info-label">Ubicación y Asistencia</div>
                        <div class="info-value small text-dark">${course.classroom}</div>
                        <span class="badge bg-success-subtle text-success border border-success-subtle mt-1">
                            <i class="bi bi-check-circle me-1"></i>${course.attendance} asistencia registrada
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <h6 class="fw-bold text-dark border-bottom pb-2"><i class="bi bi-journal-check text-primary me-2"></i>Esquema de Evaluación del Periodo</h6>
                <div class="table-responsive">
                    <table class="table table-sm table-bordered align-middle mb-2">
                        <thead class="table-light">
                            <tr>
                                <th>Criterio de Evaluación</th>
                                <th class="text-center" style="width: 100px;">Peso</th>
                                <th class="text-center" style="width: 110px;">Nota</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${evalRows}
                        </tbody>
                    </table>
                </div>
                <div class="d-flex justify-content-between align-items-center bg-primary-subtle p-2 px-3 rounded-2 text-primary border border-primary-subtle">
                    <span class="small fw-semibold">Puntaje ponderado acumulado actual:</span>
                    <strong class="fs-6">${totalWeighted.toFixed(2)} pts (sobre ${totalWeights}%)</strong>
                </div>
            </div>
        `;
    }

    const modal = new bootstrap.Modal(document.getElementById('courseDetailModal'));
    modal.show();
};

// ==========================================================================
// VISTA: HORARIO SEMANAL (GRID & LISTA)
// ==========================================================================

let currentScheduleView = 'grid';

function renderScheduleView(mode = 'grid') {
    currentScheduleView = mode;
    const gridContainer = document.getElementById('schedule-grid-view');
    const listContainer = document.getElementById('schedule-list-view');
    const btnGrid = document.getElementById('btn-schedule-grid');
    const btnList = document.getElementById('btn-schedule-list');

    if (btnGrid && btnList) {
        if (mode === 'grid') {
            btnGrid.classList.add('active');
            btnList.classList.remove('active');
            if (gridContainer) gridContainer.classList.remove('d-none');
            if (listContainer) listContainer.classList.add('d-none');
            renderScheduleGrid();
        } else {
            btnList.classList.add('active');
            btnGrid.classList.remove('active');
            if (gridContainer) gridContainer.classList.add('d-none');
            if (listContainer) listContainer.classList.remove('d-none');
            renderScheduleList();
        }
    }
}

function renderScheduleGrid() {
    const tbody = document.getElementById('timetable-tbody');
    if (!tbody) return;

    const timeSlots = window.academicData.timeSlots;
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const scheduleItems = window.academicData.scheduleItems;

    tbody.innerHTML = timeSlots.map(slot => {
        const rowCells = days.map(day => {
            // Buscar si hay clase en este slot y día
            const matchingItem = scheduleItems.find(item => item.day === day && item.time === slot.time);

            if (matchingItem) {
                return `
                    <td>
                        <div class="schedule-block ${matchingItem.colorClass}" onclick="openCourseDetailsModal('${matchingItem.courseId}')" title="${matchingItem.courseName} - ${matchingItem.professor}">
                            <div>
                                <div class="schedule-block-title">${matchingItem.courseName}</div>
                                <div class="schedule-block-room"><i class="bi bi-geo-alt me-1"></i>${matchingItem.classroom}</div>
                            </div>
                            <div class="text-truncate" style="font-size: 0.68rem; opacity: 0.85;">${matchingItem.professor}</div>
                        </div>
                    </td>
                `;
            } else {
                return `<td class="text-center text-muted" style="background: rgba(248, 250, 252, 0.4);"><span style="opacity: 0.15;">—</span></td>`;
            }
        }).join('');

        return `
            <tr>
                <td>${slot.label}</td>
                ${rowCells}
            </tr>
        `;
    }).join('');
}

function renderScheduleList() {
    const listContainer = document.getElementById('schedule-list-content');
    if (!listContainer) return;

    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const scheduleItems = window.academicData.scheduleItems;

    listContainer.innerHTML = days.map(day => {
        const dayClasses = scheduleItems.filter(item => item.day === day);
        if (dayClasses.length === 0) {
            return `
                <div class="card mb-3 border">
                    <div class="card-header bg-light py-2 fw-bold text-dark d-flex justify-content-between align-items-center">
                        <span><i class="bi bi-calendar3 me-2 text-primary"></i>${day}</span>
                        <span class="badge bg-secondary-subtle text-secondary">Sin clases</span>
                    </div>
                    <div class="card-body py-3 text-center text-muted small">
                        No hay asignaturas programadas para este día.
                    </div>
                </div>
            `;
        }

        const itemsHtml = dayClasses.map(cls => `
            <div class="d-flex align-items-center justify-content-between p-3 border-bottom ${cls.colorClass} rounded-2 mb-2">
                <div>
                    <span class="badge bg-white text-dark border mb-1">${cls.time}</span>
                    <h6 class="fw-bold mb-1">${cls.courseName}</h6>
                    <small class="d-block"><i class="bi bi-geo-alt me-1"></i>${cls.classroom} &bull; <i class="bi bi-person me-1"></i>${cls.professor}</small>
                </div>
                <button class="btn btn-sm btn-light border shadow-sm" onclick="openCourseDetailsModal('${cls.courseId}')">
                    Detalle
                </button>
            </div>
        `).join('');

        return `
            <div class="card mb-3 border">
                <div class="card-header bg-white py-2 fw-bold text-dark d-flex justify-content-between align-items-center border-bottom">
                    <span><i class="bi bi-calendar-event me-2 text-primary"></i>${day}</span>
                    <span class="badge bg-primary-subtle text-primary border border-primary-subtle">${dayClasses.length} Asignaturas</span>
                </div>
                <div class="card-body p-3">
                    ${itemsHtml}
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================================================
// VISTA: CALIFICACIONES Y SIMULADOR
// ==========================================================================

function renderGradesView(period = '2026-II') {
    const periodData = window.academicData.semestersGrades[period];
    if (!periodData) return;

    // Actualizar badges resumen
    const gpaEl = document.getElementById('grades-period-gpa');
    const creditsEl = document.getElementById('grades-period-credits');
    const statusEl = document.getElementById('grades-period-status');

    if (gpaEl) gpaEl.textContent = periodData.periodGpa.toFixed(2);
    if (creditsEl) creditsEl.textContent = `${periodData.totalCredits} Créditos`;
    if (statusEl) statusEl.textContent = periodData.status;

    // Renderizar filas de la tabla
    const tbody = document.getElementById('grades-table-tbody');
    if (tbody) {
        tbody.innerHTML = periodData.courses.map(c => {
            const isApproved = c.currentAverage >= 11;
            const badgeClass = c.currentAverage >= 14 ? 'approved' : (c.currentAverage >= 11 ? 'warning' : 'failed');
            const stateBadge = c.state === 'Aprobado' 
                ? 'badge-soft-success' 
                : (c.state === 'En Curso' ? 'badge-soft-primary' : 'badge-soft-danger');

            return `
                <tr>
                    <td>
                        <span class="fw-bold text-dark d-block">${c.name}</span>
                        <small class="text-muted font-monospace">${c.code}</small>
                    </td>
                    <td class="text-center fw-semibold">${c.credits}</td>
                    <td class="text-center font-monospace">${typeof c.ec1 === 'number' ? c.ec1.toFixed(1) : c.ec1}</td>
                    <td class="text-center font-monospace">${typeof c.parcial === 'number' ? c.parcial.toFixed(1) : c.parcial}</td>
                    <td class="text-center font-monospace">${typeof c.ec2 === 'number' ? c.ec2.toFixed(1) : c.ec2}</td>
                    <td class="text-center font-monospace">${typeof c.final === 'number' ? c.final.toFixed(1) : c.final}</td>
                    <td class="text-center">
                        <span class="grade-badge ${badgeClass}">${c.currentAverage.toFixed(1)}</span>
                    </td>
                    <td class="text-center">
                        <span class="badge ${stateBadge}">${c.state}</span>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Inicializar selectores del simulador
    initGradeSimulatorSelect();
}

// Simulador interactivo de notas
function initGradeSimulatorSelect() {
    const select = document.getElementById('simulator-course-select');
    if (!select) return;

    const currentCourses = window.academicData.coursesCurrentPeriod;
    select.innerHTML = currentCourses.map(course => `
        <option value="${course.id}">${course.name} (${course.code})</option>
    `).join('');

    // Disparar cálculo inicial
    calculateSimulatorTarget();
}

window.calculateSimulatorTarget = function() {
    const select = document.getElementById('simulator-course-select');
    const targetInput = document.getElementById('simulator-target-grade');
    const resultBox = document.getElementById('simulator-result');

    if (!select || !targetInput || !resultBox) return;

    const courseId = select.value;
    const targetGrade = parseFloat(targetInput.value) || 14.0;
    const course = window.academicData.coursesCurrentPeriod.find(c => c.id === courseId);

    if (!course) return;

    // Calcular puntos acumulados hasta ahora
    let currentScore = 0;
    let finalWeight = 30; // default si no se encuentra
    let otherWeightsSum = 0;

    course.evaluations.forEach(ev => {
        if (ev.grade !== null) {
            currentScore += ev.grade * (ev.weight / 100);
            otherWeightsSum += ev.weight;
        } else {
            finalWeight = ev.weight;
        }
    });

    // Nota final necesaria = (targetGrade - currentScore) / (finalWeight / 100)
    const needed = (targetGrade - currentScore) / (finalWeight / 100);

    let message = '';
    let alertClass = '';

    if (needed <= 0) {
        message = `¡Felicitaciones! Con tus notas actuales ya superas la meta de <strong>${targetGrade.toFixed(1)}</strong>. Incluso con 00 en el Examen Final apruebas el curso con promedio favorable.`;
        alertClass = 'alert-success';
    } else if (needed > 20) {
        message = `Para alcanzar el promedio de <strong>${targetGrade.toFixed(1)}</strong> necesitarías obtener <strong>${needed.toFixed(1)}</strong> en el Examen Final, lo cual supera el puntaje máximo (20.0). Considera ajustar la meta de promedio.`;
        alertClass = 'alert-danger';
    } else {
        const difficulty = needed > 16 ? 'Requiere estudio intensivo' : (needed > 13 ? 'Meta alcanzable' : 'Fácilmente alcanzable');
        alertClass = needed > 15 ? 'alert-warning' : 'alert-info';
        message = `Para culminar con un promedio final de <strong>${targetGrade.toFixed(1)}</strong>, necesitas obtener al menos:
            <div class="display-6 fw-bold my-2 text-dark font-monospace">${needed.toFixed(1)} <small class="fs-6 text-muted">/ 20</small></div>
            <span class="badge ${needed > 15 ? 'bg-warning text-dark' : 'bg-primary'}">${difficulty}</span> en el Examen Final (${finalWeight}% de la nota).`;
    }

    resultBox.innerHTML = `
        <div class="alert ${alertClass} border mb-0 text-center py-3">
            ${message}
        </div>
    `;
};

// ==========================================================================
// VISTA: PERFIL DEL ESTUDIANTE
// ==========================================================================

function renderProfileView() {
    const student = window.academicData.student;

    // Campos no editables del perfil
    document.getElementById('prof-fullName').textContent = student.fullName;
    document.getElementById('prof-career').textContent = student.career;
    document.getElementById('prof-id').textContent = student.id;
    document.getElementById('prof-dni').textContent = student.documentNumber;
    document.getElementById('prof-faculty').textContent = student.faculty;
    document.getElementById('prof-campus').textContent = student.campus;
    document.getElementById('prof-cycle').textContent = student.currentCycle;
    document.getElementById('prof-merit').textContent = student.meritOrder;
    document.getElementById('prof-avatar').src = student.avatar;

    // Progreso de malla
    const percentage = Math.round((student.approvedCredits / student.totalCreditsCareer) * 100);
    const progressText = document.getElementById('prof-progress-text');
    const progressBar = document.getElementById('prof-progress-bar');
    if (progressText) progressText.textContent = `${student.approvedCredits} de ${student.totalCreditsCareer} créditos (${percentage}%)`;
    if (progressBar) progressBar.style.width = `${percentage}%`;

    // Campos del formulario editable
    const inputEmail = document.getElementById('edit-personal-email');
    const inputPhone = document.getElementById('edit-phone');
    const inputEmergency = document.getElementById('edit-emergency');
    const inputAddress = document.getElementById('edit-address');

    if (inputEmail) inputEmail.value = student.personalEmail;
    if (inputPhone) inputPhone.value = student.phone;
    if (inputEmergency) inputEmergency.value = student.emergencyContact;
    if (inputAddress) inputAddress.value = student.address;
}

window.handleProfileFormSubmit = function(e) {
    e.preventDefault();

    const updatedData = {
        personalEmail: document.getElementById('edit-personal-email').value.trim(),
        phone: document.getElementById('edit-phone').value.trim(),
        emergencyContact: document.getElementById('edit-emergency').value.trim(),
        address: document.getElementById('edit-address').value.trim()
    };

    saveStudentProfile(updatedData);
};

// Descarga ficticia de constancias
window.downloadAcademicDoc = function(docType) {
    showToast(`Generando y descargando: ${docType} (PDF)`, 'info');
};

// ==========================================================================
// INTERACCIONES Y UTILIDADES GENERALES
// ==========================================================================

function setupMobileSidebar() {
    const toggleBtn = document.getElementById('mobile-sidebar-toggle');
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (toggleBtn && sidebar && overlay) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show');
            overlay.classList.toggle('show');
        });

        overlay.addEventListener('click', () => {
            closeMobileSidebar();
        });
    }
}

function closeMobileSidebar() {
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
}

function setupGlobalSearch() {
    const searchInputs = document.querySelectorAll('.global-search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length > 0) {
                switchView('courses');
                renderCoursesView(query);
            } else {
                renderCoursesView();
            }
        });
    });
}

function showToast(message, type = 'primary') {
    const toastEl = document.getElementById('liveToast');
    const toastBody = document.getElementById('toast-message-body');
    if (!toastEl || !toastBody) return;

    toastBody.innerHTML = message;
    toastEl.className = `toast align-items-center text-bg-${type} border-0`;

    const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
    toast.show();
}

function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

