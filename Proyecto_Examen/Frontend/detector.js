// ==========================================
// CONFIGURACIÓN
// ==========================================
const CONFIG = {
    BACKEND_URL: 'http://localhost:5000',
    LIMITE_CAMBIOS_PESTANA: 3,
    INTERVALO_ENVIO: 5000
};

// ==========================================
// ESTADO DEL SISTEMA
// ==========================================
let estadoMonitoreo = {
    studentId: 'EST001',
    contadorCambiosPestana: 0,
    contadorPerdidaFoco: 0,
    contadorMinimizacion: 0,
    eventosTotales: 0,
    alertaActivada: false,
    horaInicio: new Date()
};

// ==========================================
// FUNCIONES DE REGISTRO
// ==========================================

function obtenerStudentId() {
    const input = document.getElementById('studentId');
    return input ? input.value : 'EST001';
}

async function registrarEvento(tipoEvento, descripcion) {
    estadoMonitoreo.studentId = obtenerStudentId();
    
    switch(tipoEvento) {
        case 'CAMBIO_PESTANA':
            estadoMonitoreo.contadorCambiosPestana++;
            break;
        case 'PERDIDA_FOCO':
            estadoMonitoreo.contadorPerdidaFoco++;
            break;
        case 'MINIMIZACION':
            estadoMonitoreo.contadorMinimizacion++;
            break;
    }
    
    estadoMonitoreo.eventosTotales++;
    
    const datosEvento = {
        student_id: estadoMonitoreo.studentId,
        tipo_evento: tipoEvento,
        descripcion: descripcion,
        timestamp: new Date().toISOString(),
        contador_total: estadoMonitoreo.eventosTotales
    };
    
    console.log('📤 Enviando evento:', datosEvento);
    
    try {
        const respuesta = await fetch(`${CONFIG.BACKEND_URL}/registrar_evento`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosEvento)
        });
        
        if (respuesta.ok) {
            const datos = await respuesta.json();
            console.log('✅ Evento registrado:', datos);
        } else {
            console.error('❌ Error al registrar:', respuesta.status);
        }
    } catch (error) {
        console.error('❌ Error de conexión:', error);
    }
    
    actualizarUI();
    verificarAlerta();
}

// ==========================================
// ACTUALIZAR INTERFAZ
// ==========================================

function actualizarUI() {
    const contadorPestanas = document.getElementById('contadorPestanas');
    const contadorFoco = document.getElementById('contadorFoco');
    
    if (contadorPestanas) {
        contadorPestanas.textContent = estadoMonitoreo.contadorCambiosPestana;
    }
    
    if (contadorFoco) {
        contadorFoco.textContent = estadoMonitoreo.contadorPerdidaFoco;
    }
}

function verificarAlerta() {
    if (estadoMonitoreo.contadorCambiosPestana > CONFIG.LIMITE_CAMBIOS_PESTANA && 
        !estadoMonitoreo.alertaActivada) {
        
        mostrarAlertaSospecha();
        estadoMonitoreo.alertaActivada = true;
    }
}

function mostrarAlertaSospecha() {
    const alerta = document.getElementById('alertaSospecha');
    const overlay = document.getElementById('overlay');
    
    if (alerta && overlay) {
        alerta.classList.add('visible');
        overlay.classList.add('visible');
        
        registrarEvento('ALERTA_ACTIVADA', 'Alerta por comportamiento sospechoso');
        
        setTimeout(() => {
            alerta.classList.remove('visible');
            overlay.classList.remove('visible');
        }, 5000);
    }
}

// ==========================================
// DETECTORES DE EVENTOS
// ==========================================

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('⚠️ Usuario cambió de pestaña');
        registrarEvento('CAMBIO_PESTANA', 'El usuario cambió de pestaña');
    } else {
        console.log('✅ Usuario regresó');
        registrarEvento('REGRESO_PESTANA', 'El usuario regresó');
    }
});

window.addEventListener('blur', function() {
    console.log('⚠️ Ventana perdió el foco');
    registrarEvento('PERDIDA_FOCO', 'La ventana perdió el foco');
});

window.addEventListener('focus', function() {
    console.log('✅ Ventana recuperó el foco');
    registrarEvento('RECUPERA_FOCO', 'La ventana recuperó el foco');
});

// ==========================================
// ENVIAR EXAMEN
// ==========================================

function enviarExamen() {
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    
    const respuestas = {};
    const preguntas = document.querySelectorAll('.question');
    
    preguntas.forEach((_, index) => {
        const nombrePregunta = `p${index + 1}`;
        const seleccionada = document.querySelector(`input[name="${nombrePregunta}"]:checked`);
        respuestas[nombrePregunta] = seleccionada ? seleccionada.value : null;
    });
    
    const datosExamen = {
        student_id: studentId,
        student_name: studentName,
        respuestas: respuestas,
        total_preguntas: preguntas.length,
        timestamp: new Date().toISOString(),
        estadisticas_fraude: {
            contadorCambiosPestana: estadoMonitoreo.contadorCambiosPestana,
            contadorPerdidaFoco: estadoMonitoreo.contadorPerdidaFoco,
            contadorMinimizacion: estadoMonitoreo.contadorMinimizacion,
            eventosTotales: estadoMonitoreo.eventosTotales
        }
    };
    
    console.log('📤 Enviando examen...', datosExamen);
    
    fetch(`${CONFIG.BACKEND_URL}/guardar_examen`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosExamen)
    })
    .then(response => response.json())
    .then(data => {
        console.log('✅ Examen guardado:', data);
        
        if (data.success) {
            alert(`✅ ¡Examen enviado!\n\n📁 Archivo: ${data.archivo}\n📊 Riesgo: ${data.riesgo_fraude}%`);
            
            const btn = document.querySelector('.btn-submit');
            btn.style.display = 'none';
            
            const div = document.createElement('div');
            div.style.cssText = 'margin-top:20px; padding:20px; background:#d4edda; border:2px solid #28a745; border-radius:10px; text-align:center;';
            div.innerHTML = `
                <h2 style="color:#155724; margin:0;">✅ ¡Examen Completado!</h2>
                <p><strong>ID:</strong> ${data.examen_id}</p>
                <p><strong>Riesgo:</strong> ${data.riesgo_fraude}%</p>
            `;
            document.querySelector('.container').appendChild(div);
        }
    })
    .catch(error => {
        console.error('❌ Error:', error);
        alert('❌ Error al enviar. Verifica que el backend esté corriendo.');
    });
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

console.log('🔍 Sistema de detección inicializado');
console.log('📊 Backend:', CONFIG.BACKEND_URL);
console.log('⚠️ Límite de cambios:', CONFIG.LIMITE_CAMBIOS_PESTANA);